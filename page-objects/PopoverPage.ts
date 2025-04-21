import {Page, Locator} from '@playwright/test'

export class PopoverPage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}