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

test("Working with inputs test", async  ({ page }) => {
    
    // go to test page
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#signin_button")

    // fill username:
    await page.type("#user_login", "some username")

    // fill password:
    await page.type("#user_password", "some password")

    // click on 'Sign in' button
    await page.click("text=Sign in")

    const singInError = page.locator(".alert-error")
    await expect(singInError).toContainText("Login and/or password are wrong.")
}) 

test("Assertion examples test", async  ({ page }) => {
    
    // go to test page
    await page.goto("http://example.com");

    // assert the correct url:
    await expect(page).toHaveURL("http://example.com");

    // assert the correct page's title:
    await expect(page).toHaveTitle("Example Domain");

    const elementH1 = await page.locator("h1");
    // chcek if element is correctly displayed:
    await expect(elementH1).toBeVisible()
    // if text of the element equals:
    await expect(elementH1).toHaveText("Example Domain")
    // if it is visible only once:
    await expect(elementH1).toHaveCount(1) 

    const nonExistingElement = await page.locator("h5");
    // non visible assertion:
    await expect(nonExistingElement).not.toBeVisible();
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