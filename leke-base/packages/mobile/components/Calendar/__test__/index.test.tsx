import React from "react";
import Calendar from "../";
import '@testing-library/jest-dom/extend-expect';
import {render } from '@testing-library/react';


describe('Calendar', function() {
    it('test basis',async function () {
        const {container} = render(
            <div>
                <Calendar visible={true}/>
            </div>
        );
    });
});

