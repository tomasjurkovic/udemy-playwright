import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class SearchPage extends AbstractPage {
    // Selectors' definition:
    readonly page: Page
    readonly numberOfResults: Locator
    readonly firstResult: Locator
    readonly lastResult: Locator
    readonly noResultsMessage: Locator

    // Init selectors using constructor:
    constructor(page: Page) {
        super(page)
        this.page = page
        this.numberOfResults = page.locator("li > a")
        this.firstResult = page.locator("ul> li:first-child > a")
        this.lastResult = page.locator("ul> li:last-child > a")
        this.noResultsMessage = page.locator(".top_offset")
    }

    // Define login page methods:
    async assertNumberOfRecords(numOfRecords:number) {
        await expect(this.numberOfResults).toHaveCount(numOfRecords)
    }

    async assertFirstResultText(searchCriteria: string) {
        await expect(this.firstResult).toContainText(searchCriteria)
    }

    async assertLastResultText(searchCriteria: string) {
        await expect(this.lastResult).toContainText(searchCriteria)
    }

    async confirmThatNoResultsWereFound(searchCriteria: string) {
        await expect(this.noResultsMessage).toContainText("No results were found for the query: " + searchCriteria)
    }
}