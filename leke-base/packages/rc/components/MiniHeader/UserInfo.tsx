import React from 'react';
import {DownFill,Check} from "@leke/icons";
import Dropdown from "../Dropdown";
import classNames from 'classnames';

const defaultHeaderObj = {
    1: 'https://static.leke.cn/images/home/photo-man.png', // 男生默认头像
    2: 'https://static.leke.cn/images/home/photo-female.png', //女生默认头像
    3: 'https://static.leke.cn/images/home/photo.png', // 保密默认头像
};

const userCenter='https://tutor.leke.cn/auth/common/user/myDetail.htm';
const fileUrl='https://file.leke.cn';
const defaultLogoutUrl='https://cas.leke.cn/logout';
const learnCenterUrl='https://cas.leke.cn/changeLearnCenter';
const changeRole='https://cas.leke.cn/changeRole?ticket=null';

function RoleSchoolList({userInfo}) {
    return userInfo.roleSchoolList && userInfo.roleSchoolList.map((ele,index) => {
        const preTitle = ele.schoolNature === 3 ? '入驻' : '';
        const roleSchoolTitle = `${preTitle}${ele.roleName}`;
        const active = ele.roleId === userInfo.roleId && ele.schoolId === userInfo.schoolId;
        return <li className={classNames(active?'leke-role-current':'')} key={index}>
            <a href={`${changeRole}&userId=${userInfo.userId}&roleId=${ele.roleId}&schoolId=${ele.schoolId}`}>
                <div className='leke-indent'>{active?<Check />:null}</div>
                {roleSchoolTitle}
            </a>
        </li>;
    });
}
function LearnCenter ({userInfo}) {
    if ( userInfo.roleName !== '学生' ) {
        const active = userInfo.isLearnCenter ? 'leke-role-current' : '';
        return <li className={active}>
            <a href={learnCenterUrl}>
                <div className='leke-indent'>{active?<Check />:null}</div>
                学习中心
            </a>
        </li>;
    }
    return null;
}
export default function UserInfo(props) {
    const {userInfo}=props;
    const userImg = userInfo.avatar ? `${fileUrl}${userInfo.avatar}` : (defaultHeaderObj[userInfo.sex]||'https://static.leke.cn/images/home/photo.png');
    const logoutUrl=userInfo.schoolId===-1?`${defaultLogoutUrl}?service=sclass.leke.cn`:defaultLogoutUrl;
    return (
        <Dropdown
            placement='bottomCenter'
            popup={
                <ul className='leke-miniHeader-role-list'>
                    <li className='leke-miniHeader-personal-center'>
                        <a target="_blank" rel="noreferrer" href={userCenter}>
                            <div className='leke-indent'></div>
                            个人中心
                        </a>
                    </li>
                    <RoleSchoolList userInfo={userInfo}/>
                    <LearnCenter userInfo={userInfo} />
                    <li className='leke-miniHeader-logout'>
                        <a href={logoutUrl}>
                            <div className='leke-indent'></div>
                            退出登录
                        </a>
                    </li>
                </ul>
            }
        >
            <div className='leke-miniHeader-user'>
                <a href={userCenter} className='leke-miniHeader-portrait'>
                    <img src={userImg} alt="" />
                </a>
                <span className='leke-miniHeader-userName'>{userInfo.userName || ''}</span>
                <DownFill className='leke-icon-down-fill' />
            </div>
        </Dropdown>
    );
}
