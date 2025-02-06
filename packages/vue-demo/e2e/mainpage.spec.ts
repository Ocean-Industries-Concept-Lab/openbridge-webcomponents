import { test, expect } from '@playwright/test';

test('Has page title', async ({ page }) => {
  await page.goto('/');
  const appName = "Demo";
  let pageName = "Conning";
  expect(page.locator('header .title')).toHaveText(appName);
  expect(page.locator('header .page-name')).toHaveText(pageName);

  await page.locator('.menu-button').first().click();
  await page.getByRole('link', { name: 'Azimuth Clock' }).locator('a').click();

  pageName = "Clock";
  await expect(page.locator('header .title')).toHaveText(appName);
  await expect(page.locator('header .page-name')).toHaveText(pageName);
});

test('Can ack alerts', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('GPS 1 Signal Lost').first()).toBeVisible();
  await page.getByRole('button', { name: '1 1', exact: true }).click();
  expect(await page.getByText('GPS 1 Signal Lost').count()).toBe(2);
  await page.getByRole('main').getByRole('button', { name: 'ACK', exact: true }).click();
  await expect(page.getByText('GPS 1 Signal Lost').first()).not.toBeVisible();
  expect(await page.getByText('No active alerts').count()).toBe(2);
});