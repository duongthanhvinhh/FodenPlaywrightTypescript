import {Page, Locator, expect, BrowserContext} from '@playwright/test'
import path from 'path'
import * as fs from 'fs'
import { Workbook } from 'exceljs'

export class BasePage{
    public readonly page: Page
    private readonly loadingIcon: Locator

    constructor(page: Page){
        this.page = page
        this.loadingIcon = page.locator('.spinner')
    }

    async navigateTo(url: string){
        await this.page.goto(url)
    }

    async clickElement(element: Locator){
        await element.click()
    }

    async fillElement(element: Locator, value: any){
        await element.fill(value)
    }

    async getElementText(element: Locator): Promise<string>{ 
        return element.innerText()
    }

    async waitForElementVisible(element: Locator | string){
        if(typeof element === 'string'){
            await this.page.waitForSelector(element, {state: 'visible'})
        } else{
            await element.waitFor({state: 'visible'})
        }
    }

    async waitForElementHidden(element: Locator | string){
        if(typeof element === 'string'){
            await this.page.waitForSelector(element, {state: 'hidden'})
        } else{
            await element.waitFor({state: 'hidden'})
        }
    }

    async waitForElementAttached(element: Locator | string): Promise<void>{
        if(typeof element === 'string'){
            await this.page.waitForSelector(element, {state: 'attached'})
        } else{
            await element.waitFor({state: 'attached'})
        }
    }

    async takeScreenshot(fileName: string){
        await this.page.screenshot({path: fileName})
    }

    async getUrl(): Promise<string>{
        return this.page.url()
    }

    async mouseHoverOnWebElement(element: Locator){
        await element.hover()
    }

    async dragAndDrop(dragElementLocator: string, dropElementLocator: string): Promise<void>{
        await this.waitForElementAttached(dragElementLocator)
        await this.waitForElementAttached(dropElementLocator)
        await this.page.dragAndDrop(dragElementLocator, dropElementLocator)
    }

    async downloadFile(locator: string): Promise<string>{
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.click(locator)
        ])
        await download.saveAs(path.join(__dirname, `../Downloads`, download.suggestedFilename()))
        return download.suggestedFilename()
    }

    // To read value from .txt, .csv, .log, .json, .xml, .yml, etc files
    async readValuesFromTextFile(filePath: string): Promise<string> {
        try {
            return await fs.promises.readFile(filePath, 'utf-8');
        } catch (err) {
            console.error(`Failed to read file: ${filePath}`, err);
            throw err;
        }
    }

    async writeDataIntoTextFile(filePath: fs.PathLike, data: string | NodeJS.ArrayBufferView): Promise<void> {
        try {
            await fs.promises.writeFile(filePath, data);
        } catch (error) {
            console.error(`Failed to write file: ${filePath}`, error);
            throw error;
        }
    }
    
    async verifyElementText(element: string, expectedText: string){
        await this.waitForElementAttached(element)
        const actualText: any = await this.page.textContent(element)
        expect(actualText.trim()).toBe(expectedText)
        this.verifyNewWindowUrlContains
    }

    /**
     * 
     * @param context - browser context
     * @param element - element triggers opening new window
     * @param subUrl - sub url of the url in new window after clicking element
     * @returns true or false if the url contains the subUrl
     */
    async verifyNewWindowUrlContains(context: BrowserContext, element: string, subUrl: string): Promise<void>{
        const [newWindow] = await Promise.all([
            context.waitForEvent('page'),
            await this.page.click(element)
        ])
        await newWindow.waitForLoadState('load')
        expect(newWindow.url()).toContain(subUrl)
        await newWindow.close()
    }

    async readDataFromExcelFile(fileName: string, sheetName: string, rowNum: number, cellNum: number): Promise<string>{
        const workbook = new Workbook()
        await workbook.xlsx.readFile(`./Downloads/${fileName}`)
        const sheet = workbook.getWorksheet(sheetName)
        if(!sheet){
            throw new Error(`Sheet "${sheetName}" not found in ${fileName}`)
        }
        const cellValue = sheet.getRow(rowNum).getCell(cellNum).value
        return cellValue?.toString() ?? ''
    }

    async keyPress(element: string, key: string): Promise<void>{
        this.page.press(element, key)
    }

    async keyPressSequently(element: string, key: string): Promise<void>{
        this.page.locator(element).pressSequentially(key)
    }
    
    async selectDropdownOption(element: string, option: string){
        await this.page.locator(element).selectOption(option)
    }

    async checkCheckbox(element: string){
        await this.page.locator(element).check()
        await expect(this.page.locator(element)).toBeChecked()
    }

    async isCheckboxChecked(element: string){
        await expect(this.page.locator(element)).toBeChecked()
    }

    async unCheckCheckbox(element: string){
        await this.page.locator(element).uncheck()
        await expect(this.page.locator(element)).not.toBeChecked()
    }

    async isCheckboxUnChecked(element: string){
        await expect(this.page.locator(element)).not.toBeChecked()
    }

    async getCookie(URL: string, cookieName: string): Promise<string | undefined>{
        const cookies = await this.page.context().cookies(URL)
        const cookie = cookies.find(c => c.name === cookieName)
        if(cookie){
            console.log(`Cookie: ${cookieName}=${cookie.value}`)
            return `${cookieName}=${cookie?.value}`
        } else{
            console.warn(`Cookie: ${cookieName} not found.`)
            return undefined
        }
    }

    async setCookie(cookieName: string, cookieValue: string, options: { path?: string; expiresInSeconds?: number } = {}): Promise<void> {
        const { path = '/', expiresInSeconds } = options;
    
        await this.page.evaluate(
            ({ name, value, path, expiresInSeconds }) => {
                let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}`;
                
                if (expiresInSeconds) {
                    const expiryDate = new Date(Date.now() + expiresInSeconds * 1000);
                    cookieString += `; expires=${expiryDate.toUTCString()}`;
                }
    
                document.cookie = cookieString;
            },
            { name: cookieName, value: cookieValue, path, expiresInSeconds }
        );
    
        // Validate cookie was set correctly
        const cookieExists = await this.page.evaluate((name) => {
            const cookies = document.cookie.split('; ').map(c => c.split('='));
            return cookies.some(([n]) => decodeURIComponent(n) === name);
        }, cookieName);
    
        if (!cookieExists) {
            throw new Error(`Cookie "${cookieName}" was not set.`);
        }
    
        console.log(`✅ Cookie "${cookieName}" set successfully.`);
    }

    async waitForPageLoaded() {
        await this.page.waitForLoadState();
    }

    async verifyUrl(url: any) {
        await expect(this.page).toHaveURL(url);
    }

    async waitForLoadingSpinnerDisappear(){
        await this.waitForElementHidden(this.loadingIcon)
    }
}