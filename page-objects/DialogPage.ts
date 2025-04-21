import {Page, Locator} from '@playwright/test'

export class DialogPage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}