import {Page, Locator} from '@playwright/test'

export class EchartsPage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}