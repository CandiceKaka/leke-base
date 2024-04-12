import http from '@leke/http';
import {http as devHttp} from '../../../rc/components/configure';
// 处理组件库开发环境接口走mock
const newHttp = typeof window!=='undefined'&&window.location.hash==='#rc/BusinessHeader'?devHttp:http;
export const getUserInfo=(projectName)=>{
    const url=`/auth/global/${projectName}/common/getContextInfo.htm`;
    return newHttp({
        url,
        method: 'get',
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    }).then(res=>res);
};
