import React from "react";
import Input from '../index';
import {fireEvent,screen,act,render} from '@testing-library/react';
const { TextArea } = Input;
const sleep = (timeout = 0) => new Promise(resolve => setTimeout(resolve, timeout));
describe('TextArea',()=>{
    it('support input',async()=>{
        const {rerender}=render(<TextArea />);
        const textarea = screen.getByRole('textbox');
        fireEvent.change(textarea, { target: { value: '1234' } });
        expect((textarea as HTMLTextAreaElement).value).toBe('1234');
        rerender(<TextArea value="1" />);
        expect((textarea as HTMLTextAreaElement).value).toBe('1');
        rerender(<TextArea value="1" />);
        expect((textarea as HTMLTextAreaElement).value).toBe('1');
    });
    it('support maxlength',async()=>{
        render(<TextArea maxLength={9}/>);
        const textarea = screen.getByRole('textbox');
        fireEvent.change(textarea, { target: { value: '123456789' } });
        expect((textarea as HTMLTextAreaElement).value).toBe('123456789');
        fireEvent.change(textarea, { target: { value: '12345678901' } });
        expect((textarea as HTMLTextAreaElement).value).toBe('123456789');
    });
    it('auto calculate height',async()=>{
        render(<TextArea autoSize={{minRows:2,maxRows:5}}/>);
        fireEvent.change(screen.getByRole('textbox'),{ target: { value: '123\n123123\n123123\n123123\n123' } });
        expect((screen.getByRole('textbox') as HTMLTextAreaElement).value).toBe('123\n123123\n123123\n123123\n123');
        // await sleep(200);
        // expect(screen.getByRole('textbox').scrollHeight+'px').toBe(screen.getByRole('textbox').style.height+1);
        // fireEvent.change(screen.getByRole('textbox'),{ target: { value: '123\n123' } });
        // fireEvent.change(textareaNode,{ target: { value: '123\n321' } });
        // expect(textareaNode.scrollHeight+'px').toBe(textareaNode.style.height);
    });

});