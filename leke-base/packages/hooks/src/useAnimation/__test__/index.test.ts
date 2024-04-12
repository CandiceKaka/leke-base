import { renderHook } from '@testing-library/react-hooks';
import useAnimation from '..';

test('enter',async ()=>{
    const el=document.createElement('div');
    const onEnter=jest.fn();
    const props={
        ref:{current:el},
        open:true,
        enter:'enter',
        onEnter
    };
    renderHook(() => useAnimation(props));
    expect(el.className).toBe('enter');
    expect(onEnter).toHaveBeenCalled();
});
test('entering',async ()=>{
    const el=document.createElement('div');
    const onEntering=jest.fn();
    const props={
        ref:{current:el},
        open:true,
        entering:'entering',
        onEntering
    };
    renderHook(() => useAnimation(props));
    expect(el.className).toBe('entering');
    expect(onEntering).toHaveBeenCalled();
});
test('exit',async ()=>{
    const el=document.createElement('div');
    const onExit=jest.fn();
    const props={
        ref:{current:el},
        open:false,
        exit:'exit',
        onExit
    };
    renderHook(() => useAnimation(props));
    expect(el.className).toBe('exit');
    expect(onExit).toHaveBeenCalled();
});
test('exiting',async ()=>{
    const el=document.createElement('div');
    const onExiting=jest.fn();
    const props={
        ref:{current:el},
        open:false,
        exiting:'exiting',
        onExiting
    };
    renderHook(() => useAnimation(props));
    expect(el.className).toBe('exiting');
    expect(onExiting).toHaveBeenCalled();
});
