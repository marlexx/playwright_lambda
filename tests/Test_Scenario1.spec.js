const { test, expect } = require('@playwright/test');

test('Test Scenario 1', async ({ page }) => {
  await page.goto('https://www.lambdatest.com/selenium-playground');

  await page.getByRole('link', { name: 'Simple Form Demo' }).click();

  await expect(page.url()).toContain('simple-form-demo');

  var mes = 'Welcome to LambdaTest';

  await page.getByPlaceholder('Please enter your Message').first().fill(mes);
  await page.getByRole('button', { name: 'Get Checked value' }).click();

  await page.locator('xpath = //*[@id="message"]').waitFor();
  var ker = await page.locator('xpath = //*[@id="message"]').innerHTML();

  await expect(ker).toMatch(mes);
});
