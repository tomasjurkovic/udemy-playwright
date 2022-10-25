import { test, expect } from '@playwright/test'

test("Simple basic test", async  ({ page }) => {
    
    // go to example.com
    await page.goto("https://www.example.com");

    // check page's title is correct
    const pageTitle = await page.locator("h1")
    await expect(pageTitle).toContainText("Example Domain")

}) 

test.only("Clicking on elements test", async  ({ page }) => {
    
    // go to example.com
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.click("#signin_button")
    await page.click("text=Sign in")

    const singInError = page.locator(".alert-error")
    await expect(singInError).toContainText("Login and/or password are wrong.")
}) 