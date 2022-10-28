import { test, expect } from '@playwright/test'
import { loadTestHomePage } from '../../helpers'

test.describe('Transfer funds test', () => {

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
        await page.selectOption("#tf_toAccountId", "3")

        // fill text inputs fields:
        await page.type("#tf_amount", "1000")
        await page.type("#tf_description", "Go & buy some Bitcoin.")
    })
})