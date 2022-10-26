import { test, expect } from '@playwright/test'

test("Simple basic test", async  ({ page }) => {
    
    // go to example.com
    await page.goto("https://www.example.com");

    // check page's title is correct
    const pageTitle = await page.locator("h1")
    await expect(pageTitle).toContainText("Example Domain")

}) 

test("Clicking on elements test", async  ({ page }) => {
    
    // go to test page
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#signin_button")
    await page.click("text=Sign in")

    const singInError = page.locator(".alert-error")
    await expect(singInError).toContainText("Login and/or password are wrong.")
}) 

// test("Selectors", async({ page }) => {

//     // this is just a example of selecting elements, no real test

//     // select by text
//     await page.click("text=some text")

//     // css selectors:
//     // generic:
//     await page.click("button")
//     // id:
//     await page.click("#online-banking")
//     // class:
//     await page.click(".class")

//     // target only visible css selector:
//     await page.click(".submit-button:visible")

//     // combinations:
//     await page.click("#username .first")

//     // xpath:
//     await page.click("//button")

// })