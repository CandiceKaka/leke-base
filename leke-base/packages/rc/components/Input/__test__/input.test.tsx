import React from "react";
import Input from '../index';
import {Notice} from "@leke/icons";
import {render,fireEvent,screen,waitFor,act} from '@testing-library/react';

describe('Input',()=>{
    it('support input',async()=>{
        render(<Input />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '23' } });
        expect((input as HTMLInputElement).value).toBe('23');
    });

    it('support size',async()=>{
        const {rerender} = render(<Input size='large' />);
        expect(screen.getByRole('textbox').className.includes('leke-input-lg')).toBeTruthy();
        rerender(<Input size='small' />);
        expect(screen.getByRole('textbox').className.includes('leke-input-sm')).toBeTruthy();
    });

    it('support disabled',async()=>{
        render(<Input disabled />);
        expect(screen.getByRole('textbox').className.includes('leke-input-disabled')).toBeTruthy();
    });

    it('support keydown',async()=>{
        const onPressEnter = jest.fn();
        render(<Input className="outer" onPressEnter={onPressEnter}/>);
        const input = document.querySelector('.leke-input');
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(onPressEnter).toBeCalled();
    });

    it('support prefix and suffix icon',async()=>{
        const {container,rerender}=render(<Input className="outer" prefix={<Notice />} />);
        expect(container).toMatchSnapshot();
        rerender(<Input className="outer" suffix={<Notice />} />);
        expect(container).toMatchSnapshot();
    });

});