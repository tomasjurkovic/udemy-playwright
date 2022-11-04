import { test, expect } from "@playwright/test";

test.describe.parallel("API Testing", () => {

    const baseUrl = "https://reqres.in/api"

    test("Simple API Test - Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)
        expect(response.status()).toBe(200) // success status code
    })

    test("Simple API Test - How to Parse JSON", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/3`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
    })

    test("Simple API Test - Assert Invalid Endpoint", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/definitelyNotExistingEndpoint`)
        expect(response.status()).toBe(404) // not found status code
    })
})

