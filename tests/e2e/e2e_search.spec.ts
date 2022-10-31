import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel.only("Search results", () => {
    let homePage: HomePage
    
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.loadHomePage()
    })

    test("Should find search results",async ({ page }) => {
        
        const searchCriteria = "Bank"
        // type into the search field:
        await homePage.search(searchCriteria)

        // check page's URL
        await expect(page).toHaveURL("http://zero.webappsecurity.com/search.html?searchTerm=Bank")

        const numerOfLinks = await page.locator("li > a")
        const firstLink = await page.locator("ul> li:first-child > a")
        const secondLink = await page.locator("ul> li:last-child > a")

        // check number of search results found:
        await expect(numerOfLinks).toHaveCount(2)

        // check if they contain search criteria's text as well - non-strict assert:
        await expect(firstLink).toContainText(searchCriteria)
        await expect(secondLink).toContainText(searchCriteria)

    })

    test("Should not find any search results",async ({ page }) => {
        
        const searchCriteria = "Not Found"
        // type into the search field:
        await homePage.search(searchCriteria)

        // check page's URL
        await expect(page).toHaveURL("http://zero.webappsecurity.com/search.html?searchTerm=Not+Found")

        // check number of search results found:
        const searchResultMessage = await page.locator(".top_offset")

        await expect(searchResultMessage).toContainText("No results were found for the query: " + searchCriteria)


    })
})
