import React, { useEffect } from 'react';
import {Notice} from '@leke/icons';
import UserInfo from './UserInfo';
import {getUserInfo,getMessageCount,userInfoTypes,getSchoolLogo,schoolLogoTypes} from "./api";
import {useResolve} from "@leke/hooks";

declare let window: any;

function Login() {
    const CAS_SVR = 'https://cas.leke.cn';
    const registerUrl="https://tutor.leke.cn/unauth/user/register.htm";
    const href = window.location.href;
    const url = CAS_SVR + '/login?service='+(href.indexOf('eduplan.leke.cn')>-1?encodeURIComponent(href):'');
    return(
        <div className='leke-integrationHeader-login'>
            <a href={url} className='leke-integrationHeader-login-btn'>登录</a>
            <span> | </span>
            <a href={registerUrl} className='leke-integrationHeader-register-btn'>注册</a>
        </div>
    );
}
interface HeaderProps {
    userInfo ?:userInfoTypes,
    messageCount ?:number,
    title:string;
    menuList:{
        label:string;
        url:string;
        blank?:boolean;
    }[];
}

export default function IntegrationHeader(props:HeaderProps) {
    const {title,menuList} = props;
    const {data:userInfo,loading}=useResolve<userInfoTypes>(props.userInfo===undefined?getUserInfo:props.userInfo);
    const {data:messageCount}=useResolve<number>(props.messageCount===undefined?getMessageCount:props.messageCount);
    const {data}=useResolve<schoolLogoTypes>(getSchoolLogo);
    if(loading){
        return <div className='leke-integrationHeader'><div className="leke-integrationHeader-content"></div></div>;
    }
    if(userInfo){
        return(
            <div className='leke-integrationHeader'>
                <div className="leke-integrationHeader-content">
                    <div className='leke-integrationHeader-left'>
                        <img src={`https://static.leke.cn/images/common/logo/${data?.isWhiteSchool === 1?'jiashan-logo':'new-header-logo'}.png`} className='leke-integrationHeader-logo' />
                        <span className="leke-integrationHeader-title">{title}</span>
                        <div className="leke-integrationHeader-menu">
                            {
                                menuList.map((item,index)=>{
                                    const condition = location.hash.indexOf(item.url)===0;
                                    return <a key={index} className={condition?'active':''} href={item.url} target={item.blank?'_blank':'_self'} rel="noreferrer">{item.label}</a>;
                                })
                            }
                        </div>
                    </div>
                    <div className='leke-integrationHeader-right'>
                        <a
                            href='https://webapp.leke.cn/notice-web/notice.html#/'
                            target="_blank"
                            rel="noreferrer"
                            className='leke-integrationHeader-message'
                        >
                            <Notice className='icon-notice' />
                            <span>消息</span>
                            {messageCount ? <span className='leke-integrationHeader-count' >{Math.min(messageCount,99)}</span>:null}
                        </a>
                        <UserInfo userInfo={userInfo} />
                    </div>
                </div>
            </div>
        );
    }
    return(
        <div className='leke-integrationHeader'>
            <div className="leke-integrationHeader-content">
                <div className='leke-integrationHeader-left'></div>
                <Login />
            </div>
        </div>
    );
}


