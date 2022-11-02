import { test, expect } from "@playwright/test";

test.describe("Visual Regression test", () => {
    test("Full Page Snapshot", async ({ page }) => {
        await page.goto("https://www.example.com")
        expect(await page.screenshot()).toMatchSnapshot("homepage.png")
    })
})