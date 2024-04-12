import {http} from '../configure';

export const getUserInfo=(projectName)=>{
    const url=`/auth/global/${projectName}/common/getContextInfo.htm`;
    return http({
        url,
        method: 'get',
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    }).then(res=>res);
};
