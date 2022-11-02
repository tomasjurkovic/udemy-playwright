import { test } from "@playwright/test";
import { HomePage } from '../../page-objects/HomePage';
import { LoginPage } from '../../page-objects/LoginPage';
import { PaymentPage } from "../../page-objects/PaymentPage";


test.describe.parallel("New Payment test", async () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage
    
    // before hook:
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        paymentPage = new PaymentPage(page)

        await homePage.loadHomePage()
        await homePage.clickOnSignInButton()
        await loginPage.login("username", "password")  
    })

    test("Should send new payment",async ({ page }) => {
        // go to Pay Bills tab:
        await paymentPage.navigateToPaymentsPage()

        // sfill the form:
        await paymentPage.fillPaySavedPayeeForm(
            "apple", "5", "600", "2022-10-31", "This is the payment"
        )

        // click on 'get payee's details button:
        await paymentPage.clickOnPayeeDetailsButton()
        
        // check if selector appears:
        await paymentPage.assertPayeeDetailsAppear()

        // click on 'Pay' button:
        await paymentPage.clickOnPayButton()

        // check if success message appears on the screen:
        await paymentPage.assertPaySavedPayeeSuccesMessage()
    })
    
    test("Should add new payee",async ({ page }) => {
        // go to Pay Bills tab:
        await paymentPage.navigateToPaymentsPage()

        // click on 'add new payee' tab
        await paymentPage.clickOnAddNewPayeeTab()

        // fill 4 inputs:
        const payeeName = "Test Payee"
        await paymentPage.fillNewPayeeForm(
            payeeName, 
            "Wall Street 5, New York", 
            "Test Account", 
            "Test Payee"
            )

        // click on 'Add' button:
        await paymentPage.clickOnAddNewPayeeButton()

        // check if success message appears on the screen:
        await paymentPage.assertNewPayeeAddedSuccesMessage(payeeName)
    })

    test("Should purchase foreign currency",async ({ page }) => {
        // go to Pay Bills tab:
        await paymentPage.navigateToPaymentsPage()

        // click on 'purchase foreign currency' tab
        await paymentPage.clickOnPurchaseForeignCurrencyTab()

        // select currency
        const currency = "EUR"
        const sellrate = "1 euro (EUR) = 1.3862 U.S. dollar (USD)"
        await paymentPage.selectCurrency(currency)

        // check if sell rate message appears on the screen:
        await paymentPage.assertTodaysSellRate(sellrate)

        // fill amount:
        const price = "1000"
        await paymentPage.fillAmountForeginCurrency(price)

        // click on 'dollar' radio option:
        await paymentPage.selectDollarCurrency()

        // click on 'Calculate Costs' button:
        await paymentPage.clickOnCalculateCosts()        

        // check if convert message appears on the screen:
        await paymentPage.assertConversionRateMessage()

        // click on 'Purchase' button:
        await paymentPage.clickOnPurchaseButton()

        // check if success message appears on the screen:
        await paymentPage.assertForeignCurrencySuccesMessage()
    })

})