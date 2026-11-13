#!/usr/bin/env node
// Post-deploy smoke test (NUJ-13): the live site serves the app shell, deep links fall back
// to index.html, and the manifest + icons are reachable.
// Usage: node scripts/smoke.mjs https://nujoom.<account>.workers.dev

const base = (process.argv[2] || process.env.SMOKE_URL || '').replace(/\/+$/, '')
if (!/^https?:\/\//.test(base)) {
  console.error('Usage: node scripts/smoke.mjs <https://deployed-url>')
  process.exit(2)
}

const failures = []

async function check(path, test) {
  const url = `${base}${path}`
  try {
    const res = await fetch(url, { redirect: 'follow' })
    const body = await res.text()
    const problem = test(res, body)
    if (problem) failures.push(`${path}: ${problem}`)
    else console.log(`ok   ${path}`)
  } catch (error) {
    failures.push(`${path}: ${error.message}`)
  }
}

const isShell = (res, body) =>
  res.status !== 200
    ? `status ${res.status}`
    : !body.includes('id="root"')
      ? 'app shell (#root) missing'
      : !body.includes('manifest.webmanifest')
        ? 'manifest link missing'
        : null

await check('/', isShell)
await check('/some/deep/link', isShell)
await check('/manifest.webmanifest', (res, body) => {
  if (res.status !== 200) return `status ${res.status}`
  try {
    const manifest = JSON.parse(body)
    return manifest.icons?.length ? null : 'no icons in manifest'
  } catch {
    return 'manifest is not JSON'
  }
})
for (const icon of ['/icons/icon-192.png', '/icons/icon-512.png', '/icons/apple-touch-icon.png']) {
  await check(icon, (res) => (res.status === 200 ? null : `status ${res.status}`))
}

if (failures.length) {
  console.error('\nSmoke test FAILED:\n' + failures.map((f) => `  - ${f}`).join('\n'))
  process.exit(1)
}
console.log(`\nSmoke test passed for ${base}`)
