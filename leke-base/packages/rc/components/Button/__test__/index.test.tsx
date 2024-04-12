import React from "react";
import Button from "../index";
import {render,waitFor,screen, fireEvent} from '@testing-library/react';
import userEvent from "@testing-library/user-event";

describe('Button ', function() {
    it('button render type', () => {
        render(<Button type='main' />);
        expect(document.body).toMatchSnapshot();
    });
    it('button render size', () => {
        render(<Button size='large'/>);
        expect(document.body).toMatchSnapshot();
    });
    it('button render shape', () => {
        render(<Button shape='circle'/>);
        expect(document.body).toMatchSnapshot();
    });
    it('button render disabled', () => {
        render(<Button disabled/>);
        expect(document.body).toMatchSnapshot();
    });
    it('button render loading', () => {
        const {container} = render(
            <span> 1111 </span>
        );
        render(<Button icon={container} loading/>);
        expect(document.body).toMatchSnapshot();
    });
    it('button should be called', () => {
        const onClick = jest.fn();
        render( <Button onClick={onClick} >点击</Button>);
        fireEvent.click(screen.getByText('点击'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});