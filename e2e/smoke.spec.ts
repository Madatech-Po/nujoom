import { expect, test } from '@playwright/test'

test('home page loads in Arabic RTL on a phone', async ({ page }) => {
  await page.goto('/', { waitUntil: 'load' })
  await expect(page).toHaveTitle(/نجوم/)
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('نجوم')

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  )
  expect(overflow).toBe(false)
})
