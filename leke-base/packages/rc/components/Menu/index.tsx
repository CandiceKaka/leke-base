/**
 * 临时menu
 * 注意：修改displayName涉及Dropdown内部判断
*/
import React from "react";
import * as RCMenu from "rc-menu";
import cn from 'classnames';

type menuType = {
    displayName?: string
    SubMenu?: ((props: RCMenu.SubMenuProps) => React.ReactElement) & { displayName?: string }
    MenuItem?: ((props: RCMenu.MenuItemGroupProps) => React.ReactElement) & { displayName?: string }
    MenuItemGroup?: ((props: RCMenu.MenuItemGroupProps) => React.ReactElement) & { displayName?: string }
} & ((props:RCMenu.MenuProps) => any)

const Menu: menuType= (props) => {
    const {className, ...other} = props;
    const menuProps = {
        prefixCls: 'leke-menu',
        className: cn('leke-menu',className),
        
        ...other,
    };
    return React.createElement(RCMenu.default, menuProps);
};
console.log('RCMenu:',RCMenu);

Object.assign(Menu, RCMenu);

Menu.displayName = 'Menu';
Menu.SubMenu.displayName = 'SubMenu';
Menu.MenuItem.displayName = 'MenuItem';
Menu.MenuItemGroup.displayName = 'MenuItemGroup';

export default Menu;