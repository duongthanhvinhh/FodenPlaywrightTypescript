import {Page, Locator} from '@playwright/test'

export class DatePickerPage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}