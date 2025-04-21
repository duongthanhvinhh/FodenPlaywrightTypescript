import {Page, Locator} from '@playwright/test'

export class TreeGridPage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}