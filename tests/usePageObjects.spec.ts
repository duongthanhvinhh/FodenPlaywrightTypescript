import {test, expect} from '@playwright/test'
import { Navigation } from '../page-objects/Navigation'
import { FormLayoutsPage } from '../page-objects/FormLayoutsPage'

test.beforeEach(async ({page}) => {
    await page.goto('https://foden-testing-application.vercel.app/pages/iot-dashboard')
    // await page.goto('http://localhost:4200')
})

test('first test using page object', async ({page}) => {
    const navigationTo = new Navigation(page)
    await navigationTo.formLayoutsPage()
    await navigationTo.datePickerPage()
    // await navigationTo.registerPage()
    await navigationTo.dialogPage()
    // await navigationTo.requestPasswordPage()
})

test('test parameterized', async ({page}) => {
    
})