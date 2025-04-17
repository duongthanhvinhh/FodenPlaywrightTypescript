import {test, expect} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'

test.beforeEach(async ({page}) => {
    await page.goto('https://foden-testing-application.vercel.app/pages/iot-dashboard')
})

test('first test using page object', async ({page}) => {
    const navigationTo = new NavigationPage(page)
    await navigationTo.formLayoutsPage()
    await navigationTo.datePickerPage()
    // await navigationTo.registerPage()
    await navigationTo.dialogPage()
    // await navigationTo.requestPasswordPage()
})