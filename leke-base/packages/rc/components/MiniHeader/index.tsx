import React, { useRef } from 'react';
import {getMessageCount, getUserInfo, setHeartbeat, userInfoTypes} from "./api";

import Logo from "./logo";
import {Notice} from '@leke/icons';
import UserInfo from './UserInfo';
import {useResolve} from "@leke/hooks";

function Login() {
    const CAS_SVR = 'https://cas.leke.cn';
    const registerUrl="https://tutor.leke.cn/unauth/user/register.htm";
    const href = window.location.href;
    const url = CAS_SVR + '/login?service='+(href.indexOf('eduplan.leke.cn')>-1?encodeURIComponent(href):'');
    return(
        <div className='leke-miniHeader-login'>
            <a href={url} className='leke-miniHeader-login-btn'>登录</a>
            <span> | </span>
            <a href={registerUrl} className='leke-miniHeader-register-btn'>注册</a>
        </div>
    );
}
export interface MiniHeaderProps {
    showLogo:boolean,
    userInfo ?:userInfoTypes,
    messageCount ?:number
    isAutoHeart?:boolean;
}



const MAX_TIMES = 30; // 两个半小时
const DELAY = 300000; // 五分钟

export default function MiniHeader(props:MiniHeaderProps) {
    const {showLogo,isAutoHeart=true} = props;
    const {data:userInfo,loading}=useResolve<userInfoTypes>(props.userInfo===undefined?getUserInfo:props.userInfo);
    const {data:messageCount}=useResolve<number>(props.messageCount===undefined?getMessageCount:props.messageCount);
   

    const count = useRef(0);
    const timer = useRef(null);

    const sendHeartBeat = () => {
        if(/(?:^|;\s*)_hb\s*=/.test(document.cookie)) {
            window?.console?.log('cookie key _hb exist');
            return;
        }
        let expires = new Date(Date.now() + DELAY).toUTCString();
        document.cookie = '_hb=1; expires=' + expires + '; domain=leke.cn; path=/';
        setHeartbeat();
    };


    const handleHeartbeat = () => {
        if(typeof window ==='undefined')return;
        if(timer.current) {
            clearTimeout(timer.current);
            timer.current == null;
        }

        sendHeartBeat();

        if(count.current < MAX_TIMES) {
            timer.current = setTimeout(handleHeartbeat, DELAY);
            count.current++;
        }
    };

    if(loading){
        return <div className='leke-miniHeader'><div className="leke-miniHeader-content"></div></div>;
    }
    if(userInfo){
        if(isAutoHeart){
            handleHeartbeat();
        }
        return(
            <div className='leke-miniHeader'>
                <div className="leke-miniHeader-content">
                    <div className='leke-miniHeader-left'>
                        <Logo showLogo = {showLogo}/>
                    </div>
                    <div className='leke-miniHeader-right'>
                        <a
                            href='https://webapp.leke.cn/notice-web/notice.html#/'
                            target="_blank"
                            rel="noreferrer"
                            className='leke-miniHeader-message'
                        >
                            <Notice className='icon-notice' />
                            <span>消息</span>
                            {messageCount ? <span className='leke-miniHeader-count' >{Math.min(messageCount,99)}</span>:null}
                        </a>
                        <UserInfo userInfo={userInfo} />
                    </div>
                </div>
            </div>
        );
    }
    return(
        <div className='leke-miniHeader'>
            <div className="leke-miniHeader-content">
                <div className='leke-miniHeader-left'></div>
                <Login />
            </div>
        </div>
    );
}
MiniHeader.defaultProps={
    showLogo:true
};


