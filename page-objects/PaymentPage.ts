import { expect, Locator, Page } from "@playwright/test";

export class PaymentPage {
    // Selectors' definition:
    readonly page: Page
        // tabs:
    readonly paySavedPayeeTab: Locator
    readonly addNewTab: Locator
    readonly purchaseForeignCurrencyTab: Locator
        // Pay Saved Payee selectors:
    readonly payeeSelect: Locator
    readonly accountSelect: Locator
    readonly amountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
        // Pay Saved Payee buttons:
    readonly payeeDetailsButton: Locator
    readonly payButton: Locator
        // Pay Saved Payee messages:
    readonly payeeDetails: Locator
    readonly paySavedPayeeSuccessMessage: Locator

        // Add New Payee selectors:
    readonly payeeNameInput: Locator
    readonly payeeAddressInput: Locator
    readonly accountInput: Locator
    readonly payeeDetailsInput: Locator
        // Add New Payee buttons:
    readonly addButton: Locator
        // Add New Payee messages:
    readonly newPayeeSuccessMessage: Locator

        // Foreign currency selectors:
    readonly currencySelect: Locator
    readonly amountInputFC: Locator
    readonly dollarUSDRadio: Locator
    readonly selectedCurrencyRadio: Locator
    readonly sellRateText: Locator

        // Foreign currency buttons:
    readonly calculateCostsButton: Locator
    readonly purchaseButton: Locator

        // Foreign currency messages:
    readonly sellRateMessage: Locator
    readonly calculatedCostsMessage: Locator
    readonly foreignCurrencySuccessMessage: Locator

    // Init selectors using constructor:
    constructor(page: Page) {
        this.page = page

        this.paySavedPayeeTab = page.locator(".ui-tabs-nav a[href$='#ui-tabs-1']")
        this.addNewTab = page.locator(".ui-tabs-nav a[href$='#ui-tabs-2']")
        this.purchaseForeignCurrencyTab = page.locator(".ui-tabs-nav a[href$='#ui-tabs-3']")

        this.payeeSelect = page.locator("#sp_payee")
        this.accountSelect = page.locator("#sp_account")
        this.amountInput = page.locator("#sp_amount")
        this.dateInput = page.locator("#sp_date")
        this.descriptionInput = page.locator("#sp_description")
        this.payeeDetailsButton = page.locator("#sp_get_payee_details")
        this.payButton = page.locator("#pay_saved_payees")
        this.payeeDetails = page.locator("#sp_payee_details")
        this.paySavedPayeeSuccessMessage = page.locator("#alert_content > span")

        this.payeeNameInput = page.locator("#np_new_payee_name")
        this.payeeAddressInput = page.locator("#np_new_payee_address")
        this.accountInput = page.locator("#np_new_payee_account")
        this.payeeDetailsInput = page.locator("#np_new_payee_details")
        this.addButton = page.locator("#add_new_payee")
        this.newPayeeSuccessMessage = page.locator("#alert_content")

        this.currencySelect = page.locator("#pc_currency")
        this.accountInput = page.locator("#pc_amount")
        this.dollarUSDRadio = page.locator(".radio #pc_inDollars_true")
        this.selectedCurrencyRadio = page.locator(".radio #pc_inDollars_false")
        this.sellRateText = page.locator(".help-block > strong")
        this.calculateCostsButton = page.locator("#pc_calculate_costs")
        this.purchaseButton = page.locator("#purchase_cash")
        this.sellRateMessage = page.locator("#sp_sell_rate")
        this.calculatedCostsMessage = page.locator("#pc_conversion_amount")
        this.foreignCurrencySuccessMessage = page.locator("#alert_content")
    }

    // Define Payment page methods:

    async navigateToPaymentsPage() {
        await this.page.goto("http://zero.webappsecurity.com/bank/pay-bills.html") 
    }
    
    // PAY SAVED PAYEE TAB:
    async clickOnPaySavedPayeeTab() {
        await this.paySavedPayeeTab.click()
    }

    async selectPayee(payee: string) {
        await this.payeeSelect.selectOption(payee)
    }

    async selectAccount(account: string) {
        await this.accountSelect.selectOption(account)
    }

    async fillAmount(amount: string) {
        await this.amountInput.type(amount)
    }

    async fillDate(date: string) {
        await this.dateInput.type(date)
    }

    async fillDescription(description: string) {
        await this.amountInput.type(description)
    }

    async fillPaySavedPayeeForm(
        payee: string, 
        account: string,
        amount: string,
        date: string,
        description: string
        ) 
        {
        await this.selectPayee(payee)
        await this.selectAccount(account)
        await this.fillAmount(amount)
        await this.fillDate(date)
        await this.fillDescription(description)
    }

    async clickOnPayeeDetailsButton() {
        await this.payeeDetailsButton.click()
    }

    async clickOnPayButton() {
        await this.payButton.click()
    }

    async assertPayeeDetailsAppear() {
        await expect(this.paySavedPayeeSuccessMessage).toBeVisible()
    }

    async assertPaySavedPayeeSuccesMessage() {
        await expect(this.paySavedPayeeSuccessMessage).toBeVisible()
        await expect(this.paySavedPayeeSuccessMessage).toHaveText("The payment was successfully submitted.")
    }

    // ADD NEW PAYEE:
    async clickOnAddNewPayeeTab() {
        await this.addNewTab.click()
    }

    async fillNewPayeeForm(
        name: string, 
        address: string, 
        account: string,
        details: string
        ) {
            await this.payeeNameInput.type(name)
            await this.payeeAddressInput.type(address)
            await this.accountInput.type(account)
            await this.payeeDetailsInput.type(details)
    }

    async clickOnAddNewPayeeButton() {
        await this.addButton.click()
    }

    async assertNewPayeeAddedSuccesMessage(payeeName: string) {
        await expect(this.newPayeeSuccessMessage).toBeVisible()
        await expect(this.newPayeeSuccessMessage).toHaveText("The new payee " + payeeName + " was successfully created.")
    }

    // PRUCHASE FOREIGN CURRENCY TAB: 
    async clickOnPurchaseForeignCurrencyTab() {
        await this.purchaseForeignCurrencyTab.click()
    }

    async selectCurrency(currency: string) {
        await this.currencySelect.selectOption(currency)
    }

    async fillAmountForeginCurrency(price: string) {
        await this.amountInputFC.type(price)
    }

    async selectDollarCurrency(dollar: boolean = true) {
        if (dollar == true) {
            await this.dollarUSDRadio.check()
        } else {
            await this.selectedCurrencyRadio.check()
        }
    }
    
    async clickOnCalculateCosts() {
        await this.calculateCostsButton.click()        
    }

    async assertTodaysSellRate(sellrate: string) {
        await expect(this.sellRateText).toBeVisible()
        await expect(this.sellRateMessage).toBeVisible()
        await expect(this.sellRateText).toHaveText("Today's Sell Rate:")
        await expect(this.sellRateMessage).toHaveText(sellrate)
    }

    async assertConversionRateMessage() {
        await expect(this.calculatedCostsMessage).toBeVisible()
        await expect(this.calculatedCostsMessage).toHaveText("721.40 euro (EUR) = 1000.00 U.S. dollar (USD)")
    }

    async assertForeignCurrencySuccesMessage() {
        await expect(this.foreignCurrencySuccessMessage).toBeVisible()
        await expect(this.foreignCurrencySuccessMessage).toHaveText("Foreign currency cash was successfully purchased.")
    }
    
}