import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class FeedbackPage extends AbstractPage {
    // Selectors' definition:
    readonly page: Page
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly subjectInput: Locator
    readonly commentInput: Locator
    readonly resetButton: Locator
    readonly submitButton: Locator
    readonly confirmMessage: Locator

    // Init selectors using constructor:
    constructor(page: Page) {
        super(page)
        this.page = page
        this.nameInput = page.locator("#name")
        this.emailInput = page.locator("#email")
        this.subjectInput = page.locator("#subject")
        this.commentInput = page.locator("#comment")
        this.resetButton = page.locator("input[value='Clear']")
        this.submitButton = page.locator("input[value='Send Message']")
        this.confirmMessage = page.locator(".offset3")
    }

    // Define login page methods:
    async clickOnResetButton() {
        await this.resetButton.click()
    }

    async clickOnSubmitButton() {
        await this.submitButton.click()
    }

    async assertAllInputsAreEmpty() {
        await expect(this.nameInput).toBeEmpty()
        await expect(this.emailInput).toBeEmpty()
        await expect(this.subjectInput).toBeEmpty()
        await expect(this.commentInput).toBeEmpty()
    }

    async fillNameInput(input: string) {
        await this.nameInput.type(input)
    }

    async fillEmailInput(input: string) {
        await this.emailInput.type(input)
    }

    async fillSubjectInput(input: string) {
        await this.subjectInput.type(input)
    }

    async fillCommentInput(input: string) {
        await this.commentInput.type(input)
    }

    async fillFeedbackFormInputs(
        nameInput: string,
        emailInput: string,
        subjectInput: string,
        commentInput: string
        ) {
            await this.fillNameInput(nameInput)
            await this.fillEmailInput(emailInput)
            await this.fillSubjectInput(subjectInput)
            await this.fillCommentInput(commentInput)
    }

    async assertConfirmMessage(name: string) {
        await expect(this.confirmMessage).toContainText(
            "Thank you for your comments, " 
            + name + 
            ". They will be reviewed by our Customer Service staff and given the full attention that they deserve."
            )
    }
}