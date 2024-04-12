import React, {useMemo} from "react";
import StoreContext from './context';
import {storeType} from "./types";

export default function StoreProvider<T=any> (props:{children:React.ReactNode,data:T}) {
    const store:storeType<T>=useMemo(()=>{
        let data=props.data;
        return {
            getData(){
                return data;
            },
            setData(arg) {
                const state=typeof arg==='function'?arg(data):arg;
                data={...data,...state};
            }
        };
    },[props.data]);
    return(
        <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
    );
}