import { test, expect } from "@playwright/test";
import { logoutFromTestPage } from "../../helpers";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";

test.describe.parallel("Login / Logout flow", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    // before hook:
    test.beforeEach(async ({ page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
           
        await homePage.loadHomePage()
    })

    // negative scenario:
    test("Negative scenario for login", async ({ page }) => {
        await homePage.clickOnSignInButton()
        await loginPage.login("invalid_username", "invalid_password")
        await loginPage.wait(100) 
        // here it is just for demonstration, that I can use function from in my login tests

        // assert error message:
        await loginPage.assertErrorMessage()
    })
    
    // positive scenario + logout:
    test("Positive scenario for login + logout", async ({page}) => {
        await homePage.clickOnSignInButton()
        await loginPage.login("username", "password")

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