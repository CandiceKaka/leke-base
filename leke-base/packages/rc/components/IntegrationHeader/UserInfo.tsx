import React from 'react';
import {DownFill} from "@leke/icons";
import Dropdown from "../Dropdown";

const defaultHeaderObj = {
    1: 'https://static.leke.cn/images/home/photo-man.png', // 男生默认头像
    2: 'https://static.leke.cn/images/home/photo-female.png', //女生默认头像
    3: 'https://static.leke.cn/images/home/photo.png', // 保密默认头像
};

const userCenter='https://tutor.leke.cn/auth/common/user/myDetail.htm';
const fileUrl='https://file.leke.cn';
const defaultLogoutUrl='https://cas.leke.cn/logout';

export default function UserInfo(props) {
    const {userInfo}=props;
    const userImg = userInfo.avatar ? `${fileUrl}${userInfo.avatar}` : (defaultHeaderObj[userInfo.sex]||'https://static.leke.cn/images/home/photo.png');
    const logoutUrl=userInfo.schoolId===-1?`${defaultLogoutUrl}?service=sclass.leke.cn`:defaultLogoutUrl;
    return (
        <Dropdown
            placement='bottomCenter'
            popup={
                <ul className='leke-integrationHeader-role-list'>
                    <li className='leke-integrationHeader-personal-center'>
                        <a target="_blank" rel="noreferrer" href={userCenter}>
                            <div className='leke-indent'></div>
                            个人中心
                        </a>
                    </li>
                    <li className='leke-integrationHeader-logout'>
                        <a href={logoutUrl}>
                            <div className='leke-indent'></div>
                            退出登录
                        </a>
                    </li>
                </ul>
            }
        >
            <div className='leke-integrationHeader-user'>
                <a href={userCenter} className='leke-integrationHeader-portrait'>
                    <img src={userImg} alt="" />
                </a>
                <span className='leke-integrationHeader-userName'>{userInfo.userName || ''}</span>
                <DownFill className='leke-icon-down-fill' />
            </div>
        </Dropdown>
    );
}
