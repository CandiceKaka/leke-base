import React from "react";
import Spin from "../";
import '@testing-library/jest-dom/extend-expect';
import {render, waitFor} from '@testing-library/react';

describe('spin', function() {
    it('test default',async function () {
        const {container} = render(
            <Spin />
        );
        const spin = container.querySelector('.leke-spin-bg').firstChild;
        expect(spin).toHaveClass('leke-spin-animation');
    });
    it('test small',async function () {
        const {container} = render(
            <Spin size="small"/>
        );
        const spin = container.querySelector('.leke-spin-bg').firstChild;
        expect(spin).toHaveClass('leke-spin-animation leke-spin-animation-small');
    });
    it('test wrapper',async function () {
        const {container} = render(
            <Spin size="small">
                <div>SpinSpin</div>
            </Spin>
        );
        const spin = container.querySelector('.leke-spin-container');
        expect(spin).toHaveClass('leke-spin-container leke-spin-blur');
    });
    it('test delay',async function () {
        const {rerender,container} = render(
            <Spin size="small" delay={1000} spinning>
                <div>SpinSpin</div>
            </Spin>
        );
        expect(container.querySelector('.leke-spin-container')).not.toHaveClass('leke-spin-blur');
        await waitFor(() => expect(container.querySelector('.leke-spin-container')).toHaveClass('leke-spin-blur'), { timeout: 1000 });
        
        rerender(<Spin size="small" delay={1000} spinning={false}>
            <div>SpinSpin</div>
        </Spin>);
        expect(container.querySelector('.leke-spin-container')).toHaveClass('leke-spin-blur');
        await waitFor(() => expect(container.querySelector('.leke-spin-container')).not.toHaveClass('leke-spin-blur'), { timeout: 1000 });
    });
});