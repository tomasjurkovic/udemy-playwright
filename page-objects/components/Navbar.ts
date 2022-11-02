import { expect, Locator, Page } from "@playwright/test";

export class Navbar {
    // Selectors' definition:
    readonly page: Page
    readonly accountSummaryTab: Locator
    readonly accountActivityTab: Locator
    readonly transferFundTab: Locator
    readonly payBillsTab: Locator
    readonly myMoneyTab: Locator
    readonly onlineStatemenetsTab: Locator

    // Init selectors using constructor:
    constructor(page: Page) {
        this.page = page
        this.accountSummaryTab = page.locator("#account_summary_tab")
        this.accountActivityTab = page.locator("#account_activity_tab")
        this.transferFundTab = page.locator("#transfer_funds_tab")
        this.payBillsTab = page.locator('#pay_bills_tab')
        this.myMoneyTab = page.locator('#my_money_tab')
        this.onlineStatemenetsTab = page.locator('#online_statements_tab')
    }

    // Define navbar methods:
    async clickOnAccountSummaryTab() {
        await this.accountSummaryTab.click()
    }

    async clickOnAccountActivityTab() {
        await this.accountActivityTab.click()
    }

    async clickOnTransferFundsTab() {
        await this.transferFundTab.click()
    }

    async clickOnPayBillsTab() {
        await this.payBillsTab.click()
    }

    async clickOnMyMoneyTab() {
        await this.myMoneyTab.click()
    }

    async clickOnOnlineStatementsTab() {
        await this.onlineStatemenetsTab.click()
    }
}