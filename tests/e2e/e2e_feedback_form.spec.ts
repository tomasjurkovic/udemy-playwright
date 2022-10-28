import { test, expect } from '@playwright/test'
import { loadTestHomePage } from '../../helpers'

test.describe("Feedback Form", () => {

    // before hook:
    test.beforeEach(async ({ page }) => {
        await loadTestHomePage(page)
        await page.click("#feedback")
    })

    // reset feedback form:
    test("Reset Feedback form",async ({ page }) => {
        // fill the form fields
        await page.type("#name", "Tomas")
        await page.type("#email", "tomas@example.com")
        await page.type("#subject", "My Feedback")
        await page.type("#comment", "I like learning Playwright, thank you for your course")

        // click on reset button
        await page.click("input[value='Clear']")
        await page.pause()
    })

    // submit feedback form:

})