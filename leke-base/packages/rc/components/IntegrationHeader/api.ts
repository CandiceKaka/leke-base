import {http} from '../configure';

export interface userInfoTypes {
    userId:number,
    userName:string,
    roleId:number,
    roleName:string,
    avatar:string,
    sex:number,
    schoolId:number,
    schoolName:string,
    schoolNature:number,
    schoolLogoUrl?:string,
    isLearnCenter:boolean,
    roleSchoolList:{roleId:number,roleName:string,schoolNature:number,schoolId:number}[]
}

export interface schoolLogoTypes {
  isWhiteSchool: number,
  schoolId: number,
  schoolCode: number,
  schoolLogoUrl: string,
}

export function getMessageCount() {
    return http<number>({
        method:'get',
        url:'/auth/global/notice/common/todo/findNoticeAndAfficheNum.htm'
    });
}

export function getUserInfo() {
    return http<userInfoTypes>({
        method:'get',
        url:'/auth/global/tutor/common/getMiniMenu.htm'
    }).catch(()=>{
        return null;
    });
}

export function getSchoolLogo() {
    return http<schoolLogoTypes>({
        method:'get',
        url:'/auth/global/tutor/common/getSchoolLogoUrl.htm'
    }).catch(() => {
        return "";
    });
};