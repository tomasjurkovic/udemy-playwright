import { test, expect } from '@playwright/test'

import { loadHomePage, assertTitle } from '../helpers'

test("Simple basic test", async  ({ page }) => {
    
    // go to example.com
    await page.goto("https://www.example.com");

    // check page's title is correct
    const pageTitle = await page.locator("h1")
    await expect(pageTitle).toContainText("Example Domain")

}) 

test.describe("My first test suite", () => {
    test("Clicking on elements test", async  ({ page }) => {
    
        // go to test page
        await page.goto("http://zero.webappsecurity.com/index.html");
        await page.click("#signin_button")
        await page.click("text=Sign in")
    
        const singInError = page.locator(".alert-error")
        await expect(singInError).toContainText("Login and/or password are wrong.")
    }) 
    
    test("Working with inputs test @myFirstTag", async  ({ page }) => {
        
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
})

test("Assertion examples test @myFirstTag", async  ({ page }) => {
    
    // go to test page
    await loadHomePage(page)

    // assert the correct url:
    await expect(page).toHaveURL("https://www.example.com");

    // assert the correct page's title:
    await expect(page).toHaveTitle("Example Domain");

    const elementH1 = await page.locator("h1");
    // chcek if element is correctly displayed:
    await expect(elementH1).toBeVisible()
    // if text of the element equals:
    await assertTitle(page)
    // if it is visible only once:
    await expect(elementH1).toHaveCount(1) 

    const nonExistingElement = await page.locator("h5");
    // non visible assertion:
    await expect(nonExistingElement).not.toBeVisible();
}) 

test.describe("Hooks @screenshot", () => {

    test.beforeEach(async ({ page }) => {
        // this runs before each test, 
        // same is also for afterEach
        // and playwright recognizes beforeAll and afterAll as well

        // 1. step is load website
        await loadHomePage(page);
    }) 

    test("Full page screenshot test", async  ({ page }) => {
    
        // 2. step is take screenshot of full page:
        await page.screenshot({ path: "screenshot.png", fullPage: true})
    
    }) 
    
    test("Single element screenshot test", async  ({ page }) => {
    
        const element = await page.$("h1");
    
        // 2. step is take screenshot of full page:
        // await element.screenshot({ path: "h1_screenshot.png" })
    
    }) 
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