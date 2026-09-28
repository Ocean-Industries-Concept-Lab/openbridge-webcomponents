import { test, expect, type Page } from '@playwright/test'

// The demo opens with its top bar inactive: title, alert button and clock
// only. A pointer move or a key press wakes it.
async function wake(page: Page): Promise<void> {
  await page.mouse.move(10, 300)
  await page.mouse.move(20, 320)
}

test('names the app and the page, and navigates from the menu', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('header .title')).toHaveText('OpenBridge')
  await expect(page.locator('header .page-name')).toHaveText('Conning PSV')

  await wake(page)
  await page.getByRole('banner').getByRole('button', { name: 'Menu' }).click()
  await page.locator('.navigation-menu').getByText('Conning ferry').click()

  await expect(page).toHaveURL(/\/ferry$/)
  await expect(page.locator('header .page-name')).toHaveText('Conning ferry')
})

test('acknowledges a simulated alert from the alert menu', async ({ page }) => {
  await page.goto('/')
  // S starts the simulated alerts; the first warning arrives after 2 s.
  await page.keyboard.press('s')
  await page
    .getByRole('banner')
    .getByRole('button', { name: /^Alerts/ })
    .click()

  const warning = page.locator('.alert-menu').getByRole('button', { name: /^High Voltage Warning/ })
  await expect(warning).toBeVisible({ timeout: 10_000 })
  await warning.getByRole('button', { name: 'ACK', exact: true }).click()

  await expect(warning.getByRole('button', { name: 'ACK', exact: true })).toHaveCount(0)
  await page.getByRole('tab', { name: 'Unacked' }).click()
  await expect(warning).toBeHidden()
})
