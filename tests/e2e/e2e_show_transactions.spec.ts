import { test, expect } from "@playwright/test";
import { loadTestHomePage } from "../../helpers";

test.describe.parallel.only("Show Transaction tests", async () => {
    
    test.beforeEach(async ({ page }) => {
        await loadTestHomePage(page)

        await page.click('#signin_button')
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click("text=Sign in")

        // navigate to show transaction page:
        await page.goto("http://zero.webappsecurity.com/bank/account-activity.html")
    })

    test("Check table header", async ({ page }) => {

        // select first Savings option
        await page.selectOption("#aa_accountId", "1")

        // check if the expected table headers are visible:
        const header = await page.locator("#all_transactions_for_account thead tr:first-child")

        await expect(header).toContainText("Date	Description	Deposit	Withdrawal")
    })

    test("Show first Savings with results", async ({ page }) => {

        // select first Savings option
        await page.selectOption("#aa_accountId", "1")

        // check if 3 records are there:
        const numberOfRecords = await page.locator("#all_transactions_for_account tbody tr")
        await expect(numberOfRecords).toHaveCount(3)

        // check if the expected results were found:
        const firstRow = await page.locator("#all_transactions_for_account tbody tr:first-child")
        const secondRow = await page.locator("#all_transactions_for_account tbody tr:nth-child(2)")
        const thirdRow = await page.locator("#all_transactions_for_account tbody tr:last-child")

        await expect(firstRow).toContainText("2012-09-06	ONLINE TRANSFER REF #UKKSDRQG6L	984.3	")
        await expect(secondRow).toContainText("2012-09-05	OFFICE SUPPLY		50")
        await expect(thirdRow).toContainText("2012-09-01	ONLINE TRANSFER REF #UKKSDRQG6L	1000	")
    })

    test("Show Checking with results", async ({ page }) => {

        // select Checking option
        await page.selectOption("#aa_accountId", "2")

        // check if 3 records are there:
        const numberOfRecords = await page.locator("#all_transactions_for_account tbody tr")
        await expect(numberOfRecords).toHaveCount(3)

        // check if the expected results were found:
        const firstRow = await page.locator("#all_transactions_for_account tbody tr:first-child")
        const secondRow = await page.locator("#all_transactions_for_account tbody tr:nth-child(2)")
        const thirdRow = await page.locator("#all_transactions_for_account tbody tr:last-child")

        await expect(firstRow).toContainText("2012-09-06	CHECK DEPOSIT	186.7	")
        await expect(secondRow).toContainText("2012-09-05	TELECOM		99.6")
        await expect(thirdRow).toContainText("2012-09-01	CAR PAYMENT		1548")
    })

    test("Show second Savings with results", async ({ page }) => {

        // select second Savings option
        await page.selectOption("#aa_accountId", "3")

        // check if 3 records are there:
        const numberOfRecords = await page.locator("#all_transactions_for_account tbody tr")
        await expect(numberOfRecords).toHaveCount(3)

        // check if the expected results were found:
        const firstRow = await page.locator("#all_transactions_for_account tbody tr:first-child")
        const secondRow = await page.locator("#all_transactions_for_account tbody tr:nth-child(2)")
        const thirdRow = await page.locator("#all_transactions_for_account tbody tr:last-child")

        await expect(firstRow).toContainText("2012-09-06	ONLINE TRANSFER REF #IGREKLVC0D	636.4	")
        await expect(secondRow).toContainText("2012-09-05	ONLINE TRANSFER REF #IGREKLVC0D	55.9	")
        await expect(thirdRow).toContainText("2012-09-01	PAYCHECK		1173.1")
    })

    test("Show Loan with results", async ({ page }) => {

        // select Loan option
        await page.selectOption("#aa_accountId", "4")

        // check if 3 records are there:
        const numberOfRecords = await page.locator("#all_transactions_for_account tbody tr")
        await expect(numberOfRecords).toHaveCount(2)

        // check if the expected results were found:
        const firstRow = await page.locator("#all_transactions_for_account tbody tr:first-child")
        const thirdRow = await page.locator("#all_transactions_for_account tbody tr:last-child")

        await expect(firstRow).toContainText("2012-09-05	RENT		770")
        await expect(thirdRow).toContainText("2012-09-01	RENT		2000")
    })

    test("Show Credit Card with no results", async ({ page }) => {

        // select Credit Card option
        await page.selectOption("#aa_accountId", "5")

        // check if no results were found:
        const resultsField = await page.locator(".well")
        await expect(resultsField).toContainText("No results")
    })

    test("Show Brokerage with no results", async ({ page }) => {

        // select Brokerage option
        await page.selectOption("#aa_accountId", "6")

        // check if no results were found:
        const resultsField = await page.locator(".well")
        await expect(resultsField).toContainText("No results")
    })

})