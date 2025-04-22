import { Page, Locator } from "@playwright/test";
import { FormLayoutsPage } from "./FormLayoutsPage";
import { DatePickerPage } from "./DatePickerPage";
import { DialogPage } from "./DialogPage";
import { WindowPage } from "./WindowPage";
import { PopoverPage } from "./PopoverPage";
import { ToastrPage } from "./ToastrPage";
import { TooltipPage } from "./TooltipPage";
import { CalendarPage } from "./CalendarPage";
import { EchartsPage } from "./EchartsPage";
import { SmartTablePage } from "./SmartTablePage";
import { TreeGridPage } from "./TreeGridPage";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { ResetPasswordPage } from "./ResetPasswordPage";
import { RequestPasswordPage } from "./RequestPasswordPage";
import { BasePage } from "./BasePage";

enum Menu {
    Forms = 'Forms',
    ModalOverlays = 'Modal & Overlays',
    ExtraComponents = 'Extra Components',
    TablesData = 'Tables & Data',
    Auth = 'Auth'
}

enum SubMenu {
    FormLayouts = 'Form Layouts',
    Datepicker = 'Datepicker',
    Dialog = 'Dialog',
    Window = 'Window',
    Popover = 'Popover',
    Toastr = 'Toastr',
    Tooltip = 'Tooltip',
    Calendar = 'Calendar',
    Echarts = 'Echarts',
    SmartTable = 'Smart Table',
    TreeGrid = 'Tree Grid',
    Login = 'Login',
    Register = 'Register',
    RequestPassword = 'Request Password',
    ResetPassword = 'Reset Password'
}

export class Navigation extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    private menuLocator(menu: Menu): Locator {
        return this.page.getByTitle(menu, { exact: true });
    }

    private subMenuLocator(subMenu: SubMenu): Locator {
        return this.page.getByTitle(subMenu, { exact: true });
    }

    // Navigation logic
    private async navigateToMenu(menu: Menu, subMenu: SubMenu) {
        const menuItem = this.menuLocator(menu);
        await menuItem.scrollIntoViewIfNeeded();
        await this.waitForElementVisible(menuItem)
        const foden = await menuItem.getAttribute('aria-expanded')
        const isMenuItemCollapsed = await menuItem.getAttribute('aria-expanded') === 'false';
        if (isMenuItemCollapsed) {
            await menuItem.click();
        }
        const subMenuItem = this.subMenuLocator(subMenu);
        await subMenuItem.scrollIntoViewIfNeeded();
        await this.waitForElementVisible(subMenuItem)
        await this.clickElement(subMenuItem)
    }

    // Forms section
    async formLayoutsPage() {
        await this.navigateToMenu(Menu.Forms, SubMenu.FormLayouts);
        return new FormLayoutsPage(this.page)
    }
    async datePickerPage() {
        await this.navigateToMenu(Menu.Forms, SubMenu.Datepicker);
        return new DatePickerPage(this.page)
    }

    // Modal & Overlays section
    async dialogPage() {
        await this.navigateToMenu(Menu.ModalOverlays, SubMenu.Dialog);
        return new DialogPage(this.page)
    }
    async windowPage() {
        await this.navigateToMenu(Menu.ModalOverlays, SubMenu.Window);
        return new WindowPage(this.page)
    }
    async popoverPage() {
        await this.navigateToMenu(Menu.ModalOverlays, SubMenu.Popover);
        return new PopoverPage(this.page)
    }
    async toastrPage() {
        await this.navigateToMenu(Menu.ModalOverlays, SubMenu.Toastr);
        return new ToastrPage(this.page)
    }
    async tooltipPage() {
        await this.navigateToMenu(Menu.ModalOverlays, SubMenu.Tooltip);
        return new TooltipPage(this.page)
    }

    // Extra Components
    async calendarPage() {
        await this.navigateToMenu(Menu.ExtraComponents, SubMenu.Calendar);
        return new CalendarPage(this.page)
    }
    async echartsPage() {
        await this.navigateToMenu(Menu.ExtraComponents, SubMenu.Echarts);
        return new EchartsPage(this.page)
    }

    // Tables & Data section
    async smartTablePage() {
        await this.navigateToMenu(Menu.TablesData, SubMenu.SmartTable);
        return new SmartTablePage(this.page)
    }
    async treeGridPage() {
        await this.navigateToMenu(Menu.TablesData, SubMenu.TreeGrid);
        return new TreeGridPage(this.page)
    }

    // Auth section (Note: If you're already in any page under Auth section, cannot use the method navigateToMenu() again because the side bar is hidden in these pages)
    async loginPage() {
        await this.navigateToMenu(Menu.Auth, SubMenu.Login);
        return new LoginPage(this.page)
    }
    async registerPage() {
        await this.navigateToMenu(Menu.Auth, SubMenu.Register);
        return new RegisterPage(this.page)
    }
    async requestPasswordPage() {
        await this.navigateToMenu(Menu.Auth, SubMenu.RequestPassword);
        return new RequestPasswordPage(this.page)
    }
    async resetPasswordPage() {
        await this.navigateToMenu(Menu.Auth, SubMenu.ResetPassword);
        return new ResetPasswordPage(this.page)
    }
}
