import React from 'react';
import {renderToString} from "react-dom/server";
import {configType} from './types';
export {SSRPage} from './types';
const {clientName}=require('../build/static');

function getAssets (manifest,chunkName) {
    const {publicPath,namedChunkGroups}=manifest;
    const css=[];
    const scripts=[];
    namedChunkGroups[chunkName].assets.forEach(item=>{
        const src=item.name;
        if(src.endsWith('.css')){
            css.push(publicPath+src);
        }else if(/(?<!\.hot-update)\.js$/.test(src)){
            scripts.push(publicPath+src);
        }
    });
    namedChunkGroups[clientName].assets.forEach((item)=>{
        const src=item.name;
        if(src.endsWith('.css')){
            css.unshift(publicPath+src);
        }else if(/(?<!\.hot-update)\.js$/.test(src)){
            scripts.push(publicPath+src);
        }
    });
    return {css,scripts};
}
function getRouterConfig(req){
    let {headers,path,query,protocol,url}=req;
    const {host}=headers;
    const proto=headers['x-forwarded-proto']||protocol;
    const origin=proto+'://'+host;
    return {
        href:origin+url,
        path,
        origin,
        query,
        type:query.type||'page'
    };
}

function getComponentProperty(component,key){
    if(!component){
        return null;
    }
    if(component[key]){
        return component[key];
    }
    if(component.WrappedComponent){
        return component.WrappedComponent[key];
    }
    return null;
}

function PageComponent(props){
    const {data,css,scripts,component,headContent}=props;
    const {rootId='root'}=data.router.query;
    const Component=component;
    return(
        <html lang='en'>
            <head>
                {headContent}
                {css.map(src=><link key={src} rel="stylesheet" href={src}/>)}
            </head>
            <body>
                <div id={rootId}><Component {...data}/></div>
                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{__html:`window.INITSTATE=${JSON.stringify(data)};`}}
                />
                {scripts.map(src=><script  key={src} src={src} />)}
            </body>
        </html>
    );
}
function getJsCode({data,css,scripts}){
    return(
        `(function(){
                window.INITSTATE=window.INITSTATE||[];window.INITSTATE.push(${JSON.stringify(data)});
                var frag=document.createDocumentFragment();
                ${JSON.stringify(css)}.forEach(function(href){
                    if(!document.querySelector('link[href='+JSON.stringify(href)+']')){
                        var link=document.createElement('link');
                        link.href=href;
                        link.rel='stylesheet';
                        frag.appendChild(link)
                    }
                });
                ${JSON.stringify(scripts)}.forEach(function(src){
                    if(!document.querySelector('script[src='+JSON.stringify(src)+']')){
                        var script=document.createElement('script');
                        script.src=src;
                        frag.appendChild(script)
                    }
                });
                document.head.appendChild(frag);
             })()
            `.replace(/([\r\n\s]*)([();,{}])([\r\n\s]*)/g,'$2')
    );
}
export default function start(config:configType) {
    const getRoute=function(path) {
        const {publicPath='',routes}=config;
        return routes.find((item)=>{
            return path===publicPath+item.path;
        });
    };
    const getHeadContent=function(req,component) {
        const commonHead=config.headContent;
        const headContent=getComponentProperty(component,'headContent');
        return (
            <>
                {typeof commonHead==='function'?commonHead(req):(commonHead||null)}
                {typeof headContent==='function'?headContent(req):(headContent||null)}
            </>
        );
    };
    const {publicPath,createRequest,errorInterceptor}=config;
    return async function (req, res, next,manifest) {
        if(publicPath&&!new RegExp('^'+publicPath+'(/|$)').test(req.path)){
            return next();
        }
        const route=getRoute(req.path);
        if (!route) {
            if(typeof errorInterceptor==='function'){
                return errorInterceptor({status:404},req,res,next);
            }
            return next({status:404});
        }
        const routerConfig=getRouterConfig(req);
        try {
            const {default:component,__webpack_chunkname_}=await route.getComponent();
            const data={router:routerConfig};
            const getInitialData=getComponentProperty(component,'getInitialData');
            if(typeof getInitialData==='function'){
                if(typeof createRequest==="function"){
                    Object.assign(data,await getInitialData(createRequest(req),req,res));
                }else{
                    Object.assign(data,await getInitialData(req,res));
                }
            }
            const {css,scripts}=getAssets(manifest,__webpack_chunkname_);
            if(routerConfig.type==='page'){
                const htmlString=renderToString(
                    <PageComponent
                        data={data}
                        css={css}
                        scripts={scripts}
                        component={component}
                        headContent={getHeadContent(req,component)}
                    />
                );
                res.send('<!DOCTYPE html>'+htmlString);
            }else{
                res.end(getJsCode({data,css,scripts}));
            }
        } catch (e) {
            if(typeof errorInterceptor==='function'){
                errorInterceptor(e,req,res,next);
            }else{
                next(e);
            }
        }
    };
}