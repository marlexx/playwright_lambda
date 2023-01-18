const { chromium } = require('playwright')
const { expect } = require('@playwright/test')

const parallelTests = async (capability) => {
  console.log('Initialising test:: ', capability['LT:Options']['name'])

  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capability))}`
  })

  const page = await browser.newPage()

  await page.goto('https://www.lambdatest.com/selenium-playground');

    await page.getByRole('link', { name: 'Input Form Submit' }).click();



    await page.getByRole('button', { name: 'Submit' }).click();

    //await page.pause();

    const mes = await page.evaluate(() => document.getElementById("name").validationMessage);
    const ker = 'Please fill out this field.'

    if(mes != ker)
    {
        ker = 'Fill out this field';
    }

    try {
        expect(mes).toMatch(ker);
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
      'build': 'Test Scenario 3',
      'name': 'TS3 on  windows 10 firefox',
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
      'build': 'Test Scenario 3',
      'name': 'TS3 on Windows 8 Edge',
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
      'build': 'Test Scenario 3',
      'name': 'TS3 on windows 10 Chrome',
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
