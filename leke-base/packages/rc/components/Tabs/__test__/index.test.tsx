import React from "react";
import Tabs from "../";
import '@testing-library/jest-dom/extend-expect';
import {render, waitFor,screen,act, fireEvent,cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

window.resizeTo = function resizeTo(width, height) {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: height });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: width});
    Object.assign(this, {
        innerWidth: width,
        innerHeight: height,
        outerWidth: width,
        outerHeight: height,
    }).dispatchEvent(new this.Event('resize'));
};

// const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');
// const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');

// beforeAll(() => {
//     Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 1080 });
//     Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 400 });
// });  

// afterAll(() => {
//     Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
//     Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
// });
// afterEach(cleanup);
// jest.useFakeTimers();


/*FIXME: test-library无法检测元素大小，导致滚动相关代码都无法走到*/

describe('Tabs', function() {
    it('test basis',async function () {
        const onChange = jest.fn();
        const onTabClick = jest.fn();
        const {container} = render(
            <Tabs onChange={onChange} onTabClick={onTabClick}>
                <Tabs.TabPane tab="Tab 1" key="1">
                    Content of Tab Pane 1
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </Tabs.TabPane>
            </Tabs>
        );
        const tab1 = container.querySelectorAll('.leke-tabs-nav-item')[0];
        const tab2 = container.querySelectorAll('.leke-tabs-nav-item')[1];
        const moreBtn = container.querySelector('.leke-tabs-more-btn');
        expect(moreBtn).not.toBeInTheDocument();
        expect(tab1).toHaveClass('leke-tabs-nav-active',{ exact: false });
        userEvent.click(tab2);
        expect(onChange).toBeCalled();
        expect(onTabClick).toBeCalled();
        expect(tab1).not.toHaveClass('leke-tabs-nav-active',{ exact: false });
        expect(tab2).toHaveClass('leke-tabs-nav-active',{ exact: false });
    });
    it('test edit',async function () {
        const onEdit = jest.fn();
        const {container} = render(
            <Tabs type="editable-card" defaultActiveKey="2" onEdit={onEdit}>
                {Array(3).fill('').map((_,i) => (
                    <Tabs.TabPane tab={`Tab ${i + 1}`} key={i+1} disabled={i===20}>
                        Content of Tab Pane {i + 1}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        );
        const addBtn = container.querySelector('.leke-tabs-add-button');
        userEvent.click(addBtn);
        expect(onEdit).toBeCalled();
        userEvent.hover(container.querySelector('.leke-tabs-nav-list'));
        userEvent.unhover(container.querySelector('.leke-tabs-nav-list'));
        act(() => {
            window.resizeTo(500,500);
        });
    });
});

