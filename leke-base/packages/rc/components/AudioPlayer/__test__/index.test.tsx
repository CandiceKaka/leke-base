import React from "react";
import AudioPlayer from '../index';
import {Notice} from "@leke/icons";
import {render,fireEvent,screen,waitFor,act} from '@testing-library/react';

const defaultOps = {
    id:"audio-player",
    src:'',
    autoplay:false,
    loop:false,
    preload:'metadata' as 'metadata',
    allowSeek:true,
    timeFormat:null
};
const mp3Url = 'http://music.163.com/song/media/outer/url?id=493735012.mp3';
describe('AudioPlayer',()=>{
    it('support basic use',async()=>{
        const onPlay = jest.fn();
        const onPause = jest.fn();
        const {container,rerender} = render(<AudioPlayer onPlay={()=>{onPlay();}} onPause={()=>{onPause();}}/>);
        expect(document.body).toMatchSnapshot();

        const $audio = container.querySelector('#audio');
        fireEvent.play($audio);
        expect(onPlay).toBeCalled();
        fireEvent.pause($audio);
        expect(onPause).toBeCalled();

        rerender(<AudioPlayer autoplay={true} onPlay={()=>{onPlay();}} onPause={()=>{onPause();}}/>);
        expect($audio.getAttribute('autoplay')).toBeTruthy();
    });

    // it('support on control use',async()=>{
    //     const mockInstance = jest.fn().mockImplementation(() => {
    //         const data = {
    //             choicePlaySoundFile: jest.fn(),
    //             playSoundFile: jest.fn(),
    //         };
    //         return data;
    //     });
    //     const ref ={
    //         current: {
    //             audioPlayer: mockInstance
    //         }
    //     };
    //     const options = {...defaultOps,src:mp3Url};
    //     render(<AudioPlayer ref={ref} {...options}/>);
    //     expect(document.body).toMatchSnapshot();
    //     // const input = screen.getByRole('textbox');
    //     // fireEvent.change(input, { target: { value: '23' } });
    //     // expect((input as HTMLInputElement).value).toBe('23');
    // });
});