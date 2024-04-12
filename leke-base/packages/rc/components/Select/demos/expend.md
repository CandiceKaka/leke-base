---    
title: 扩展菜单
---

```jsx
import React, {useState} from 'react';
import {Select,Input,Button} from '@leke/rc';
import {Plus, Remove} from '@leke/icons';

const defOptions=[
    {label:'1-1',value:'1-1'},
    {label:'1-2',value:'1-2'},
    {label:'1-3',value:'1-3'},
];
let index = 0;
export default function(){
    const [options, setOptions] = useState(defOptions);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [empty,setEmpty] = useState(null);

    const removeItem = (e,name) => {
        e.preventDefault();
        e.stopPropagation();
        setOptions(v => v.filter(i => i.value !== name));
        return false;
    };

    const addItem = () => {
        setOptions(v => {
            const name = value || `新增条目${index++}`;
            return v.concat({label:name,value:name, isNew: true, content: <p className="leke-edit-select-item">{name}<Remove onClick={(e) => removeItem(e,name)} className="leke-edit-select-item-remove" /></p>});
        });
        setValue('');
    };

    return(
        <>
            <Select width="small" options={options} dropdownRender={render => (
                <div>
                    {render}
                    <hr style={{ margin: '4px 0', border: 'none', backgroundColor: '#F0F0F0', height: '1px' }} />
                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 12, width: '216px' }}>
                        <Input style={{ flex: 'auto' }} value={value} onChange={e => setValue(e.target.value)} />
                        <Button style={{ width: 150 }} type="link" onClick={addItem}><p style={{ display: 'flex', alignItems: 'center'}}><Plus style={{ fontSize: 6, marginRight: 4, marginTop: 2 }} /> 新增条目</p></Button>
                    </div>
                </div>
            )} placeholder='请选择' style={{marginRight:2}} />
        </>
    );
}
```

```css

.leke-icon-loading {
      margin-top: -6px;
      font-size: 12px;
      color: @border-color;
      animation: rotating 1s linear infinite;
}

.leke-edit-select-item {
    color: #595959;
    width: 100%;
    display: flex;
    min-height: 32px;
    align-items: center;
    position: relative;
}

.leke-edit-select-item-remove {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-6px);
    opacity: 0;
    pointer-events: none;
    color: #BFBFBF;
    font-size: 12px;
    transition: .2s;
}

.leke-edit-select-item-remove:hover{
    color: #8C8C8C;
}

.leke-edit-select-item:hover .leke-edit-select-item-remove {
    opacity: 1;
    pointer-events: initial
}
```