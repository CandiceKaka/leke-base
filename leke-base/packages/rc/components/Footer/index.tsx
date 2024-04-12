import { getSchoolLogo, schoolLogoTypes } from "./api";

import React from "react";
import { useResolve } from "@leke/hooks";

export default function Footer() {
    const { data } = useResolve<schoolLogoTypes>(getSchoolLogo);
    return (
        <>
            <link
                rel="stylesheet"
                href="https://static.leke.cn/styles/common/iconfont/iconfont.css"
            />
            <div className={"g-foot"}>
                <div className={"m-foot"}>
                    <div className={"c-foot__link"}>
                        <span>
                            <a
                                className="link"
                                href="https://leke.cn/leke-index-pro/#/lekeIndex/download"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i
                                    className={
                                        "iconfont icon-global-ruanjian c-foot__plink ruanjian"
                                    }
                                ></i>
                软件下载
                            </a>
                        </span>
                        <span className={"c-foot__webchat-box"}>
                            <a className="link">
                                <i
                                    className={"iconfont icon-global-weixin c-foot__plink weixin"}
                                ></i>
                关注微信
                            </a>
                            <span className={"c-foot__webchat--img"}></span>
                        </span>
                        <span>
                            <a
                                href="https://tutor.leke.cn/auth/common/help/help.htm"
                                className="link"
                            >
                                <i
                                    className={`iconfont icon-global-bangzhu c-foot__plink bangzhu`}
                                ></i>
                帮助中心
                            </a>
                        </span>
                        <span>
                            <a
                                target="_blank"
                                className="link"
                                onClick={() => {
                                    const url =
                    "https://webapp.leke.cn/wisdom-online-support/index.html#/wisdomOnlineSup?title=" +
                    document.title;
                                    // @ts-ignore
                                    window.open(url, "newwindow", "height=100", "width=400", "top=100", "left=0", "toolbar=false", "menubar=false", "scrollbars=false", "resizable=false", "location=false", "status=false");
                                }}
                            >
                                <i
                                    className={`iconfont icon-zhinengkefuicon c-foot__plink QQhover`}
                                ></i>
                技术支持
                            </a>
                        </span>
                        <span>
                            <a
                                href="https://chat.leke.cn/auth/common/feedback/editFeedback.htm"
                                className="link"
                            >
                                <i
                                    className={`iconfont icon-global-yijianfankui c-foot__plink yijianfankui`}
                                ></i>
                意见反馈
                            </a>
                        </span>
                        <span>
                            <a className="link">
                                <i
                                    className={`iconfont icon-global-kefurexian c-foot__plink kefurexian`}
                                ></i>
                技术支持热线：0571-87110109&nbsp;/&nbsp;182-6886-9533&nbsp;/&nbsp;182-6886-9535
                            </a>
                        </span>
                    </div>
                    <address className={"c-foot__addres"}>
                        Copyright&nbsp;©&nbsp;2013-{new Date().getFullYear()}
            &nbsp;&nbsp;&nbsp;&nbsp;
                        {`${data?.isWhiteSchool === 1 ? "" : "乐课网"}`}&nbsp;&nbsp;版权所有&nbsp;&nbsp;&nbsp;&nbsp;ICP证:
            浙B2-20201473&nbsp;&nbsp;&nbsp;&nbsp;浙公网安备：33010802003457&nbsp;&nbsp;&nbsp;&nbsp;
                        <a
                            href="http://beian.miit.gov.cn/publish/query/indexFirst.action"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
              浙ICP备09057654号-7
                        </a>
                    </address>
                    <div className={"certificate"}>
                        <a
                            id="___szfw2_logo___"
                            href="https://ss.knet.cn/verifyseal.dll?sn=e18022833010072164iejo000000&pa=111332"
                            onContextMenu={(e) => this.contextmenu(e)}
                        >
                            <img
                                src="https://static.leke.cn/images/common/beli-img1.png"
                                alt="可信网站"
                            />
                        </a>
                        <a
                            id="___szfw_logo___"
                            href="https://search.szfw.org/cert/l/CX20150123006870006571"
                            onContextMenu={(e) => this.contextmenu(e)}
                        >
                            <img
                                src="https://static.leke.cn/images/common/beli-img2.png"
                                alt="诚信网站"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
