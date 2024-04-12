import { getSchoolLogo, schoolLogoTypes } from "./api";

import React from "react";
import {useResolve} from "@leke/hooks";

export default function Logo(showLogo) {
    const {data}=useResolve<schoolLogoTypes>(getSchoolLogo);

    if (!data) {
        return null;
    }

    return (
        <>
            {showLogo? <img src={data?.isWhiteSchool === 1 ? data?.schoolLogoUrl: 'https://static.leke.cn/images/common/logo/mini-header-logo-new-2.png'}      
                onError={(e:any) => {
                    if (data?.isWhiteSchool === 1) {
                        e.target.style.display = 'none';
                    } else {
                        e.target.src =  'https://static.leke.cn/images/common/logo/mini-header-logo-new-2.png'; 
                    }
                                 
                }} className='leke-miniHeader-logo' /> :null}
        </>
    );
}