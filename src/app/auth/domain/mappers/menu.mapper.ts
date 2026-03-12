// import { NavigationItem } from "src/app/@theme/types/navigation";
import { MenuItem } from "primeng/api";
import { Menu, RootMenu, SubMenu } from "../models/menu.model";


export class MenuMapper {
    static mapRootMenuToSakaiItems(rootMenus: RootMenu[]): MenuItem[] {
        const sakaiItems: MenuItem[] = [];

         sakaiItems.push({
        label: '',
        items: [
            {
                label: 'Dashboard',
                // icon: 'pi pi-home',
                routerLink: ['/']
            }
        ]
    });
        rootMenus.forEach(rootMenu => {
            rootMenu.menus
                .filter(menu => menu.tituloMenu !== 'Accesibilidad') 
                .forEach(menu => {

                    const subItems = menu.subMenus
                        .filter(sub => sub.urlSubMenu && sub.urlSubMenu !== 'none')
                        .map(sub => MenuMapper.mapSubMenuToSakaiItem(sub, menu));

                    let menuItem: MenuItem;

                    if (subItems.length > 0) {
                        menuItem = {
                            label: menu.tituloMenu,
                            icon: menu.iconoMenu,
                            items: subItems
                        };
                    } else {
                        menuItem = {
                            label: menu.tituloMenu,
                            icon: menu.iconoMenu,
                            routerLink: [menu.urlMenu]
                        };
                    }

                    sakaiItems.push({
                        label: '',
                        icon: menu.iconoMenu,
                        items: [menuItem]
                    });
                });
        });

        sakaiItems.push({
            label: '',
            items: [
                {
                    label: 'Cerrar sesión',
                    routerLink: ['login/logout']
                }
            ]
        });

        return sakaiItems;
    }

    static mapSubMenuToSakaiItem(sub: SubMenu, parentMenu: Menu): MenuItem {
        return {
            label: sub.tituloSubMenu,
            icon: sub.iconoSubMenu && sub.iconoSubMenu !== 'none'
                ? sub.iconoSubMenu
                : parentMenu.iconoMenu,
            routerLink: [sub.urlSubMenu]
        };
    }
}
