import {Page, Locator} from '@playwright/test'

export class WindowPage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}