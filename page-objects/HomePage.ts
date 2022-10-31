import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    // Selectors' definition:
    readonly page: Page
    readonly signInButton: Locator

    // Init selectors using constructor:
    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator("#signin_button")
    }

    // Define Home page's methods:
    async loadHomePage() {
        await this.page.goto("http://zero.webappsecurity.com/index.html")
    }

    async clickOnSignInButton() {
        await this.signInButton.click()

    }
}

