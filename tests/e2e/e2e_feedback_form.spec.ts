import { test, expect } from '@playwright/test'
import { FeedbackPage } from '../../page-objects/FeedbackPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe.parallel.only("Feedback Form", () => {
    let homePage: HomePage
    let feedbackPage: FeedbackPage

    // before hook:
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)

        await homePage.loadHomePage()
        await homePage.clickOnFeedbackTab()
    })

    // reset feedback form:
    test("Reset Feedback form", async ({ page }) => {

        // fill the form fields
        await feedbackPage.fillFeedbackFormInputs(
            "Tomas", "tomas@example.com", "My Feedback", "I like learning Playwright, thank you for your course"
        )

        // click on reset button
        await feedbackPage.clickOnResetButton()

        // check if values were removed
        await feedbackPage.assertAllInputsAreEmpty()

    })

    // submit feedback form:
    test("Submit Feedback form",async ({ page }) => {
        // create name const:
        const name = "Tomas"

        // fill the form fields
        await feedbackPage.fillFeedbackFormInputs(
            name, "tomas@example.com", "My Feedback", "I like learning Playwright, thank you for your course"
        )
        
        // click on reset button
        await feedbackPage.clickOnSubmitButton()

        // check if user is redirected to correct url
        await expect(page).toHaveURL("http://zero.webappsecurity.com/sendFeedback.html")

        // wait for selector command (shortened version of our next 2 lines of code):
        // await page.waitForSelector("#feedback-title")

        // check if correct message appears:
        await feedbackPage.assertConfirmMessage(name)
    })


})