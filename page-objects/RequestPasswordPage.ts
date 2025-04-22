import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RequestPasswordPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
}