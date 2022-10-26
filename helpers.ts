import { expect } from "@playwright/test"

export async function loadHomePage(page) {
    await page.goto('https://www.example.com')
}

export async function assertTitle(page) {
    const title = await page.waitForSelector('h1')

    await expect(title).toHaveText("Example Domain")
}