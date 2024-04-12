import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import configure from "../../packages/rc/components/configure";
import http from './http';
import RouterView from './RouterView';
import LeftTab from "./LeftTab";
import Header from "./Header";
import './index.less';

configure({http});

function getHash() {
    return window.location.hash.replace(/^#/,'');
}
if(!getHash()){
    window.location.href='#doc';
}
function App(){
    const [hash,setHash]=useState(getHash());

    useEffect(()=>{
        function hashChange(){
            setHash(getHash());
        }
        window.addEventListener('hashchange',hashChange);
        return ()=>{
            window.removeEventListener('hashchange',hashChange);
        };
    },[setHash]);
    const [type,name]=hash.split('/');
    return(
        <>
            <Header type={type}/>
            <div className='main'>
                <LeftTab type={type} name={name} />
                <RouterView type={type} name={name} />
            </div>
        </>
    );
}
ReactDOM.render(
    <App />,
    document.getElementById("root")
);
if(module.hot){
    module.hot.accept();
}