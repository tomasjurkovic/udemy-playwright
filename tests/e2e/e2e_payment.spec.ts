import { test, expect } from "@playwright/test";
import { loadTestHomePage } from "../../helpers";

test.describe.parallel("New Payment test", async () => {
    
    // before hook:
    test.beforeEach(async ({ page }) => {
        await loadTestHomePage(page)

        await page.click('#signin_button')
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click("text=Sign in")   
    })

    test("Should send new payment",async ({ page }) => {
        // go to Pay Bills tab:
        await page.goto("http://zero.webappsecurity.com/bank/pay-bills.html") 

        // select from dropdown:
        await page.selectOption("#sp_payee", "apple")  // currently text value is selected instead of number

        // click on 'get payee's details button:
        await page.click("#sp_get_payee_details")
        
        // check if selector appears:
        await page.waitForSelector("#sp_payee_details")

        // select from dropdown:
        await page.selectOption("#sp_account", "5")  // which is "Credit Card"

        // fill the amount:
        await page.type("#sp_amount", "600")

        // using page.type to insert date's value to datepicker input field:
        await page.type("#sp_date", "2022-10-31")

        // fill the description:
        await page.type("#sp_description", "This is the payment")

        // click on 'Pay' button:
        await page.click("#pay_saved_payees")

        // check if success message appears on the screen:
        const successMessage = await page.locator("#alert_content > span")
        await expect(successMessage).toBeVisible()
        await expect(successMessage).toHaveText("The payment was successfully submitted.")
    })
    
    test("Should add new payee",async ({ page }) => {
        // go to Pay Bills tab:
        await page.goto("http://zero.webappsecurity.com/bank/pay-bills.html") 

        // click on 'add new payee' tab
        await page.click(".ui-tabs-nav a[href$='#ui-tabs-2']")

        // fill 4 inputs:
        const payeeName = "Test Payee"
        await page.type("#np_new_payee_name", payeeName)  // payee name
        await page.type("#np_new_payee_address", "Wall Street 5, New York") // payee address
        await page.type("#np_new_payee_account", "Test Account")  // account
        await page.type("#np_new_payee_details", "Test Payee")  // payee details

        // click on 'Add' button:
        await page.click("#add_new_payee")

        // check if success message appears on the screen:
        const successMessage = await page.locator("#alert_content")
        await expect(successMessage).toBeVisible()
        await expect(successMessage).toHaveText("The new payee " + payeeName + " was successfully created.")
    })

    test("Should purchase foreign currency",async ({ page }) => {
        // go to Pay Bills tab:
        await page.goto("http://zero.webappsecurity.com/bank/pay-bills.html") 

        // click on 'purchase foreign currency' tab
        await page.click(".ui-tabs-nav a[href$='#ui-tabs-3']")

        await page.selectOption("#pc_currency", "EUR")

        // check if sell rate message appears on the screen:
        const todaySellRate = await page.locator(".help-block > strong")
        const exchangeCourseMessage = await page.locator("#sp_sell_rate")
        await expect(todaySellRate).toBeVisible()
        await expect(exchangeCourseMessage).toBeVisible()
        await expect(todaySellRate).toHaveText("Today's Sell Rate:")
        await expect(exchangeCourseMessage).toHaveText("1 euro (EUR) = 1.3862 U.S. dollar (USD)")

        // fill amount:
        const price = "1000"
        await page.type("#pc_amount", price)

        // click on 'dollar' radio option:
        await page.check(".radio #pc_inDollars_true")

        // click on 'Calculate Costs' button:
        await page.click("#pc_calculate_costs")        

        // check if convert message appears on the screen:
        const convertMessage = await page.locator("#pc_conversion_amount")
        await expect(convertMessage).toBeVisible()
        await expect(convertMessage).toHaveText("721.40 euro (EUR) = " + price + ".00 U.S. dollar (USD)")

        // click on 'Purchase' button:
        await page.click("#purchase_cash")

        // check if success message appears on the screen:
        const successMessage = await page.locator("#alert_content")
        await expect(successMessage).toBeVisible()
        await expect(successMessage).toHaveText("Foreign currency cash was successfully purchased.")
    })

})