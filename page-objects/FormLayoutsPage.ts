import {Page, Locator} from '@playwright/test'

export class FormLayoutsPage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}