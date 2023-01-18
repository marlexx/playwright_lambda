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
      'build': 'Test Scenario 3 build',
      'name': 'Test Scenario 3',
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

    await page.getByRole('link', { name: 'Input Form Submit' }).click();



    await page.getByRole('button', { name: 'Submit' }).click();

    //await page.pause();

    const mes = await page.evaluate(() => document.getElementById("name").validationMessage);
    const ker = 'Please fill out this field.'

    try {
        expect(mes).toMatch(ker);
        // Mark the test as completed or failed
        await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'The correct message is displayed' } })}`)
      } catch {
        await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'The correct message is not displayed' } })}`)
      }


    await page.getByRole('textbox', { name: 'Name' }).fill('Uros');
    await page.getByLabel('Email*').fill('x2junior02@gmail.com');
    await page.getByPlaceholder('Password').fill('validpassword');
    await page.getByPlaceholder('Company').fill('test');
    await page.getByPlaceholder('Website').fill('test');
    await page.getByRole('combobox').selectOption({ label: 'United States' });
    await page.getByPlaceholder('City').fill('test');
    await page.getByPlaceholder('Address 1').fill('test');
    await page.getByPlaceholder('Address 2').fill('test');
    await page.getByPlaceholder('State').fill('test');
    await page.getByPlaceholder('Zip code').fill('123');
    await page.locator('#seleniumform div').filter({ hasText: 'Submit' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();

    const me = await page.locator('xpath = //*[@id="__next"]/div/section[3]/div/div/div[2]/div/p').innerHTML();
    const ke = "Thanks for contacting us, we will get back to you shortly.";

  try {
    expect(me).toMatch(ke);
    // Mark the test as completed or failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'The correct text is displayed' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'The correct text is not displayed' } })}`)
  }

  await browser.close()
})()
