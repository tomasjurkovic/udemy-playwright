import { test, expect } from "@playwright/test";

test.describe("Visual Regression test", () => {
    test("Full Page Snapshot", async ({ page }) => {
        await page.goto("https://www.example.com")
        expect(await page.screenshot()).toMatchSnapshot("homepage.png")
    })

    test("Single element snapshot", async ({ page }) => {
        await page.goto("https://www.example.com")
        const h1Element = await page.$('h1') // it assign this element to the variable
        expect(await h1Element.screenshot()).toMatchSnapshot('h1Element.png')
    })
})