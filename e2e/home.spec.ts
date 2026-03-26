import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test('loads and shows sign in link', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/My App/)
    await expect(page.getByRole('link', { name: /sign in/i })).toBeVisible()
  })
})
