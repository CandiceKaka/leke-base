import React from "react";
import Alert from "../";
import '@testing-library/jest-dom/extend-expect';
import {render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Alert ', function() {
    it('test default',async function () {
        const {container} = render(
            <Alert
                message={"hello world"}
            />
        );
        const wrap = container.querySelector('.leke-alert-container');
        expect(wrap).toContainHTML('hello world');
    });

    it('test be closed',async function () {
        const afterClose= jest.fn();
        const {container} = render(
            <Alert
                className={"my-test-alert"}
                message={"hello world"}
                afterClose={afterClose}
            />
        );
        const wrap = container.querySelector('.my-test-alert');
        expect(wrap).toContainHTML('hello world');
        const closeEle = document.querySelector('.leke-alert-close-box');
        userEvent.click(closeEle);
        waitFor(() => {
            const findWrap = container.querySelector('.my-test-alert');
            expect(findWrap).toBeEmptyDOMElement();
            expect(afterClose).toHaveBeenCalled();
        }, {
            timeout: 500
        });
    });

    it('test success type',async function () {
        const {container} = render(
            <Alert
                className={"my-test-alert"}
                message={"hello world"}
                type={'success'}
            />
        );
        const wrap = container.querySelector('.my-test-alert');
        expect(wrap).toHaveClass('leke-alert-container-success');
    });

    it('test title message',async function () {
        const {container} = render(
            <Alert
                className={"my-test-alert"}
                message={"这是一段message"}
                type={'success'}
                title={'这是一个标题'}
            />
        );
        const message = container.querySelector('.leke-alert-message');
        expect(message).toContainHTML('这是一段message');
        const title = container.querySelector('.leke-alert-title');
        expect(title).toContainHTML('这是一个标题');
    });

    it('test icon hide closeIcon hide',async function () {
        const {container} = render(
            <Alert
                className={"my-test-alert"}
                message={"这是一段message"}
                type={'success'}
                title={'这是一个标题'}
                icon={null}
                closeIcon={null}
            />
        );
        const closeIcon = container.querySelector('.leke-alert-close-box');
        expect(closeIcon).toEqual(null);
        const icon = container.querySelector('.leke-alert-icon-box');
        expect(icon).toEqual(null);
    });

    it('test other props',async function () {

        const {container} = render(
            <Alert
                className={"my-test-alert"}
                action={
                    <button className="action-button">1</button>
                }
                style={{color: 'red'}}
            />
        );
        const wrap = container.querySelector('.my-test-alert');
        expect(wrap).toHaveStyle('color: red');
        const actionButton = container.querySelector('.action-button');
        expect(actionButton).not.toBeEmptyDOMElement();
    });
});