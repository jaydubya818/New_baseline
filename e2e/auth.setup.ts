import { test as setup } from '@playwright/test'

// Auth setup — runs before all E2E tests
// Logs in once and saves session to e2e/.auth/user.json

const AUTH_FILE = 'e2e/.auth/user.json'

setup('authenticate', async ({ page }) => {
  // TODO: Replace with your actual login flow
  // For OAuth providers, you may need to mock the session instead

  // Example: email/password login
  // await page.goto('/login')
  // await page.fill('[name="email"]', process.env.TEST_USER_EMAIL!)
  // await page.fill('[name="password"]', process.env.TEST_USER_PASSWORD!)
  // await page.click('[type="submit"]')
  // await page.waitForURL('/dashboard')

  // For now, save empty auth state (unauthenticated tests)
  await page.context().storageState({ path: AUTH_FILE })
})
