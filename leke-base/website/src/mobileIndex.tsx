/**
 * @description 移动端页面入口
 * @author zhoujd@cnstrong.cn
 */
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import configure from "../../packages/rc/components/configure";
import http from './http';
import './index.less';
import { useResolve } from '@leke/hooks';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import cls from 'classnames';

configure({http});

function getHash() {
    return window.location.hash.replace(/^#/,'');
}
if(!getHash()){
    window.location.href='#doc';
}

function getMds(name) {
    return import(`../../packages/mobile/components/${name}/demos/index`).then(res=>{
        return res.default;
    });
}

function MarkdownView(props) {
    const {default:JSXComponent,source,title}=props;
    function codeBlock({value,language}:{value:string,language:string}) {
        
        if(language==='jsx'&&JSXComponent){
            return(
                <div className='jsx-block'>
                    <style dangerouslySetInnerHTML={{__html:props.css}}/>
                    <div className='demo'><JSXComponent /></div>
                </div>
            );
    
        }
    }
    return (
        <section className={cls('markdown-section',title?'nav-section':'')}>
            <ReactMarkdown
                plugins={[gfm]}
                source={source}
                escapeHtml={false}
                renderers={{
                    code:codeBlock
                }}
            />
        </section>
    );
}

function App(){
    const [hash,setHash]=useState(getHash());
    const [name]=hash.split('/');
    const {data}=useResolve<any[]>(getMds,[name]);

    useEffect(()=>{
        function hashChange(){
            setHash(getHash());
        }
        window.addEventListener('hashchange',hashChange);
        return ()=>{
            window.removeEventListener('hashchange',hashChange);
        };
    },[setHash]);
    return(
        <>
            <div className='main'>
                <div className='router-container'>
                    {data?
                        <div className='markdown-list'>
                            {data[1] && <MarkdownView {...data[1]}  />}
                        </div>:null
                    }
                </div>
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