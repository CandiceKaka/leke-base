import React from "react";
import {useStore,useDispatch,useData,StoreProvider,shallowEqual} from '../src';
import {renderHook,act} from '@testing-library/react-hooks';

test('shallowEqual',()=>{
    expect(shallowEqual({a:2},{a:2})).toBe(true);
    expect(shallowEqual({a:2},{b:2})).toBe(false);
    expect(shallowEqual({a:2},{a:2,b:2})).toBe(false);
    expect(shallowEqual(undefined,null)).toBe(false);
    expect(shallowEqual(NaN,NaN)).toBe(true);
});
test('store',async ()=>{
    const {result}=renderHook(
        ()=>{
            return {
                data:useData((data)=>data.a),
                dispatch:useDispatch()
            };
        },
        {wrapper:({children})=><StoreProvider data={{a:1}} >{children}</StoreProvider>}
    );
    expect(result.current.data).toBe(1);
    act(()=>{
        result.current.dispatch({a:1});
    });
    expect(result.current.data).toBe(1);
    act(()=>{
        result.current.dispatch({a:2});
    });
    expect(result.current.data).toBe(2);
    act(()=>{
        result.current.dispatch(()=>({a:3}));
    });
    expect(result.current.data).toBe(3);
});
