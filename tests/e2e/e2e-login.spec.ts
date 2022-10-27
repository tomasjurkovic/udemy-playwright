import { test, expect } from "@playwright/test";
import { loadTestHomePage, logoutFromTestPage } from "../../helpers";

test.describe.parallel("Login / Logout flow", () => {
    // before hook:
    test.beforeEach(async ({ page}) => {
        await loadTestHomePage(page)        
    })

    // negative scenario:
    test("Negative scenario for login", async ({ page }) => {
        await page.click('#signin_button')
        await page.type("#user_login", "invalid user name")
        await page.type("#user_password", "invalid password")
        await page.click("text=Sign in")

        // assert error message:
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText("Login and/or password are wrong")
    })
    
    // positive scenario + logout:
    test("Positive scenario for login + logout", async ({page}) => {
        await page.click('#signin_button')
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click("text=Sign in")

        // this is really needed because of the SSL error:
        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
        
        // assert if user is logged in by checking one of the element's text:
        const accountSummaryTab = await page.locator("#account_summary_tab")
        await expect(accountSummaryTab).toBeVisible()

        // logout:
        await logoutFromTestPage(page)
        
        // assert if user ios redirected to correct URL:
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")

    })

})