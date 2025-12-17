// import { NavigationItem } from "src/app/@theme/types/navigation";
import { MenuItem } from "primeng/api";
import { Menu, RootMenu, SubMenu } from "../models/menu.model";


export class MenuMapper {
    static mapRootMenuToSakaiItems(rootMenus: RootMenu[]): MenuItem[] {
        const sakaiItems: MenuItem[] = [];

        rootMenus.forEach(rootMenu => {
            rootMenu.menus.forEach(menu => {
                // Filtramos submenus con URL válida
                const subItems = menu.subMenus
                    .filter(sub => sub.urlSubMenu && sub.urlSubMenu !== 'none')
                    .map(sub => MenuMapper.mapSubMenuToSakaiItem(sub, menu));

                let menuItem: MenuItem;

                if (subItems.length > 0) {
                    // Menú con submenus
                    menuItem = {
                        label: menu.tituloMenu,
                        icon: menu.iconoMenu,
                        items: subItems
                    };
                } else {
                    // Menú simple, sin desplegable
                    menuItem = {
                        label: menu.tituloMenu,
                        icon: menu.iconoMenu,
                        routerLink: [menu.urlMenu]
                    };
                }

                // Cabecera vacía para Sakai
                const headerItem: MenuItem = {
                    label: '',
                    icon: menu.iconoMenu,
                    items: [menuItem]
                };

                sakaiItems.push(headerItem);
            });
        });

        return sakaiItems;
    }

    static mapSubMenuToSakaiItem(sub: SubMenu, parentMenu: Menu): MenuItem {
        return {
            label: sub.tituloSubMenu,
            icon: sub.iconoSubMenu && sub.iconoSubMenu !== 'none' ? sub.iconoSubMenu : parentMenu.iconoMenu,
            routerLink: [sub.urlSubMenu]
        };
    }

}
