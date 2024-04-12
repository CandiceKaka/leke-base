import React,{useState,useImperativeHandle,forwardRef} from 'react';
import ReactDOM from 'react-dom';
export interface PortalProps {
    children: React.ReactNode,
    getContainer: () => HTMLElement,
    ref:any
}
function Portal(props: PortalProps,ref:any) {
    const {getContainer=() => document.body}=props;
    const [rendered, setRendered] = useState(true);
    useImperativeHandle(ref, ()=>{
        return {render:(status)=>{setRendered(status);}};
    });
    return rendered?ReactDOM.createPortal(props.children, getContainer()):null;
}

export default forwardRef(Portal);