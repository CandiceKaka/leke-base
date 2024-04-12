import React from "react";
import Popover from "../index";
import '@testing-library/jest-dom/extend-expect';
import {render,screen,waitFor,act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const defaultProps={
    children:<div style={{width:200}}>trigger</div>,
    popup:<div>popup</div>
};
jest.useFakeTimers();
describe('Popover ', function() {
    it('test hover',async function () {
        const {getByText} = render(
            <Popover
                {...defaultProps}
                autoSize={true}
            />
        );
        const trigger=getByText('trigger');
        userEvent.hover(trigger);
        await waitFor(()=>screen.getByText('popup'));
        const popupContainer:HTMLDivElement=document.body.querySelector('.leke-popup');
        expect(popupContainer.style.minWidth).toBe(trigger.offsetWidth+'px');
        userEvent.unhover(trigger);
        userEvent.hover(popupContainer);
        act(()=>{
            jest.runAllTimers();
            expect(popupContainer.className.indexOf('leke-close')).toBe(-1);
        });
        userEvent.unhover(popupContainer);
        act(()=>{
            jest.runAllTimers();
            expect(popupContainer).toHaveClass('leke-close');
        });
    });
    it('test autoSize',async function () {
        const {getByText} = render(
            <Popover
                {...defaultProps}
                autoSize={true}
                placement={'leftTop'}
            />
        );
        const trigger=getByText('trigger');
        userEvent.hover(trigger);
        await waitFor(()=>screen.getByText('popup'));
        const popupContainer:HTMLDivElement=document.body.querySelector('.leke-popup');
        expect(popupContainer.style.minHeight).toBe(trigger.offsetHeight+'px');
    });
    it('test focus',async function () {
        const {getByText} = render(
            <Popover
                {...defaultProps}
                eventType={['click']}
            />
        );
        const trigger=getByText('trigger');
        userEvent.click(trigger);
        await waitFor(()=>screen.getByText('popup'));
        userEvent.click(document.body);
        act(()=>{
            jest.runAllTimers();
            expect(screen.getByText('popup').parentElement).toHaveClass('leke-close');
        });
    });
    it('test click',async function () {
        const {container} = render(
            <Popover
                popup={<div>popup</div>}
                eventType={['click']}
            ><input type="text"/></Popover>
        );
        const trigger=container.querySelector('input');
        userEvent.click(trigger);
        expect(trigger).toHaveFocus();
        await waitFor(()=>screen.getByText('popup'));
        userEvent.click(document.body);
        act(()=>{
            jest.runAllTimers();
            expect(screen.getByText('popup').parentElement).toHaveClass('leke-close');
        });
    });
    it('test ref',async function () {
        const ref=React.createRef<HTMLDivElement>();
        const {rerender} = render(
            <Popover
                popup={<div>popup</div>}
            >
                <div ref={ref}>trigger</div>
            </Popover>
        );
        expect(ref.current.innerHTML).toBe('trigger');
        const fn=jest.fn();
        rerender(
            <Popover
                popup={<div>popup</div>}
            >
                <div ref={fn}>trigger</div>
            </Popover>
        );
        expect(fn).toBeCalled();
    });
    it('test placement',async function () {
        const {rerender,getByText} = render(
            <Popover
                {...defaultProps}
                placement='bottomLeft'
            />
        );
        const trigger=getByText('trigger');
        userEvent.click(trigger);
        await waitFor(()=>screen.getByText('popup'));
        const popupContainer=screen.getByText('popup').parentElement;
        expect(popupContainer).toHaveClass('leke-popup-bottomLeft');
        rerender(
            <Popover
                {...defaultProps}
                placement='bottomCenter'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-bottomCenter');
        rerender(
            <Popover
                {...defaultProps}
                placement='bottomRight'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-bottomRight');
        rerender(
            <Popover
                {...defaultProps}
                placement='topLeft'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-topLeft');
        rerender(
            <Popover
                {...defaultProps}
                placement='topCenter'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-topCenter');
        rerender(
            <Popover
                {...defaultProps}
                placement='leftTop'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-leftTop');
        rerender(
            <Popover
                {...defaultProps}
                placement='leftCenter'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-leftCenter');
        rerender(
            <Popover
                {...defaultProps}
                placement='leftBottom'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-leftBottom');
        rerender(
            <Popover
                {...defaultProps}
                placement='rightTop'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-rightTop');
        rerender(
            <Popover
                {...defaultProps}
                placement='rightCenter'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-rightCenter');
        rerender(
            <Popover
                {...defaultProps}
                placement='rightBottom'
            />
        );
        expect(popupContainer).toHaveClass('leke-popup-rightBottom');
    });
});