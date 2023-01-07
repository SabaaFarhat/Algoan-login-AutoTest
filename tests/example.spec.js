import { test, expect } from '@playwright/test';

//test case : testing with correct credentials
test('Login using the correct credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.fill('input[name="username"]', 'test');

  await page.fill('input[name="password"]', '1234');

  await page.locator('button[type="submit"]').click({ force: true });

  await expect(page).toHaveURL('http://localhost:3000/success');
});

//test case : testing with wrong credentials
test('Login using wrong credentials', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.fill('input[name="username"]', 'test1');

  await page.fill('input[name="password"]', '12341');

  await page.locator('button[type="submit"]').click({ force: true });

  await expect(page.locator('p')).toHaveText('Erreur de connexion');

  await page.waitForTimeout(5000);
  await expect(page.locator('p')).toHaveCount(0);
});
