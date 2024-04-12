import {http} from '../configure';

export interface schoolLogoTypes {
    isWhiteSchool: number,
    schoolId: number,
    schoolCode: number,
    schoolLogoUrl: string,
}

export function getSchoolLogo() {
    return http<schoolLogoTypes>({
        method:'get',
        url:'/auth/global/tutor/common/getSchoolLogoUrl.htm'
    }).catch(() => {
        return "";
    });
};