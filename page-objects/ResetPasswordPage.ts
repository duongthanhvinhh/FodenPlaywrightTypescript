import {Page, Locator} from '@playwright/test'

export class ResetPasswordPage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}