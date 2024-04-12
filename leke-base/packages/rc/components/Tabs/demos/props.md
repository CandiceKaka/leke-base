## Tabs
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| defaultActiveKey   | 初始化选中面板的 key,如果没有设置 activeKey          | string \| number | _ |
| centered           | 标签居中展示                                        | boolean | false |
| animated           | 是否使用动画切换 Tabs, 仅生效于 tabPosition=top    | boolean | _ |
| size               | 大小，提供 large default 和 small 三种大小           | large \| default \| small | default |
| type               | 页签的基本样式，可选 line、card editable-card 类型   | line \| card \| editable-card \| separate | line |
| tabPosition        | 页签位置，可选值有 top right bottom left            | top \| right \| bottom \| left | _ |
| activeKey          | 当前激活 tab 面板的 key                             | string \| number | _ |
| addIcon            | 自定义添加按钮                                      | ReactNode | \<Plus \/\> |
| moreIcon           | 自定义折叠 icon                                     | ReactNode | \<More \/\> |
| hideAdd            | 是否隐藏加号图标，在 type=editable-card 时有效     | boolean | false |
| tabBarExtraContent | tab bar 上额外的元素                                | { left?: ReactNode; right?: ReactNode } | _ |
| tabBarGutter       | tabs 之间的间隙                                     | number | _ |
| tabBarStyle        | tab bar 的样式对象                                  | CSSProperties | _ |
| onTabClick         | tab 被点击的回调                                    | (key: string \| number, event: React.MouseEvent\<HTMLDivElement \| HTMLLIElement, MouseEvent\>) => void | _ |
| onTabScroll        | tab 滚动时触发                                      | ({ direction, event }: { direction: left \| right \| top \| bottom, event: MouseEvent }) => void | _ |
| onChange           | 切换面板的回调                                      | (activeKey: string \| number) => void | _ |
| onEdit             | 新增和删除页签的回调，在 type=editable-card 时有效  | (activeKey: string \| number, action: add \| remove) => void | _ |
| renderTabBar       | 替换 TabBar，用于二次封装标签头                      | (props: any, DefaultTabBar: (props: any) => ReactNode) => ReactNode | _ |

## Tabs.TabPane
| 属性 | 说明 | 类型 | 默认值 | 
| --- | --- | --- | --- | 
| key         | 对应 activeKey                             |  string \| number | _ |            
| tab         | 选项卡头显示文字                          	 |  string           | _ |  
| tabIcon     | 显示在tab左侧的图标                          |  ReactNode        | _ |     
| closeIcon   | 自定义关闭图标，在 type="editable-card"时有效	 |  ReactNode        | _ |     
| forceRender | 被隐藏时是否渲染 DOM 结构                      |  boolean          | false |   
| disabled    | 是否禁用                                     |  boolean          | false |   
| closable    | 是否显示关闭按钮                              |  boolean          | false |   