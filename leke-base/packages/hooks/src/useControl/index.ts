import {useCallback, useState} from 'react';
function defaultChange() {}
export default function useControl<T=any>(value?:T,onChange?:any,defaultValue?:T):[T,any] {
    const [val,setVal]=useState<T>(defaultValue);
    const change=useCallback((newVal,...arg)=>{
        if(typeof onChange==='function'){
            onChange(newVal,...arg);
        }
        setVal(newVal);
    },[setVal,onChange]);
    if(value!==undefined){
        return [value,onChange||defaultChange];
    }
    return [val,change];
}