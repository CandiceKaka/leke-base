import React from "react";
import VideoPlayer from "../index";
import { render, screen, fireEvent } from '@testing-library/react';

const defaultProps = {
    el: document.body,
    src: 'https://hls.cntv.kcdnvip.com/asp/hls/1200/0303000a/3/default/c9d6fcb3ff7e42f6b6db4199768ff249/1200.m3u8?maxbr=2048',
    width: 876,
    height: 492
};

describe('VideoPlayer', function () {
    it('render correctly', async () => {
        render(<VideoPlayer {...defaultProps} />);
        expect(document.body).toMatchSnapshot();
    });

    it('onPausedChange should be called', () => {
        const onPausedChange = jest.fn();
        render(<VideoPlayer {...defaultProps} onPausedChange={onPausedChange} />);
        fireEvent.click(document.querySelector('.leke-video-root-container'));
        expect(onPausedChange).toHaveBeenCalledTimes(1);
    });
    
    it('onFullscreenChange should be called', () => {
        const onFullscreenChange = jest.fn();
        render(<VideoPlayer {...defaultProps} onFullscreenChange={onFullscreenChange} />);
        fireEvent.click(document.querySelector('.video-fullscreen-container .icon_quanping'));
        expect(onFullscreenChange).toHaveBeenCalledTimes(1);
    });
});