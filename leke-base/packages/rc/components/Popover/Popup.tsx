import React from "react";
import {createPortal} from "react-dom";
export interface popupPropsType {
    portalContainer:HTMLElement
    visible:boolean,
    children:React.ReactNode
}
const Popup=React.memo(function (props:popupPropsType) {
    const {children,portalContainer}=props;
    if(!portalContainer){
        return null;
    }
    return createPortal(
        <div style={{position:'absolute',top:0,left:0,width:'100%'}}>
            {children}
        </div>,
        portalContainer
    );
}, (prevProps,nextProps)=>{
    return !nextProps.visible;
});

export default Popup;
