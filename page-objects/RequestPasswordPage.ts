import {Page, Locator} from '@playwright/test'

export class RequestPasswordPage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}