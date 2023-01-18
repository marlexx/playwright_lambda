const { chromium } = require('playwright')
const { expect } = require('@playwright/test')

const parallelTests = async (capability) => {
  console.log('Initialising test:: ', capability['LT:Options']['name'])

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capability))}`
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
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'The correct text is displayed' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'The correct text is not displayed' } })}`)
  }

  await browser.close()
}

// Capabilities array for with the respective configuration for the parallel tests
const capabilities = [
  {
    'browserName': 'pw-firefox', // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Test Scenario 1',
      'name': 'TS1 on  windows 10 firefox',
      'user': 'x2junior02',
      'accessKey': 'mPCnuJKhSuCqINv39qwWutb749yv2Bg3nFEg8EUponsJTJwxVv',
      'network': true,
      'video': true,
      'console': true,
      'visual': true
    }
  },
  {
    'browserName': 'MicrosoftEdge',
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': 'Windows 8',
      'build': 'Test Scenario 1',
      'name': 'TS1 on Windows 8 Edge',
      'user': 'x2junior02',
      'accessKey': 'mPCnuJKhSuCqINv39qwWutb749yv2Bg3nFEg8EUponsJTJwxVv',
      'network': true,
      'video': true,
      'console': true,
      'visual': true
    }
  },
  {
    'browserName': 'Chrome',
    'browserVersion': '108.0',
    'LT:Options': {
      'platform': 'Windows 10',
      'build': 'Test Scenario 1',
      'name': 'TS1 on windows 10 Chrome',
      'user': 'x2junior02',
      'accessKey': 'mPCnuJKhSuCqINv39qwWutb749yv2Bg3nFEg8EUponsJTJwxVv',
      'network': true,
      'video': true,
      'console': true,
      'visual': true
    }
  }]

capabilities.forEach(async (capability) => {
  await parallelTests(capability)
})
