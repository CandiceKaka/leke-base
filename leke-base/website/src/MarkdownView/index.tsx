import React, {useRef, useState} from 'react';
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { jsx, javascript,css } from "react-syntax-highlighter/dist/esm/languages/prism";
import gfm from 'remark-gfm';
import './index.less';
import ReactMarkdown from "react-markdown";
import {DownFill} from "@leke/icons";
import {useAnimation} from '@leke/hooks';
import classNames from 'classnames';

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("css", css);

interface propTypes {
    source:string,
    default?:React.FC,
    css?:string,
    title?:string,
    description?:string
}
function JSXCoder({value,css}) {
    const [showCode,setShowCode]=useState(false);
    const renderedRef=useRef(false);
    const domRef=useRef<HTMLDivElement>(null);
    const heightRef=useRef(0);
    if(showCode&&!renderedRef.current){
        renderedRef.current=true;
    }
    useAnimation({
        ref:domRef,
        open:showCode,
        type:'transition',
        onEnter(){
            const el=domRef.current;
            el.style.display='';
            heightRef.current=el.offsetHeight;
            el.style.height='0px';
        },
        onEntering(){
            const el=domRef.current;
            el.style.height=heightRef.current+'px';
        },
        onExiting(){
            const el=domRef.current;
            el.style.height='0px';
        },
        onExited(){
            const el=domRef.current;
            el.style.height='';
            el.style.display='none';
        }
    });
    return(
        <div className='jsx-code-block'>
            {renderedRef.current?<div className='code-highlighter' ref={domRef}>
                <SyntaxHighlighter language={'jsx'} style={coy}>
                    {value}
                </SyntaxHighlighter>
                {css?<SyntaxHighlighter language={'css'} style={coy}>
                    {css}
                </SyntaxHighlighter>:null}
            </div>:null}
            <div className='code-btn-group'>
                <span onClick={()=>setShowCode(bool=>!bool)} className='show-code-btn'>
                    {showCode?'隐藏代码':'显示代码'}
                    <DownFill
                        className='icon-down'
                        style={{transform:`rotate(${showCode?180:0}deg)`}}
                    />
                </span>
            </div>
        </div>
    );
}
export default function (props:propTypes) {
    const {css,default:JSXComponent,source,description,title}=props;
    function codeBlock({value,language}:{value:string,language:string}) {
        if(language==='jsx'&&JSXComponent){
            return(
                <div className='jsx-block'>
                    <style dangerouslySetInnerHTML={{__html:props.css}}/>
                    <div className='demo'><JSXComponent /></div>
                    {title?
                        <div className='demo-title'>
                            <span className='line line-left'></span>
                            <span className='text'>{title}</span>
                            <span className='line line-right'></span>
                        </div>
                        :null}
                    {description?<p className='demo-description'>{description}</p>:null}
                    <JSXCoder css={css} value={value}/>
                </div>
            );
        }
        return(
            <SyntaxHighlighter language={language} style={coy}>
                {value}
            </SyntaxHighlighter>
        );
    }
    return (
        <section className={classNames('markdown-section',title?'nav-section':'')}>
            {!JSXComponent&&title?<h2>{title}</h2>:null}
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