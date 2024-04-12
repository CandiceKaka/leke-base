import React from "react";
import UserInfo from "../UserInfo";
import MiniHeader from "../index";
import {getUserInfo,getMessageCount} from "../api";
import {render,waitFor,screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";

describe('MiniHeader ', function() {
    it('test UserInfo',async function () {
        const userInfo = await getUserInfo();
        const {container,rerender} = render(<UserInfo userInfo={userInfo}/>);
        userEvent.hover(container.querySelector('.leke-miniHeader-user'));
        const roleLength=userInfo.roleSchoolList.length;
        await waitFor(()=>screen.getByText('个人中心'));
        expect(document.body.querySelectorAll('.leke-miniHeader-role-list li').length).toBe(roleLength+3);
        userInfo.roleName='学生';
        userInfo.schoolId=-1;
        userInfo.avatar='/a';
        rerender(<UserInfo userInfo={userInfo}/>);
        expect(document.body.querySelectorAll('.leke-miniHeader-role-list li').length).toBe(roleLength+2);
    });
    it('test userInfo or message',async function () {
        const userInfo = await getUserInfo();
        const messageCount =await getMessageCount();
        const {getByText}=render(<MiniHeader userInfo={userInfo} />);
        await waitFor(()=>getByText(messageCount.toString()));
    });
    it('test logo',async function () {
        const userInfo = await getUserInfo();
        const {container} = render(<MiniHeader showLogo={false} userInfo={userInfo} messageCount={1} />);
        expect(container.querySelector('.leke-miniHeader-left img')).toBe(null);
    });
});