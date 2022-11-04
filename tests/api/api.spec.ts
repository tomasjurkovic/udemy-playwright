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

    test("GET REQUEST - Get User Detail", async ({ request }) => {
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

    test("POST REQUEST - Create New User", async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                "name": "Tomas Test",
                "job": "automation tester"
            }
        })
        expect(response.status()).toBe(201) // created status is 201
        
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.name).toBe('Tomas Test')  // assert name
        expect(responseBody.job).toBe('automation tester')  // assert job
        expect(responseBody.id).toBeTruthy()  // assert id exists
        expect(responseBody.createdAt).toBeTruthy()  // assert createdAt exists
    })

    test("POST REQUEST - Create Another New User With Different Data", async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                "id": 666
            }
        })
        expect(response.status()).toBe(201) // created status is 201
        
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.name).toBeFalsy()  // assert name is not filled
        expect(responseBody.job).toBeFalsy()  // assert job is not filled
        expect(responseBody.id).toBe(666)  // assert id 
        expect(responseBody.createdAt).toBeTruthy()  // assert createdAt exists (filled automatically)
    })

    test("POST REQUEST - Login successful test", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        })
        expect(response.status()).toBe(200) // logged in status is 200
        
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.token).toBeTruthy()  // assert token exists (token is usually unique and randomly generated)

        const token = responseBody.token  // put token into variable if needed for test purposes
        console.log(token)
    })

    test("POST REQUEST - Login unsuccessful test - missing password", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "email": "peter@klaven"
            }
        })
        expect(response.status()).toBe(400) // unsuccessful logged in status is 400
        
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.error).toBeTruthy()  // assert that error is returned in response
        expect(responseBody.error).toBe("Missing password")
    })

    test("POST REQUEST - Login unsuccessful test - missing email", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "password": "safePassword"
            }
        })
        expect(response.status()).toBe(400) // unsuccessful logged in status is 400
        
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.error).toBeTruthy()  // assert that error is returned in response
        expect(responseBody.error).toBe("Missing email or username")
    })

    test("PUT REQUEST - Update User", async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/2`, {
            data: {
                "name": "Gabriel Jesus",
                "job": "footballer"
            }
        })
        expect(response.status()).toBe(200) // for updated user status is 200
        
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
        expect(responseBody.updatedAt).toBeTruthy()  // assert that error is returned in response
        expect(responseBody.name).toBe("Gabriel Jesus")  // assert name
        expect(responseBody.job).toBe("footballer")  // assert job

    })
})

