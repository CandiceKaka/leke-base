import StoreContext from "./context";
import {useCallback,useEffect, useReducer,useContext} from "react";
import {storeType,setDataType} from "./types";

export function shallowEqual(objA, objB):boolean {
    if (Object.is(objA, objB)) return true;

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;

    for (let i = 0; i < keysA.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
}


export const useStore=function<T=any> ():storeType<T> {
    return useContext(StoreContext);
};
const subscription=[];

export const useData=<T=any>(selector:(data)=>T,compare=shallowEqual):T=>{
    const {getData}=useStore();
    const [state,setState]=useReducer((oldState)=>{
        const newState=selector(getData());
        if(!compare(oldState,newState)){
            return newState;
        }
        return oldState;
    },selector(getData()));

    useEffect(()=>{
        subscription.push(setState);
        return ()=>{
            const index=subscription.indexOf(setState);
            subscription.splice(index,1);
        };
    },[setState]);

    return state;
};

export const useDispatch=<T=any>():setDataType<T>=>{
    const {setData}=useStore<T>();
    return useCallback((o)=>{
        setData(o);
        subscription.forEach((fn)=>fn());
    },[setData]);
};