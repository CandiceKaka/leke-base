import React from "react";
import Input from '../index';
import {Notice} from "@leke/icons";
import {render,fireEvent,screen,waitFor,act} from '@testing-library/react';

describe('Search',()=>{
    it('support default input',async()=>{
        render(<Input.Search />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '23' } });
        expect((input as HTMLInputElement).value).toBe('23');
    });

    it('support search',async()=>{
        const onSearch = jest.fn();
        render(<Input.Search onSearch={onSearch}/>);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '23' } });
        expect((input as HTMLInputElement).value).toBe('23');

        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(onSearch).toBeCalledTimes(1);


        fireEvent.click(document.querySelector('.search-button'));
        expect(onSearch).toBeCalledTimes(2);
    });
    

    it('support enterButton',async()=>{
        const onSearch = jest.fn();
        const {container,rerender}=render(<Input.Search enterButton={"搜索"} onSearch={onSearch}/>);
        expect(container).toMatchSnapshot();
        const input = screen.getByRole('textbox');
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(onSearch).toBeCalledTimes(1);
        fireEvent.click(document.querySelector('.search-button'));
        expect(onSearch).toBeCalledTimes(2);
        
        rerender(<Input.Search enterButton={<Notice />} onSearch={onSearch}/>);
        expect(container).toMatchSnapshot();

        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(onSearch).toBeCalledTimes(3);
        fireEvent.click(document.querySelector('.search-button'));
        expect(onSearch).toBeCalledTimes(4);
    });

});