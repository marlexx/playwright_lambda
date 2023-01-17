const { test, expect } = require('@playwright/test');

test('Test Scenario 2', async ({ page }) => {

    await page.goto('https://www.lambdatest.com/selenium-playground');
    await page.pause();
    await page.getByRole('link', { name: 'Drag & Drop Sliders' }).click();

    const s = await page.locator('xpath = //*[@id="slider3"]/div/input');
    let isComplete = false;
    let targetAmount = "95";
    let ele = await page.locator('xpath = //*[@id="rangeSuccess"]');
    let srcBound = await s.boundingBox();
    let X = 0.92;

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
    await expect(text).toMatch(targetAmount);
})