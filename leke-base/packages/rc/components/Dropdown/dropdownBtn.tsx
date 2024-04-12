import React from "react";
import Dropdown from './index';
import {dropdownPropsType} from './index';
import Button from '../Button';
import { Down } from "@leke/icons";

const DropdownBtn:React.FC<dropdownPropsType> = (props)=> {
    const {popup,buttonsRender,type,...otherProps} = props;    
    const left = (<Button type={type || 'default'} className={'leke-radius ' + `${props.disabled?'leke-dropdown-disabled':""}` + `${!type || type==='default'?'leke-dropdown-default':""}` } > {props.children} </Button>);
    const right = (<Button  type={type || 'default'} className={'rBtn '}> <Down />  </Button>);
    const [leftButton,rightButton] =  buttonsRender([left,right]);
    return (
        <div className="leke-btn-dropdown">
            {rightButton?leftButton:leftButton[0]}
            <span className="leke-divider" style={{backgroundColor:!type || type === 'default'?'#1FB5AB':'#E6F6F1' }}></span>
            <Dropdown 
                popup={popup}
                {
                    ...otherProps
                }
                
            >{rightButton?rightButton:leftButton[1]}</Dropdown>
        </div>
    );
};
DropdownBtn.defaultProps = {
    buttonsRender: (left,right)=>[left,right]
};
export default DropdownBtn;