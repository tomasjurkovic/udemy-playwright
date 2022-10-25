import { test, expect } from '@playwright/test'

test("Simple basic test", async  ({ page }) => {
    
    // go to example.com
    page.goto("https://www.example.com");

    // check page's title is correct
    const pageTitle = await page.locator("h1")
    await expect(pageTitle).toContainText("Example Domain")

}) 