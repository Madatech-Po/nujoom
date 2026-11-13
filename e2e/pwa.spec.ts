import { expect, test } from '@playwright/test'

test('web app manifest is linked, valid and its icons load', async ({ page, request }) => {
  await page.goto('/', { waitUntil: 'load' })
  const href = await page.locator('link[rel="manifest"]').getAttribute('href')
  expect(href).toBe('/manifest.webmanifest')

  const res = await request.get(href!)
  expect(res.ok()).toBe(true)
  const manifest = await res.json()
  expect(manifest).toMatchObject({
    short_name: 'نجوم',
    start_url: '/',
    display: 'standalone',
    lang: 'ar',
    dir: 'rtl',
  })

  const sizes = manifest.icons.map((icon: { sizes: string }) => icon.sizes)
  expect(sizes).toEqual(expect.arrayContaining(['192x192', '512x512']))
  expect(manifest.icons.some((i: { purpose: string }) => i.purpose === 'maskable')).toBe(true)

  for (const icon of manifest.icons as { src: string }[]) {
    expect((await request.get(icon.src)).ok(), icon.src).toBe(true)
  }

  const apple = await page.locator('link[rel="apple-touch-icon"]').getAttribute('href')
  expect((await request.get(apple!)).ok()).toBe(true)
})

test('deep links load the app shell (SPA fallback)', async ({ page }) => {
  await page.goto('/play/arabic/level-1', { waitUntil: 'load' })
  await expect(page.getByTestId('language-toggle')).toBeVisible()
})
