import { test, expect } from "@playwright/test";

test.describe.only("Tips and tricks section", () => {

    test("TestInfo Object", async ({ page }, testInfo ) => {
        await page.goto("https://www.example.com")
        console.log(testInfo)

        // by adding testInfo after the page, I can get lot of info about my test
        // it can be printed to console or sent to some monitoring tools
        // also I can extract only some info like this:

        console.log(testInfo.title)
    })
})