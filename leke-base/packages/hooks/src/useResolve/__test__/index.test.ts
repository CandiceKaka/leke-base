import { renderHook } from '@testing-library/react-hooks';
import useResolve from '../';

test('useResolve static',async ()=>{
    const { result } = renderHook(() => useResolve(1));
    expect(result.current.data).toBe(1);
});

test('useResolve promise',async ()=>{
    const { result,waitForNextUpdate } = renderHook(() => useResolve(()=>Promise.resolve(2)));
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.data).toBe(2);
});

test('useResolve error',async ()=>{
    const { result,waitForNextUpdate } = renderHook(() => useResolve(()=>Promise.reject('error')));
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.data).toBe(undefined);
    expect(result.current.error).toBe('error');
});