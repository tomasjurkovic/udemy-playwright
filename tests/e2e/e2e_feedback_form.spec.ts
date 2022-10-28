import { test, expect } from '@playwright/test'
import { loadTestHomePage } from '../../helpers'

test.describe.parallel("Feedback Form", () => {

    // before hook:
    test.beforeEach(async ({ page }) => {
        await loadTestHomePage(page)
        await page.click("#feedback")
    })

    // reset feedback form:
    test("Reset Feedback form", async ({ page }) => {
        const nameInput = await page.locator("#name")
        const emailInput = await page.locator("#email")
        const subjectInput = await page.locator("#subject")
        const commentInput = await page.locator("#comment")

        // fill the form fields
        await page.type("#name", "Tomas")
        await page.type("#email", "tomas@example.com")
        await page.type("#subject", "My Feedback")
        await page.type("#comment", "I like learning Playwright, thank you for your course")

        // click on reset button
        await page.click("input[value='Clear']")

        // check if values were removed
        await expect(nameInput).toBeEmpty()
        await expect(emailInput).toBeEmpty()
        await expect(subjectInput).toBeEmpty()
        await expect(commentInput).toBeEmpty()

    })

    // submit feedback form:
    test("Submit Feedback form",async ({ page }) => {
        // create name const:
        const name = "Tomas"

        // fill the form fields
        await page.type("#name", name)
        await page.type("#email", "tomas@example.com")
        await page.type("#subject", "My Feedback")
        await page.type("#comment", "I like learning Playwright, thank you for your course")
        
        // click on reset button
        await page.click("input[value='Send Message']")

        // check if user is redirected to correct url
        await expect(page).toHaveURL("http://zero.webappsecurity.com/sendFeedback.html")

        // wait for selector command (shortened version of our next 4 lines of code):
        await page.waitForSelector("#feedback-title")

        // create feedback message locator:
        const confirmMessage = await page.locator(".offset3")

        // check if correct message appears:
        await expect(confirmMessage).toContainText("Thank you for your comments, " + name + ". They will be reviewed by our Customer Service staff and given the full attention that they deserve.")
    })


})