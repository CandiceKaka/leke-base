---
title: 基本用法---文字触发（基于menu依赖组件未开发完成，以下用到的依赖均使用antd的rc-menu临时代替，使用者需注意）
---

```jsx
import React,{useState} from "react";
import { Dropdown, Menu } from "@leke/rc";
import { Down } from "@leke/icons";

const {MenuItem} = Menu;

export default function () {
    const [name,setName] = useState('Hover下拉');
    const [name1,setName1] = useState('点击下拉');
    const content = (
        <Menu>
            <MenuItem>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.antgroup.com"
                >
              1st menu item
                </a>
            </MenuItem>
            <MenuItem disabled>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.aliyun.com"
                >
              2nd menu item (disabled)
                </a>
            </MenuItem>
        </Menu>
    );
    const content2 = (
        <Menu>
            <MenuItem>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.antgroup.com"
                >
              1st menu item
                </a>
            </MenuItem>
            <Menu.Divider />
            <MenuItem disabled>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.aliyun.com"
                >
              2nd menu item (disabled)
                </a>
            </MenuItem>
        </Menu>
    );
    return (
        <>
            <Dropdown
                popup={
                    content
                }
                style={{marginRight:30}}
            >
                <a onClick={e => e.preventDefault()} className="leke-label">{name}<Down className="leke-down"/></a></Dropdown>
    
            <Dropdown 
                popup={
                    content
                }
                eventType={['click']}
                style={{marginRight:30}}
            ><a onClick={e => {e.preventDefault();}} className="leke-label">{name1}<Down className="leke-down"/></a></Dropdown>

            <Dropdown 
                popup={
                    content
                }
                eventType={['click']}
                style={{marginRight:30}}
                disabled
            ><a onClick={e => {e.preventDefault();}} className="leke-label" >{'禁止下拉'}<Down className="leke-down"/></a></Dropdown>

            <Dropdown 
                popup={
                    content2
                }
            ><a onClick={e => {e.preventDefault();}} className="leke-label" >{'带横线'}<Down className="leke-down"/></a></Dropdown>
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