import {Page, Locator} from '@playwright/test'

export class ToastrPage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}