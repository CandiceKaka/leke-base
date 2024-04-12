import React from "react";
import Switch from "../";
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps={
    defaultChecked: true
};
describe('Switch', function() {
    it('test default',async function () {
        const {container} = render(
            <Switch
                {...defaultProps}
            />
        );
        const switchBtn = container.querySelector('.leke-switch');
        expect(switchBtn).toHaveClass('leke-switch leke-switch-checked');
        userEvent.click(switchBtn);
        expect(switchBtn).toHaveClass('leke-switch');
    });
    it('test disabled',async function () {
        const {container} = render(
            <Switch
                disabled
                {...defaultProps}
            />
        );
        const switchBtn = container.querySelector('.leke-switch');
        expect(switchBtn).toHaveClass('leke-switch leke-switch-checked leke-switch-disabled');
        userEvent.click(switchBtn);
        expect(switchBtn).toHaveClass('leke-switch leke-switch-checked leke-switch-disabled');
    });
    it('test loading',async function () {
        const {container} = render(
            <Switch
                loading
                {...defaultProps}
            />
        );
        const switchBtn = container.querySelector('.leke-switch');
        expect(switchBtn).toHaveClass('leke-switch leke-switch-checked leke-switch-disabled');
        expect(switchBtn).toContainElement(switchBtn.querySelector('.leke-switch-loading'));
    });
    it('test focus',async function () {
        const {container} = render(
            <Switch
                autoFocus
                onKeyDown={() => { }}
                {...defaultProps}
            />
        );
        const switchBtn=container.querySelector('.leke-switch');
        fireEvent.keyDown(switchBtn, { key: 'Enter', code: 'Enter' });
        expect(switchBtn).toHaveClass('leke-switch');
        fireEvent.keyDown(switchBtn, { key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37 });
        expect(switchBtn).toHaveClass('leke-switch');
        fireEvent.keyDown(switchBtn, { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39 });
        expect(switchBtn).toHaveClass('leke-switch leke-switch-checked');
    });
    it('test small',async function () {
        const {container} = render(
            <Switch
                size="small"
                {...defaultProps}
            />
        );
        const switchBtn=container.querySelector('.leke-switch');
        expect(switchBtn).toHaveClass('leke-switch leke-switch-small leke-switch-checked ');
    });
    it('test inner',async function () {
        const {container} = render(
            <Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                {...defaultProps}
            />
        );
        const switchBtnInner = container.querySelector('.leke-switch-inner');
        expect(switchBtnInner).toContainHTML('开启');
        const switchBtn = container.querySelector('.leke-switch');
        userEvent.click(switchBtn);
        expect(switchBtnInner).toContainHTML('关闭');
    });
});