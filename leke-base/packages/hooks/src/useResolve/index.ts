import {useEffect, useRef, useState} from 'react';

interface stateType<T> {
    data?:T,
    error?:any,
    loading:boolean
}
export default function useResolve<T>(arg, dep:any[]=[]):stateType<T> {
    const argRef=useRef(arg);
    argRef.current=arg;
    const loading=typeof arg==='function';
    const [state,setState]=useState<stateType<T>>({
        loading,
        data:loading?undefined:arg
    });
    useEffect(()=>{
        if(typeof argRef.current!=='function'){
            return;
        }
        let unmount=false;
        setState((oldState)=>{
            return {
                ...oldState,
                loading:true
            };
        });
        argRef.current.apply(null,dep).then(res=>{
            !unmount&&setState({data:res,loading:false});
        }).catch(error=>{
            !unmount&&setState({error,loading:false});
        });
        return ()=>{
            unmount=true;
        };
    },[...dep,setState]); // eslint-disable-line  react-hooks/exhaustive-deps
    return state;
}