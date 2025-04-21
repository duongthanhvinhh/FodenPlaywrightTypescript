import {Page, Locator} from '@playwright/test'

export class SmartTablePage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}