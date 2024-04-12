import React from "react";
import {render,waitFor} from '@testing-library/react';

export default function demoTest ({default:mds}) {
    mds.forEach(({default:Component,filename})=>{
        if(Component){
            it('test '+filename,async function () {
                const {container} = render(<Component />);
                await waitFor(()=>new Promise(resolve => setTimeout(resolve)));
                expect(container).toMatchSnapshot();
            });
        }
    });
}