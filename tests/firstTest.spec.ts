import {expect, test} from '@playwright/test'

test.beforeEach('Run before each test', async ({page}, testInfo) =>{
    testInfo.setTimeout(testInfo.timeout + 2000);
})


test('the first test', async ({page})=> {
    await page.goto('https://foden-testing-application.vercel.app/pages/iot-dashboard')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.skip('Locators syntax rules', async ({page}) => {
    //by tag name
    await page.locator('button').first().click()
    //by id
    const userInput = page.locator('#userId')
    await userInput.waitFor({state: 'attached'})
    const text = await userInput.allTextContents()
    expect(text).toEqual("Foden")
    expect(userInput).toHaveText("Foden", {timeout: 20000})
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


    //__wait for element
    await page.waitForSelector("#userId")

    //__wait for particular response
    await page.waitForResponse("http://uitestingplayground.com/ajaxdata")

    //__wait for network calls to be completed (not recommended)
    await page.waitForLoadState("networkidle")
})

// test.describe('first test suite', () => {
//     test('first test in the suite', () => {
//         console.log('first test in the suite')
//     })

//     test('second test in the suite', () => {
//         console.log('first test in the suite')
//     })
// })