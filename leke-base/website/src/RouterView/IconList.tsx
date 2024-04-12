import React from 'react';
import {useResolve} from "@leke/hooks";
function getIcons() {
    return import('@leke/icons');
}
export default function IconList() {
    const {data}=useResolve(getIcons);
    if(!data){
        return null;
    }
    return (
        <ul className='icon-list'>
            {Object.keys(data).map((key)=>{
                const Icon=data[key];
                return (
                    <li key={key}>
                        <Icon />
                        <p>{key}</p>
                    </li>
                );
            })}
        </ul>
    );
}