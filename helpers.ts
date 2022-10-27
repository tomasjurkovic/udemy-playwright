import { expect } from "@playwright/test"

export async function loadHomePage(page) {
    await page.goto('https://www.example.com')
}

export async function loadTestHomePage(page) {
    await page.goto("http://zero.webappsecurity.com/index.html")
}

export async function logoutFromTestPage(page) {
    await page.goto("http://zero.webappsecurity.com/logout.html")
}

export async function assertTitle(page) {
    const title = await page.locator('h1')

    await expect(title).toHaveText("Example Domain")
}