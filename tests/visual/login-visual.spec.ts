import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";

test.describe("Login Page visual tests", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.loadHomePage()
        await homePage.clickOnSignInButton()
    })


    test("Visual login form test", async ({ page}) => {
        await loginPage.snapshotLoginForm()
    })

    test("Visual login error message test", async ({ page}) => {
        await loginPage.login("wrong_username", "wrong_password")
        await loginPage.snapshotErrorMessage()
    })
})

