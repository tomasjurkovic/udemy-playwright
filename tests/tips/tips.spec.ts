import { test, expect } from "@playwright/test";

test.describe.only("Tips and tricks section", () => {

    test("TestInfo Object", async ({ page }, testInfo ) => {
        await page.goto("https://www.example.com")

        // console.log(testInfo)
        // by adding testInfo after the page, I can get lot of info about my test
        // it can be printed to console or sent to some monitoring tools

        // also I can extract only some info like this:
        console.log(testInfo.title)
    })

    test("Test skipp browser", async ({ page, browserName }) => {
        test.skip(browserName === "chromium", "Feature not ready in Chrome browser")
        // by adding test.skip, this test will not run if browser is chrome, but it runs in all other browsers
        await page.goto("https://www.example.com")
    })

    test("Test Fixme Annotation", async ({ page, browserName }) => {
        test.fixme(browserName === "chromium", "Test is not stable, needs revision")
        // by adding test.fixme, this indicates problem with test code itselfy, common practice
        // test is skipped in chromium browser (because it is selected)
        // we can specified env. variable or any other condition
        await page.goto("https://www.example.com")
    })
})