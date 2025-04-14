import {test} from '@playwright/test'

test('the first test', async ({page})=> {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locators syntax rules', async ({page}) => {
    //by tag name
    await page.locator('button').first().click()
    //by id
    page.locator('#userId')
    //by class name
    page.locator('.big-button')
    //by class name (full)
    page.locator('[class="full-width size-medium status-basic shape-rectangle nb-transition"]')
    //by attribute
    page.locator('[placeholder="Username"]')
    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')
    //by xpath (not recommend)
    page.locator('//input[@placeholder="Username"]')
    //by partial text match
    page.locator(':text("Input your")')
    //by exact text match
    page.locator(':text-is("Input your username")')
})

// test.describe('first test suite', () => {
//     test('first test in the suite', () => {
//         console.log('first test in the suite')
//     })

//     test('second test in the suite', () => {
//         console.log('first test in the suite')
//     })
// })