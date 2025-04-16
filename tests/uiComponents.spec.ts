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

test('checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true}) //If the checkbox is already checked, click will uncheck the checkbox
    await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true}) //If the checkbox is already checked, ckeck() will do nothing
    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true}) //If the checkbox is already unchecked, uncheck() will do nothing

    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }
})

test('lists and dropdowns', async ({page}) => {
    const dropdownMenu = page.locator('ngx-header nb-select')
    await dropdownMenu.click()
    page.getByRole('list') //Use it when the list has the ul tag
    page.getByRole('listitem') //Use it when the list has li tag

    // const optionList = page.getByRole('list').locator('nb-option') //Not widely used
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({hasText: "Cosmic"}).click()

    //verify color of element
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropdownMenu.click()
    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != "Corporate"){
            await dropdownMenu.click()
        }
    }

})

test('tooltips', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await tooltipCard.getByRole('button', {name: "Top"}).hover()

    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')


    page.getByRole('tooltip') //Only use if you have a role tooltip created
})