const { chromium } = require('playwright')
const { expect } = require('@playwright/test');
const cp = require('child_process');
const playwrightClientVersion = cp.execSync('npx playwright --version').toString().trim().split(' ')[1];

(async () => {
  const capabilities = {
    'browserName': 'Chrome', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    "browserVersion": "108.0",
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Test Scenario 1 build',
      'name': 'Test Scenario 1',
      'user': 'x2junior02',
      'accessKey': 'mPCnuJKhSuCqINv39qwWutb749yv2Bg3nFEg8EUponsJTJwxVv',
      'network': true,
      'visual': true,
      'video': true,
      'console': true,
      'tunnel': false, // Add tunnel configuration if testing locally hosted webpage
      'tunnelName': '', // Optional
      'geoLocation': '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
      'playwrightClientVersion': playwrightClientVersion
    }
  }

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
  })

  const page = await browser.newPage()

  await page.goto('https://www.lambdatest.com/selenium-playground');

  await page.getByRole('link', { name: 'Simple Form Demo' }).click();

  await expect(page.url()).toContain('simple-form-demo');

  var mes = 'Welcome to LambdaTest';

  await page.getByPlaceholder('Please enter your Message').first().fill(mes);
  await page.getByRole('button', { name: 'Get Checked value' }).click();

  await page.locator('xpath = //*[@id="message"]').waitFor();
  var ker = await page.locator('xpath = //*[@id="message"]').innerHTML();

  try {
    expect(ker).toMatch(mes);
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'The correct text is displayed' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'The correct text is not displayed' } })}`)
  }

  await browser.close()
})()
