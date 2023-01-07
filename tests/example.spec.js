import { test, expect } from '@playwright/test';

test('Login using the correct credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('input[name="username"]');
  await page.fill('input[name="username"]', 'test');

  await page.click('input[name="password"]');
  await page.fill('input[name="password"]', '1234');

  const submitButton = await page.locator('button[type="submit"]');
  await submitButton.click({ force: true });
  await expect(page).toHaveURL('http://localhost:3000/success');
});

test('Login using wrong credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.click('input[name="username"]');
  await page.fill('input[name="username"]', 'test1');

  await page.click('input[name="password"]');
  await page.fill('input[name="password"]', '12341');

  const submitButton = await page.locator('button[type="submit"]');
  await submitButton.click({ force: true });
  await expect(page.locator('p')).toHaveText('Erreur de connexion');
  await page.waitForTimeout(5000);
  await expect(page.locator('p')).toHaveCount(0);
});
