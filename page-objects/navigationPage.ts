import { Page } from "@playwright/test";

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

export class NavigationPage {
    constructor(private readonly page: Page) {}

    private async navigateToMenu(menu: Menu, subMenu: SubMenu) {
        const menuItem = this.page.getByTitle(menu, { exact: true });
        await menuItem.waitFor({ state: 'visible' });
        await menuItem.scrollIntoViewIfNeeded();
        const isMenuItemCollapsed = await menuItem.getAttribute('aria-expanded') === 'false';
        if (isMenuItemCollapsed) {
            await menuItem.click();
        }
        const subMenuItem = this.page.getByText(subMenu, { exact: true });
        await subMenuItem.waitFor({ state: 'visible' });
        await subMenuItem.scrollIntoViewIfNeeded();
        await subMenuItem.click();
    }

    // Forms section
    async formLayoutsPage() {
        await this.navigateToMenu(Menu.Forms, SubMenu.FormLayouts);
    }
    async datePickerPage() {
        await this.navigateToMenu(Menu.Forms, SubMenu.Datepicker);
    }

    // Modal & Overlays section
    async dialogPage() {
        await this.navigateToMenu(Menu.ModalOverlays, SubMenu.Dialog);
    }
    async windowPage() {
        await this.navigateToMenu(Menu.ModalOverlays, SubMenu.Window);
    }
    async popoverPage() {
        await this.navigateToMenu(Menu.ModalOverlays, SubMenu.Popover);
    }
    async toastrPage() {
        await this.navigateToMenu(Menu.ModalOverlays, SubMenu.Toastr);
    }
    async tooltipPage() {
        await this.navigateToMenu(Menu.ModalOverlays, SubMenu.Tooltip);
    }

    // Extra Components
    async calendarPage() {
        await this.navigateToMenu(Menu.ExtraComponents, SubMenu.Calendar);
    }
    async echartsPage() {
        await this.navigateToMenu(Menu.ExtraComponents, SubMenu.Echarts);
    }

    // Tables & Data section
    async smartTablePage() {
        await this.navigateToMenu(Menu.TablesData, SubMenu.SmartTable);
    }
    async treeGridPage() {
        await this.navigateToMenu(Menu.TablesData, SubMenu.TreeGrid);
    }

    // Auth section (Note: If you're already in any page under Auth section, cannot use the method navigateToMenu() again because the side bar is hidden in these pages)
    async loginPage() {
        await this.navigateToMenu(Menu.Auth, SubMenu.Login);
    }
    async registerPage() {
        await this.navigateToMenu(Menu.Auth, SubMenu.Register);
    }
    async requestPasswordPage() {
        await this.navigateToMenu(Menu.Auth, SubMenu.RequestPassword);
    }
    async resetPasswordPage() {
        await this.navigateToMenu(Menu.Auth, SubMenu.ResetPassword);
    }
}