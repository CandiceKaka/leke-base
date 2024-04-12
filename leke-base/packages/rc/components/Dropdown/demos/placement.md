---
title: 弹出位置
description: 支持 6 个弹出位置
---

```jsx
import React from "react";
import { Dropdown, Menu, Button } from "@leke/rc";

const { MenuItem } = Menu;

export default function () {
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
    return (
        <div className="dropdown-demo">
            {[
                "bottomLeft",
                "bottomCenter",
                "bottomRight",
                "topLeft",
                "topCenter",
                "topRight",
            ].map((item) => (
                <Dropdown key={item} popup={content} style={{ marginRight: 20, marginTop: 20 }} placement={item}>
                    <Button>{item}</Button>
                </Dropdown>
            ))}
        </div>
    );
}
```
