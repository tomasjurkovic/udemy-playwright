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

    // this is how I can create parametrized test 
    const people = ["Mike", "Judy", "Peter", "Elon", "Alice"]
    for(const name of people) {
        test(`Running test for ${name}`, async ({ page }) => {
            // test will run 5 times, and tries searching with 5 different names from the list
            await page.goto("http://zero.webappsecurity.com/index.html")
            await page.type("#searchTerm", name)
            await page.waitForTimeout(3000)
        })
    }

    test("Mouse Movement Simulation", async ({ page }) => {
        await page.goto("https://www.example.com")
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
        await page.mouse.up()
        // it enables movements with mouse
    })

    test.only("Multiple browser tabs inside one browser", async ({ browser }) => {
        // this is how we create browser context in tests:
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()
        await page1.goto("https://www.example.com")
        await page2.goto("https://www.google.com")
        await page3.goto("https://www.udemy.com")
        await page1.waitForTimeout(5000)
    })
   
})