import React from "react";
import Carousel from "../";
import {render,act} from '@testing-library/react';

describe('Carousel ', function() {
    it('test ref', () => {
        const ref:any=React.createRef();
        render(
            <Carousel ref={ref} autoplay={false} dots={false}>
                <div style={{height:100}}></div>
                <div style={{height:100}}></div>
            </Carousel>
        );
        act(()=>{
            ref.current.goTo(2);
        });
        const container=ref.current.dom.querySelector('.leke-carousel-wrap');
        expect(container.style.left).toBe('-200%');
        act(()=>{
            ref.current.goTo(index=>index+1);
        });
        expect(container.classList.contains('leke-carousel-transition')).toBe(false);
    });
});