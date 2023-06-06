import { test, expect } from '@playwright/test';

test.skip('Positive login scenario',async({page})=>{

    await page.goto('http://the-internet.herokuapp.com/login');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/The Internet/);

    await page.locator('xpath=//*[@id="username"]').fill("tomsmith");
    await page.getByRole('textbox',{name:'password'}).fill("SuperSecretPassword!")
    await page.getByRole('button',{type:'submit'}).click()
    await expect(page.locator('xpath=//*[@id="content"]/div/h2')).toContainText("Secure Area");
});

test.skip('Negative login scenario | Wrong Username',async({page})=>{

    await page.goto('http://the-internet.herokuapp.com/login');
    await expect(page.locator('xpath=//h2')).toHaveText("Login Page");
    await page.locator('xpath=//*[@id="username"]').fill("tomsmith1");
    await page.getByRole('textbox',{name:'password'}).fill("SuperSecretPassword!1")
    await page.getByRole('button',{type:'submit'}).click()
   
    // const txt = await (await page.locator('xpath=//div[@id="flash-messages"]/div').innerText()).toString().trim();
    await expect(page.locator('xpath=//div[@id="flash-messages"]/div')).toContainText("Your username is invalid!\n×");

});

test('Negative login scenario | Wrong Password',async({page})=>{

    await page.goto('http://the-internet.herokuapp.com/login');
    await expect(page.locator('xpath=//h2')).toHaveText("Login Page");
    await page.locator('xpath=//*[@id="username"]').fill("tomsmith");
    await page.getByRole('textbox',{name:'password'}).fill("SuperSecretPassword!1")
    await page.getByRole('button',{type:'submit'}).click()
   
    // const txt = await (await page.locator('xpath=//div[@id="flash-messages"]/div').innerText()).toString().trim();
    await expect(page.locator('xpath=//div[@id="flash-messages"]/div')).toContainText("Your password is invalid!\n×");
    
});