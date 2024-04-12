import React from "react";
import Select from "../index";
import '@testing-library/jest-dom/extend-expect';
import {render,screen,waitFor,act, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const options1=[
    {label:'1-1',value:'1-1'},
    {label:'1-2',value:'1-2'},
    {label:'1-3',value:'1-3'},
];
const options2=[
    {label:'2-1',value:'2-1'},
    {label:'2-2',value:'2-2',disabled:true},
    {label:'2-3',value:'2-3'},
];
jest.useFakeTimers();
describe('Select ', function() {
    it('Select basics',async function () {
        const {getByText,container} = render(
            <Select allowClear width="smaller" options={options1} placeholder='请选择' style={{marginTop:20,marginRight:20}} />
        );
        const trigger=container.querySelector('.leke-select');
        userEvent.click(trigger);
        await waitFor(()=>getByText('1-1'));
        userEvent.click(getByText('1-1'));
        userEvent.click(container.querySelector('.leke-icon-clear'));
        userEvent.click(document.body);
        act(()=>{
            jest.runAllTimers();
            expect(getByText('1-1').parentElement.parentElement.parentElement).toHaveClass('leke-close',{ exact: false });
        });
    });
    it('Select multiple',async function () {
        const {getByText,container} = render(
            <Select multiple width="smaller" options={options1} placeholder='请选择' style={{marginTop:20,marginRight:20}} />
        );
        const trigger=container.querySelector('.leke-select');
        userEvent.click(trigger);
        await waitFor(()=>getByText('1-1'));
        fireEvent.keyDown(getByText('1-1').parentElement, { key: 'Down', code: 'Down' });
    });
});