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
      'build': 'Test Scenario 2 build',
      'name': 'Test Scenario 2',
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
    await page.getByRole('link', { name: 'Drag & Drop Sliders' }).click();

    const s = await page.locator('xpath = //*[@id="slider3"]/div/input');
    let isComplete = false;
    let targetAmount = "95";
    let ele = await page.locator('xpath = //*[@id="rangeSuccess"]');
    let srcBound = await s.boundingBox();
    let X = 0.91;

    if (s) {
        while (!isComplete) {
            if (srcBound) {
                await page.mouse.move(srcBound.x + srcBound.width / 2,
                    srcBound.y + srcBound.height / 2)
                await page.mouse.down();
                await page.mouse.move(srcBound.x + srcBound.width * X, srcBound.y + srcBound.height / 2);
                await page.mouse.up();
                let text = await ele.innerHTML();
                if (text == targetAmount) {
                    isComplete = true;
                }
                srcBound.width += 1;
            }
        }
    }
    let text = await ele.innerHTML();

  try {
    expect(text).toMatch(targetAmount);
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'The correct text is displayed' } })}`)
  } catch {
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'The correct text is not displayed' } })}`)
  }

  await browser.close()
})()
