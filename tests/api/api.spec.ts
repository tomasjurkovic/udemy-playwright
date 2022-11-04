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

        const responseBody = JSON.parse(await response.text())  // this is how we can parse json from response
    })

    test("Simple API Test - Assert Invalid Endpoint", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/definitelyNotExistingEndpoint`)
        expect(response.status()).toBe(404) // not found status code
    })

    test.only("GET REQUEST - Get User Detail", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`)
        const responseBody = JSON.parse(await response.text())

        // assertions:
        expect(response.status()).toBe(200)  // assert status

        // pattern is following: responseBody.FIRST_LEVEL_DATA.SECOND_LEVEL_DATA and so on:
        expect(responseBody.data.id).toBe(1)  // assert ID
        expect(responseBody.data.email).toBe('george.bluth@reqres.in')  // assert email
        expect(responseBody.data.first_name).toBe('George')  // assert first name
        expect(responseBody.data.last_name).toBe('Bluth')  // assert last name
        expect(responseBody.data.avatar).toBe('https://reqres.in/img/faces/1-image.jpg')  // assert avatar
        expect(responseBody.support.url).toBe('https://reqres.in/#support-heading')  // assert url

        // assert if attribute contains any (not specific) value
        expect(responseBody.support.text).toBeTruthy()  // verifying that this data is included
        expect(responseBody.support.not_existing_value).toBeFalsy() // verifying this data is not included

    })
})

