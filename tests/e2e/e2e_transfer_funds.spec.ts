import { test, expect } from '@playwright/test'
import { loadTestHomePage } from '../../helpers'

test.describe.only('Transfer funds test', () => {

    // before each hook using login:

    test.beforeEach(async ({ page }) => {

        await loadTestHomePage(page)

        await page.click('#signin_button')
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click("text=Sign in")
    })

    test("Transfer Funds test",async ({ page }) => {
        
        // go to Transfer funds tab:
        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")

        // select from dropdowns:
        await page.selectOption("#tf_fromAccountId", "2")
        await page.selectOption("#tf_toAccountId", "4")

        // fill text inputs fields:
        await page.type("#tf_amount", "1000")
        await page.type("#tf_description", "Go & buy some Bitcoin.")

        // submit the form
        await page.click("#btn_submit")

        // check page's changed URL 
        await expect(page).toHaveURL("http://zero.webappsecurity.com/bank/transfer-funds-verify.html")

        // submit the form second time after verification:
        await page.click("#btn_submit")

        // check the changed URL:
        await expect(page).toHaveURL("http://zero.webappsecurity.com/bank/transfer-funds-confirm.html")

        // check the success message:
        const successMessage = await page.locator('.alert-success')
        await expect(successMessage).toContainText("You successfully submitted your transaction.")

        // check if correct price was sent
        const fromAccount = await page.locator(".board-content .row:first-child .span3")
        const toAccount = await page.locator(".board-content .row:nth-child(2) .span3")
        const amountSent = await page.locator(".board-content .row:last-child .span3")
        
        await expect(fromAccount).toContainText("Checking")
        await expect(toAccount).toContainText("Loan")
        await expect(amountSent).toContainText("$ 1000")
    })

    test("Enabled and Disabled fields on Transfer Fund page test",async ({ page }) => {    

        // go to Transfer funds tab:
        await page.goto("http://zero.webappsecurity.com/bank/transfer-funds.html")
        
        // store all input fields:
        const fromAccountInputField = await page.locator("#tf_fromAccountId")
        const toAccountInputField = await page.locator("#tf_toAccountId")
        const amountInputField = await page.locator("#tf_amount")
        const descriptionInputField = await page.locator("#tf_description")

        // check if they are enabled by default:
        await expect(fromAccountInputField).toBeEnabled()
        await expect(toAccountInputField).toBeEnabled()
        await expect(amountInputField).toBeEnabled()
        await expect(descriptionInputField).toBeEnabled()

        // check if they are eeditable
        await expect(fromAccountInputField).toBeEditable()
        await expect(toAccountInputField).toBeEditable()
        await expect(amountInputField).toBeEditable()
        await expect(descriptionInputField).toBeEditable()

        // select from dropdowns:
        await page.selectOption("#tf_fromAccountId", "2")
        await page.selectOption("#tf_toAccountId", "3")

        // fill text inputs fields:
        await page.type("#tf_amount", "1000")
        await page.type("#tf_description", "Go & buy some Bitcoin.")

        // submit the form
        await page.click("#btn_submit")

        // check if now these input fields are read-only
        await expect(fromAccountInputField).toBeDisabled()
        await expect(toAccountInputField).toBeDisabled()
        await expect(amountInputField).toBeDisabled()
        await expect(descriptionInputField).toBeDisabled()

        // check if they are non-editable
        await expect(fromAccountInputField).not.toBeEditable()
        await expect(toAccountInputField).not.toBeEditable()
        await expect(amountInputField).not.toBeEditable()
        await expect(descriptionInputField).not.toBeEditable()
    })

})