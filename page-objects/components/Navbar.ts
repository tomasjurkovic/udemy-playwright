import { expect, Locator, Page } from "@playwright/test";

export class Navbar {
    // Selectors' definition:
    readonly page: Page
    readonly accountSummaryTab: Locator
    readonly accountActivityTab: Locator
    readonly transferFundsTab: Locator
    readonly payBillsTab: Locator
    readonly myMoneyTab: Locator
    readonly onlineStatemenetsTab: Locator

    // Init selectors using constructor:
    constructor(page: Page) {
        this.page = page
        this.accountSummaryTab = page.locator("#account_summary_tab")
        this.accountActivityTab = page.locator("#account_activity_tab")
        this.transferFundsTab = page.locator("#transfer_funds_tab")
        this.payBillsTab = page.locator('#pay_bills_tab')
        this.myMoneyTab = page.locator('#my_money_tab')
        this.onlineStatemenetsTab = page.locator('#online_statements_tab')
    }

    // Define navbar methods:
    async clickOnTab(tabname) {
        switch (tabname) {
            case "Account Summary":
                await this.accountSummaryTab.click()
                break
            case "Account Activity":
                await this.accountActivityTab.click()
                break
            case "Transfer Funds":
                await this.transferFundsTab.click()
                break
            case "Pay Bills":
                await this.payBillsTab.click()
                break
            case "My Money":
                await this.myMoneyTab.click()
                break
            case "Online Statements":
                await this.onlineStatemenetsTab.click()
                break
            default:
                throw new Error("This tab does not exist...")
        }
    }
}