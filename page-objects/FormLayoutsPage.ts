import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FormLayoutsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
}