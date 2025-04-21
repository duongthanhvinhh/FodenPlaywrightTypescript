import {Page, Locator} from '@playwright/test'

export class CalendarPage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}