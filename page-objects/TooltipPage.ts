import {Page, Locator} from '@playwright/test'

export class TooltipPage{
    private readonly page: Page
    constructor(page: Page){
        this.page = page
    }
}