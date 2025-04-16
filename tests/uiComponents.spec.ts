import {expect, test} from '@playwright/test'


test.beforeEach('Go to test URL', async ({page}) => {
    await page.goto('https://foden-testing-application.vercel.app/pages/iot-dashboard')
    // await page.goto('http://localhost:4200')
})

test.describe('Form layouts page', () => {

    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input field', async ({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test@test.com', {delay: 500})

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test@test.com')

    })

    test('Radio buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        // await usingTheGridForm.getByLabel('Option 1').check({force: true})
        // or
        await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true})
        const radioStatus = usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()
        expect(radioStatus).toBeTruthy()

        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeFalsy()
    })

})