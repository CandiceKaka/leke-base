import React from "react";
import Modal from "../index";
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";

jest.useFakeTimers();

describe('Modal', function () {
    it('render correctly', async () => {
        const defaultProps:any = {
            title: '提示',
            children: 'Hello'
        };
        const { rerender, container } = render(<Modal {...defaultProps} />);
        let ele = container.querySelector('.leke-modal');
        
        expect(ele).not.toBeInTheDocument();
        defaultProps.visible = true;
        rerender(<Modal {...defaultProps} />);
        ele = document.querySelector('.leke-modal');
        const maskEle = document.querySelector('.leke-modal-mask');
        expect(ele).toHaveClass('zoom-enter', { exact: false });
        expect(maskEle).toHaveClass('fade-enter', { exact: false });
        const closeEle = document.querySelector('.leke-modal-close-icon');
        fireEvent.click(closeEle);
        // expect(defaultProps.onCancel).toHaveBeenCalled();
        defaultProps.visible = false;
        rerender(<Modal {...defaultProps} />);
        ele = container.querySelector('.leke-modal');
        await waitFor(() => expect(ele).not.toBeInTheDocument(), {
            timeout: 500
        });
        jest.runAllTimers();
        expect(document.body).toMatchSnapshot();
    });

    it('render destroyOnClose', async () => {
        const defaultProps = {
            visible: false,
            destroyOnClose: true,
            title: '提示',
            children: 'Hello',
            onCancel: jest.fn()
        };
        const { rerender } = render(<Modal {...defaultProps} />);
        defaultProps.visible = true;
        rerender(<Modal {...defaultProps} />);
        let ele = document.querySelector('.leke-modal');
        const maskEle = document.querySelector('.leke-modal-mask');
        expect(ele).toHaveClass('zoom-enter', { exact: false });
        expect(maskEle).toHaveClass('fade-enter', { exact: false });
        const closeEle = document.querySelector('.leke-modal-close-icon');
        fireEvent.click(closeEle);
        expect(defaultProps.onCancel).toHaveBeenCalled();
        ele = document.querySelector('.leke-modal');
        expect(ele).toBeInTheDocument();
        defaultProps.visible = false;
        rerender(<Modal {...defaultProps} />);
        act(()=>{
            jest.runAllTimers();
            expect(ele).toHaveClass('zoom-leave', { exact: false });
        });
    });

    it('render confirm', async () => {
        const { update } = Modal.confirm();

        act(()=>{
            jest.runAllTimers();
            update(() => ({
                closeIcon: <div>关闭</div>,
                title: '确认弹窗',
                maskClosable: true,
                destroyOnClose: true,
                content:<div>
                    <p style={{ color: '#000000' }}>确定要删除这条信息吗？</p>
                    <p>简单的信息描述</p>
                </div>
            }));
            // update(() => ({ title:'确认弹窗1', }));
            fireEvent.click(document.querySelector('button'));
        });
        
        act(()=>{
            jest.runAllTimers();
            // expect(onCancel).toHaveBeenCalled;
            expect(document.querySelector('.leke-modal')).not.toBeInTheDocument();
        });
    });

    it('render confirm', async () => {
        Modal.confirm({
            closeIcon: <div>关闭</div>,
            title: '确认弹窗',
            maskClosable: true,
            destroyOnClose: true,
            onOk: () => {},
            onCancel: () => {},
            content:<div>
                <p style={{ color: '#000000' }}>确定要删除这条信息吗？</p>
                <p>简单的信息描述</p>
            </div>
        });

        act(()=>{
            jest.runAllTimers();
            // update(() => ({ title:'确认弹窗1', }));
            fireEvent.click(document.querySelector('button'));
        });
    });

    it('render miniConfirm', async () => {
        const { update } = Modal.miniConfirm();
        act(()=>{
            jest.runAllTimers();
            update({
                content:<div>
                    <p style={{ color: '#000000' }}>确定要删除这条信息吗？</p>
                    <p>简单的信息描述</p>
                    <p>简单的信息描述</p>
                </div>
            });
            fireEvent.click(document.querySelector('button'));
        });
        
        act(()=>{
            jest.runAllTimers();
            expect(document.querySelector('.leke-modal')).toBeInTheDocument();
        });
    });

    it('render info', async () => {
        const { update } = Modal.info();
        act(()=>{
            jest.runAllTimers();
            update({
                content:<div className="center2">
                    <p>一些简单的信息提示</p>
                    <p>一些简单的信息提示</p>
                </div>
            });
            fireEvent.click(document.querySelector('button'));
        });
    });

    it('render miniInfo', async () => {
        const { update } = Modal.miniInfo();
        act(()=>{
            jest.runAllTimers();
            update({
                content:<div className="center2">
                    <p>一些简单的信息提示</p>
                    <p>一些简单的信息提示</p>
                </div>
            });
            const closeEle = document.querySelector('.leke-modal-close-icon');
            fireEvent.click(closeEle);
        });
    });

    it('render tabs', async () => {
        const defaultProps:any = {
            closeIcon: <div>关闭</div>,
            title:['提示','提示1','提示2'],
            children: 'Hello',
            mask: false,
            onCancel: jest.fn(),
            onChangeTitle: jest.fn()
        };
        const { rerender } = render(<Modal {...defaultProps} />);
        defaultProps.visible = true;
        rerender(<Modal {...defaultProps} />);
        const title2 = document.querySelector('.leke-modal-tab-title').querySelectorAll('p')[1];
        fireEvent.click(title2);
        expect(defaultProps.onChangeTitle).toHaveBeenCalled();
    });
});