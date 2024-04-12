import { renderHook,act } from '@testing-library/react-hooks';
import useControl from '..';

test('default',async ()=>{
    const {result}=renderHook(() => useControl());
    const onChange=result.current[1];
    act(()=>{
        onChange('1');
    });
    expect(result.current[0]).toBe('1');
});

test('value',async ()=>{
    const {result}=renderHook(() => useControl(1));
    expect(typeof result.current[1]).toBe('function');
});

test('onChange',async ()=>{
    let newVal=1;
    function onChange(v) {
        expect(v).toBe(newVal);
    }
    const {result}=renderHook(() => useControl(undefined,onChange));
    act(()=>{
        result.current[1](newVal);
    });
    expect(result.current[0]).toBe(newVal);
});

test('value and onChange',async ()=>{
    let value=1;
    function onChange(v) {
        expect(v).toBe(value);
    }
    const {result}=renderHook(() => useControl(value,onChange));
    expect(result.current[0]).toBe(value);
});
