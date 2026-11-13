#!/usr/bin/env node
// Post-deploy smoke test (NUJ-13): the live site serves the app shell, deep links fall back
// to index.html, and the manifest + icons are real files (not the SPA's HTML fallback).
// Usage: node scripts/smoke.mjs https://nujoom.<account>.workers.dev

const base = (process.argv[2] || process.env.SMOKE_URL || '').replace(/\/+$/, '')
if (!/^https?:\/\//.test(base)) {
  console.error('Usage: node scripts/smoke.mjs <https://deployed-url>')
  process.exit(2)
}

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
const failures = []

/** Fetches `path` and runs `test(res, bytes)`; `test` returns a problem string or null. */
async function check(path, test) {
  const url = `${base}${path}`
  try {
    const res = await fetch(url, { redirect: 'follow' })
    const bytes = new Uint8Array(await res.arrayBuffer())
    const problem = test(res, bytes)
    if (problem) failures.push(`${path}: ${problem}`)
    else console.log(`ok   ${path}`)
  } catch (error) {
    failures.push(`${path}: ${error.message}`)
  }
}

const text = (bytes) => new TextDecoder().decode(bytes)

const isShell = (res, bytes) => {
  if (res.status !== 200) return `status ${res.status}`
  const body = text(bytes)
  if (!body.includes('id="root"')) return 'app shell (#root) missing'
  if (!body.includes('manifest.webmanifest')) return 'manifest link missing'
  return null
}

const isPng = (res, bytes) => {
  if (res.status !== 200) return `status ${res.status}`
  const type = res.headers.get('content-type') || ''
  if (!type.startsWith('image/png')) return `content-type is "${type}", expected image/png`
  if (!PNG_SIGNATURE.every((b, i) => bytes[i] === b)) return 'body is not a PNG'
  return null
}

await check('/', isShell)
await check('/some/deep/link', isShell)
await check('/manifest.webmanifest', (res, bytes) => {
  if (res.status !== 200) return `status ${res.status}`
  try {
    const manifest = JSON.parse(text(bytes))
    return manifest.icons?.length ? null : 'no icons in manifest'
  } catch {
    return 'manifest is not JSON'
  }
})
for (const icon of ['/icons/icon-192.png', '/icons/icon-512.png', '/icons/apple-touch-icon.png']) {
  await check(icon, isPng)
}

if (failures.length) {
  console.error('\nSmoke test FAILED:\n' + failures.map((f) => `  - ${f}`).join('\n'))
  process.exit(1)
}
console.log(`\nSmoke test passed for ${base}`)
