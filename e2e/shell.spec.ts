import { expect, test, type Page } from '@playwright/test'

const cases = [
  { lang: 'ar', dir: 'rtl', heading: 'نجوم' },
  { lang: 'en', dir: 'ltr', heading: 'Nujoom' },
] as const

async function openIn(page: Page, lang: 'ar' | 'en') {
  await page.addInitScript((l) => window.localStorage.setItem('nujoom.lang', l), lang)
  await page.goto('/', { waitUntil: 'load' })
}

for (const c of cases) {
  test.describe(`${c.lang} (${c.dir})`, () => {
    test('html lang/dir, heading and header sides are correct', async ({ page }) => {
      await openIn(page, c.lang)
      await expect(page.locator('html')).toHaveAttribute('lang', c.lang)
      await expect(page.locator('html')).toHaveAttribute('dir', c.dir)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(c.heading)

      const brand = await page.getByTestId('app-brand').boundingBox()
      const toggle = await page.getByTestId('language-toggle').boundingBox()
      expect(brand && toggle).toBeTruthy()
      // Brand sits at the inline start: right side in RTL, left side in LTR.
      if (c.dir === 'rtl') expect(brand!.x).toBeGreaterThan(toggle!.x)
      else expect(brand!.x).toBeLessThan(toggle!.x)
    })

    test('no horizontal scroll at 360px and toggle is a big tap target', async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 740 })
      await openIn(page, c.lang)
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      )
      expect(overflow).toBe(false)
      const toggle = await page.getByTestId('language-toggle').boundingBox()
      expect(toggle!.width).toBeGreaterThanOrEqual(56)
      expect(toggle!.height).toBeGreaterThanOrEqual(56)
    })
  })
}

test('font is self-hosted: Baloo Bhaijaan 2 loads with no request to Google', async ({ page }) => {
  const external: string[] = []
  page.on('request', (req) => {
    const host = new URL(req.url()).hostname
    if (host !== 'localhost' && host !== '127.0.0.1') external.push(req.url())
  })
  await page.goto('/', { waitUntil: 'load' })
  const loaded = await page.evaluate(async () => {
    await document.fonts.ready
    return document.fonts.check('700 32px "Baloo Bhaijaan 2"', 'نجوم')
  })
  expect(loaded).toBe(true)
  expect(external).toEqual([])
})

test('toggle switches language and the choice survives a reload', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')

  await page.getByTestId('language-toggle').click()
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nujoom')

  await page.reload({ waitUntil: 'load' })
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nujoom')

  await page.getByTestId('language-toggle').click()
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
})
