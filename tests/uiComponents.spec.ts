import {expect, test} from '@playwright/test'


test.beforeEach('Go to test URL', async ({page}) => {
    await page.goto('https://foden-testing-application.vercel.app/pages/iot-dashboard')
    // await page.goto('http://localhost:4200')
})

test.describe('Form layouts page', () => {

    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Input field', async ({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test@test.com', {delay: 500})

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test@test.com')

    })

    test('Radio buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        // await usingTheGridForm.getByLabel('Option 1').check({force: true})
        // or
        await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).check({force: true})
        const radioStatus = usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()
        expect(radioStatus).toBeTruthy()

        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeFalsy()
    })

})

test('checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true}) //If the checkbox is already checked, click will uncheck the checkbox
    await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true}) //If the checkbox is already checked, ckeck() will do nothing
    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true}) //If the checkbox is already unchecked, uncheck() will do nothing

    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }
})

test('lists and dropdowns', async ({page}) => {
    const dropdownMenu = page.locator('ngx-header nb-select')
    await dropdownMenu.click()
    page.getByRole('list') //Use it when the list has the ul tag
    page.getByRole('listitem') //Use it when the list has li tag

    // const optionList = page.getByRole('list').locator('nb-option') //Not widely used
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({hasText: "Cosmic"}).click()

    //verify color of element
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropdownMenu.click()
    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != "Corporate"){
            await dropdownMenu.click()
        }
    }

})

test('tooltips', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await tooltipCard.getByRole('button', {name: "Top"}).hover()

    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')


    page.getByRole('tooltip') //Only use if you have a role tooltip created
})

test('dialogs', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //We need to register the action we want to treat with dialog before triggering the dialog
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText("mdo@gmail.com")
})

test('tables', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //Get any row by text in row
    const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    //test filter of the table
    const ages = ["20", "30", "40", "200"]
    for(let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(5000)

        const ageRows = page.locator('tbody tr')

        for(let row of await ageRows.all()){
            const cellValue = await row.locator('td').last().textContent()
            if(age == "200"){
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test('datepicker', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
    const calendarInput = page.getByPlaceholder('Form Picker')
    await calendarInput.click()

    let date = new Date()
    date.setDate(date.getDate() + 7)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})

    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
    while(!calendarMonthAndYear?.includes(expectedMonthAndYear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click() //If we don't use exact: true here, test will be failed because pw will also returns 1, 10, 11, 12, ... in case you getByText('1)
    await expect(calendarInput).toHaveValue(dateToAssert)
})


test('slider', async ({page}) =>{

    //Update attribute
    // const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    // await tempGauge.evaluate(node => {
    //     node.setAttribute('cx', "50.0902383751836")
    //     node.setAttribute('cy', "45.30111643782216")
    // })
    // await tempGauge.click()

    //Mouse event
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger') 
    await tempBox.scrollIntoViewIfNeeded()
    const box = await tempBox.boundingBox() 
    /**
     * tempbox is a handle to some DOM element on the page.
        boundingBox() gets its position and size: e.g
        {
        x: 100,
        y: 200,
        width: 150,
        height: 100
        }
     */
    if (box) {
        const x = box.x + box.width / 2 
        const y = box.y + box.height / 2 //(x, y) now is the center point of element where we do drag-drop
        await page.mouse.move(x, y) //move the virtual mouse to the (x,y)
        await page.mouse.down() //press the mouse - like start dragging
        await page.mouse.move(x+100, y) //move the mouse horizontally 100px to the right, still holding the mouse
        await page.mouse.move(x+100, y+100) //move the mouse 100px to the bottom, still holding the mouse
        await page.mouse.up() //release the mouse
    } else {
        throw new Error("Bounding box is null");
    }
})

test('drag and drop', async ({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
    const iframe = page.frameLocator('[rel-title="Photo Manager"] iframe')

    await iframe.locator('li', {hasText: "High Tatras 2"}).dragTo(iframe.locator('#trash'))

    //more precise control
    await iframe.locator('li', {hasText: "High Tatras 4"}).hover()
    await page.mouse.down()
    await iframe.locator('#trash').hover()
    await page.mouse.up()

    await expect(iframe.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"])
})

