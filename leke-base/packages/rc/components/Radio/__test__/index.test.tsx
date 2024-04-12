import React from "react";
import Radio from "../";
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import {render, waitFor, cleanup, fireEvent, screen} from '@testing-library/react';

 
require('../demos');

describe('Radio', function() {
    afterEach(cleanup);
    it('basics', () => {
        const Basic = function(){
            const [value, setValue] = React.useState(3);
        
            const onChange = e => {
                setValue(e.target.value);
            };
            return(
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>常态</Radio>
                    <Radio value={2} disabled>悬停</Radio>
                    <Radio value={3} onChange={onChange}>选中</Radio>
                </Radio.Group>
            );
        };
        const { asFragment } = render(<Basic />);
        expect(asFragment()).toMatchSnapshot();
        const firtRadio = screen.getByDisplayValue(2);
        userEvent.click(firtRadio);
        expect(firtRadio).toBeDisabled();
    });
    it('basics', () => {
        const Basic = function(){
            const [value, setValue] = React.useState('Apple');
        
            const onChange = e => {
                setValue(e.target.value);
            };
            const plainOptions = ['small', 'middle', 'large'];
            const options = [
                { label: 'Apple', value: 'Apple' },
                { label: 'Pear', value: 'Pear' },
                { label: 'Orange', value: 'Orange' },
            ];
            return(
                <>
                    <Radio.Group options={plainOptions} onChange={onChange} />
                    <Radio.Group options={options} value={value} onChange={onChange} />
                    <Radio onChange={onChange}>onChange Radio</Radio>
                    <Radio disabled={true}>disabled Radio</Radio>
                </>
            );
        };
        const { asFragment } = render(<Basic />);
        expect(asFragment()).toMatchSnapshot();
        const firtRadio = screen.getByDisplayValue('Apple');
        userEvent.click(firtRadio);
        expect(firtRadio).toBeChecked();
    });
    it('radioButton', () => {
        const RadioButton = function(){
            const onChange = e => {
                e.stopPropagation();
                e.preventDefault();
                console.log(`radio checked:${e.target.value}`);
            };
            const radioStyle = {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            };
            const style={
                margin:'16px 0'
            };
            return(
                <>
                    <Radio.Group onChange={onChange} defaultValue="c" buttonStyle="solid" style={style}>
                        <Radio.Button style={radioStyle} value="a">选项二</Radio.Button>
                        <Radio.Button value="b" disabled>未选禁用</Radio.Button>
                        <Radio.Button value="c">选中状态</Radio.Button>
                        <Radio.Button value="d">选项二</Radio.Button>
                    </Radio.Group>
                </>
            );
        };
        const { asFragment } = render(<RadioButton />);
        expect(asFragment()).toMatchSnapshot();
        const firtRadio = screen.getByDisplayValue('a');
        userEvent.click(firtRadio);
        expect(firtRadio).toBeChecked();
    });
});