import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    // Selectors' definition:
    readonly page: Page
    readonly signInButton: Locator
    readonly searchInput: Locator

    // Init selectors using constructor:
    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator("#signin_button")
        this.searchInput = page.locator("#searchTerm")
    }

    // Define Home page's methods:
    async loadHomePage() {
        await this.page.goto("http://zero.webappsecurity.com/index.html")
    }

    async clickOnSignInButton() {
        await this.signInButton.click()

    }

    async search(searchCriteria: string) {
        await this.searchInput.type(searchCriteria)
        // simulating using enter from keyboard
        await this.page.keyboard.press('Enter')
    }
}

