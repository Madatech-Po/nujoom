#!/usr/bin/env node
// Post-deploy smoke test (NUJ-13): the live site serves the app shell, deep links fall back
// to index.html, and the manifest + icons are real files (not the SPA's HTML fallback).
//
// Right after a deploy (and especially the very first one, while Cloudflare activates the
// workers.dev subdomain) the URL can answer 404 for a short while, so failed rounds are retried
// until SMOKE_RETRY_SECONDS (default 90) have passed, SMOKE_RETRY_INTERVAL seconds apart (default 10).
//
// Usage: node scripts/smoke.mjs https://nujoom.<account>.workers.dev

const base = (process.argv[2] || process.env.SMOKE_URL || '').replace(/\/+$/, '')
if (!/^https?:\/\//.test(base)) {
  console.error('Usage: node scripts/smoke.mjs <https://deployed-url>')
  process.exit(2)
}

const retrySeconds = Number(process.env.SMOKE_RETRY_SECONDS ?? 90)
const intervalSeconds = Number(process.env.SMOKE_RETRY_INTERVAL ?? 10)
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]

const text = (bytes) => new TextDecoder().decode(bytes)

const isShell = (res, bytes) => {
  if (res.status !== 200) return `status ${res.status}`
  const body = text(bytes)
  if (!body.includes('id="root"')) return 'app shell (#root) missing'
  if (!body.includes('manifest.webmanifest')) return 'manifest link missing'
  return null
}

const isManifest = (res, bytes) => {
  if (res.status !== 200) return `status ${res.status}`
  try {
    const manifest = JSON.parse(text(bytes))
    return manifest.icons?.length ? null : 'no icons in manifest'
  } catch {
    return 'manifest is not JSON'
  }
}

const isPng = (res, bytes) => {
  if (res.status !== 200) return `status ${res.status}`
  const type = res.headers.get('content-type') || ''
  if (!type.startsWith('image/png')) return `content-type is "${type}", expected image/png`
  if (!PNG_SIGNATURE.every((b, i) => bytes[i] === b)) return 'body is not a PNG'
  return null
}

const checks = [
  ['/', isShell],
  ['/some/deep/link', isShell],
  ['/manifest.webmanifest', isManifest],
  ['/icons/icon-192.png', isPng],
  ['/icons/icon-512.png', isPng],
  ['/icons/apple-touch-icon.png', isPng],
]

/** Runs every check once; returns the list of problems (empty = pass). */
async function runRound() {
  const failures = []
  for (const [path, test] of checks) {
    try {
      const res = await fetch(`${base}${path}`, { redirect: 'follow', cache: 'no-store' })
      const bytes = new Uint8Array(await res.arrayBuffer())
      const problem = test(res, bytes)
      if (problem) failures.push(`${path}: ${problem}`)
    } catch (error) {
      failures.push(`${path}: ${error.message}`)
    }
  }
  return failures
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const deadline = Date.now() + retrySeconds * 1000
let attempt = 0
let failures

for (;;) {
  attempt += 1
  failures = await runRound()
  if (failures.length === 0 || Date.now() + intervalSeconds * 1000 > deadline) break
  console.log(`attempt ${attempt}: ${failures.length} check(s) failing, retrying in ${intervalSeconds}s…`)
  await sleep(intervalSeconds * 1000)
}

if (failures.length) {
  console.error(
    `\nSmoke test FAILED after ${attempt} attempt(s):\n` + failures.map((f) => `  - ${f}`).join('\n'),
  )
  process.exit(1)
}
for (const [path] of checks) console.log(`ok   ${path}`)
console.log(`\nSmoke test passed for ${base} (attempt ${attempt})`)
