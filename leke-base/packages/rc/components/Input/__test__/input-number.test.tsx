import React from "react";
import Input from '../index';
import {Notice} from "@leke/icons";
import {render,fireEvent,screen,waitFor,act} from '@testing-library/react';

describe('InputNumber',()=>{
    it('support input',async()=>{
        render(<Input.InputNumber />);
        const inputNode = screen.getByRole('textbox');
        fireEvent.change(inputNode, { target: { value: '23' } });
        expect((inputNode as HTMLInputElement).value).toBe('23');
    });

    it('support size',async()=>{
        const {rerender} = render(<Input.InputNumber size='large' />);
        expect(document.querySelector('.leke-input-number').className.includes('leke-input-number-lg')).toBeTruthy();
        rerender(<Input.InputNumber size='small' />);
        expect(document.querySelector('.leke-input-number').className.includes('leke-input-number-sm')).toBeTruthy();
    });

    it('support disabled',async()=>{
        render(<Input.InputNumber disabled />);
        expect(document.querySelector('.leke-input-number').className.includes('leke-input-number-disabled')).toBeTruthy();
    });

    it('support formatter',async()=>{
        render(<Input.InputNumber formatter={val=>`${val}%`} />);
        const inputNode = screen.getByRole('textbox');
        fireEvent.change(inputNode, { target: { value: '23' } });
        expect((inputNode as HTMLInputElement).value).toBe('23%');
    });

    it('support onControl FC',async()=>{
        render(<Input.InputNumber value={22} />);
        const inputNode = screen.getByRole('textbox');
        fireEvent.change(inputNode, { target: { value: 33 } });
        expect((inputNode as HTMLInputElement).value).toBe('22');
    });

    it('support prefix and suffix icon',async()=>{
        const {container,rerender}=render(<Input.InputNumber className="outer" prefix={<Notice />} />);
        expect(container).toMatchSnapshot();
        rerender(<Input.InputNumber className="outer" suffix={<Notice />} />);
        expect(container).toMatchSnapshot();
    });

    it('support focus and blur',async()=>{
        const onFocus=jest.fn();
        const onBlur=jest.fn();
        render(<Input.InputNumber onFocus={onFocus} onBlur={onBlur} />);
        const inputNode = screen.getByRole('textbox');
        fireEvent.focus(inputNode);
        expect(onFocus).toBeCalled();
        fireEvent.blur(inputNode);
        expect(onBlur).toBeCalled();
    });

    it('support up-down trigger',async()=>{
        render(<Input.InputNumber max={100} min={10} />);
        const inputNode = screen.getByRole('textbox');
        fireEvent.change(inputNode, { target: { value: 99 } });
        const upTrigger = document.querySelector('.leke-input-number-handle-up');
        const downTrigger = document.querySelector('.leke-input-number-handle-down');
        fireEvent.click(upTrigger);
        expect((inputNode as HTMLInputElement).value).toBe('100');
        fireEvent.click(upTrigger);
        expect((inputNode as HTMLInputElement).value).toBe('100');
        fireEvent.change(inputNode, { target: { value: 11 } });
        fireEvent.click(downTrigger);
        expect((inputNode as HTMLInputElement).value).toBe('10');
        fireEvent.click(downTrigger);
        expect((inputNode as HTMLInputElement).value).toBe('10');
    });

});