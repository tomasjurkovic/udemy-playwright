import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { SearchPage } from '../../page-objects/SearchPage'

test.describe.parallel.only("Search results", () => {
    let homePage: HomePage
    let searchPage: SearchPage
    
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        searchPage = new SearchPage(page)
        await homePage.loadHomePage()
    })

    test("Should find search results",async ({ page }) => {
        
        const searchCriteria = "Bank"
        // type into the search field:
        await homePage.searchFor(searchCriteria)

        // check page's URL
        await expect(page).toHaveURL("http://zero.webappsecurity.com/search.html?searchTerm=Bank")

        // check number of search results found:
        await searchPage.assertNumberOfRecords(2)

        // check if they contain search criteria's text as well - non-strict assert:
        await searchPage.assertFirstResultText(searchCriteria)
        await searchPage.assertLastResultText(searchCriteria)
    })

    test("Should not find any search results",async ({ page }) => {
        
        const searchCriteria = "Not Found"
        // type into the search field:
        await homePage.searchFor(searchCriteria)

        // check page's URL
        await expect(page).toHaveURL("http://zero.webappsecurity.com/search.html?searchTerm=Not+Found")

        // check number of search results found:
        await searchPage.confirmThatNoResultsWereFound(searchCriteria)
    })
})
