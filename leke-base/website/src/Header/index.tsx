import React, { useMemo, useRef, useState} from 'react';
import {rc,hooks} from "../routes";
import Select from "@leke/rc/components/Select";
import "@leke/rc/components/Select/index.less";
import './index.less';
import { Search } from '@leke/icons';

const navList=[
    {key:'doc',title:'开发文档'},
    {key:'rc',title:'组件'},
    {key:'mobile',title:'移动端组件'},
    {key:'hooks',title:'hooks'},
    {key:'icons',title:'icons'},
    {key:'ssr',title:'SSR脚手架'},
    {key:'store',title:'store'},
    {key:'AV',title:'音视频'},
    {key:'JSComponents',title:'JS原生组件'},
    {key:'formula',title:'公式编辑器'}
];
function filter(opt,text) {
    return opt.key.toLowerCase().indexOf(text)>-1||(opt.title&&opt.title.indexOf(text)>-1);
}
export default function Header({type}){
    const ref=useRef<HTMLDivElement>(null);
    const options=useMemo(()=>{
        const list=type==='rc'?rc:type==='hooks'?hooks:[];
        return list.reduce((result,opt)=>{
            result.push(...opt.routes);
            return result;
        },[]);
    },[type]);
    return(
        <div className='header' ref={ref}>
            <div className='header-inner'>
                <div className='header-left'>
                    <div className='logo'></div>
                    {options.length?
                        <Select
                            showSearch
                            icon={null}
                            bordered={false}
                            className='header-search'
                            options={options}
                            filter={filter}
                            placeholder={<><Search style={{marginRight: '10px'}}/>{type==='rc'?"搜索组件...":'搜索hooks...'}</>}
                            getPopupContainer={()=>ref.current}
                            renderOption={
                                (item)=>(
                                    <a href={`#${type}/${item.key}`}>
                                        <span>{item.key}</span>
                                        <span style={{marginLeft:6}}>{item.title}</span>
                                    </a>
                                )
                            }
                            fieldNames={{
                                label:'title',
                                value:'key'
                            }}
                        />
                        :null}
                </div>
                <div className='nav'>
                    {navList.map(item=><a key={item.key} href={`#${item.key}`} className={type===item.key?'current':''}>{item.title}</a>)}
                </div>
            </div>
        </div>
    );
}
