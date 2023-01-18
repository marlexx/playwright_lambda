const { test, expect } = require('@playwright/test');

test('Test Scenario 3', async ({ page }) => {

    await page.goto('https://www.lambdatest.com/selenium-playground');

    await page.getByRole('link', { name: 'Input Form Submit' }).click();



    await page.getByRole('button', { name: 'Submit' }).click();

    //await page.pause();

    const mes = await page.evaluate(() => document.getElementById("name").validationMessage);
    var ker = 'Please fill out this field.'

    if(mes != ker)
    {
        ker = 'Fill out this field';
    }

    await expect(mes).toMatch(ker);


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

})
