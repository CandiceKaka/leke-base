---
title: 多级菜单
---

```jsx
import React,{useState} from "react";
import { Dropdown, Menu } from "@leke/rc";
import { Down } from "@leke/icons";

const {MenuItem,SubMenu} = Menu;

const menu = (
    <Menu>
        <Menu.ItemGroup title="Group title">
            <Menu.Item key="1">1st menu item</Menu.Item>
            <Menu.Item key="2">2nd menu item</Menu.Item>
        </Menu.ItemGroup>
        <SubMenu key="77" title="sub menu">
            <Menu.Item key="3">3rd menu item</Menu.Item>
            <SubMenu key="77" title="next">
                <Menu.Item key="3">3rd menu item</Menu.Item>
                <Menu.Item key="4">4th menu item</Menu.Item>
            </SubMenu>
        </SubMenu>
        <SubMenu key="44" title="disabled sub menu" disabled>
            <Menu.Item key="5">5d menu item</Menu.Item>
            <Menu.Item key="6">6th menu item</Menu.Item>
        </SubMenu>
    </Menu>
);

export default function () {
    // const [name,setName] = useState('Hover下拉');
    // const [name1,setName1] = useState('点击下拉');
    
    return (
        <>
            <Dropdown
                popup={
                    menu
                }
                style={{marginRight:30}}
            >
                <a onClick={e => e.preventDefault()} className="leke-label">{'多级菜单'}<Down className="leke-down"/></a></Dropdown>
        </>
    );
}
```
```css
.leke-label{
    color: #1FB5AB;
    display: flex;
    align-items: center;
    padding: 5px 0;
    font-size: 14px;
}

.leke-down {
    margin-left: 8px;
    font-size: 12px;
}

```