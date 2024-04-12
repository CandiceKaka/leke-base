/*
 * @Descripttion: 
 * @Author: gulingxin
 * @Date: 2021-02-02 20:38:10
 * @LastEditTime: 2021-02-03 11:45:15
 */
const iframeBaseUrl =
  typeof window !== "undefined" && window.location.hostname.includes("homework")
      ? ""
      : "https://webapp.leke.cn";

// navigate
export const getNavHtml = function(title,extraTitle,iconClass){

    return `<div class="c-businesshead__kind">
        <div id="jBusinessheadNavigateImg" class="c-businesshead__img ${iconClass}">
        </div>
        ${ !!title? `<h3 id="jBusinessheadNavigateName">${ title }</h3>`:''}
        ${ !!extraTitle? `<i>|</i><span class='extraTitle'>${ extraTitle }</span>`:''}
    </div>`;
};
export const getNavMenuHtml = function(currentSubs,getMenuClass,sub){
    return (`<ul id="jBusinessheadNavigate">${
        currentSubs.map((menu, index)=>{
            return `<li class="${ getMenuClass(menu) }">
                    <a href="${ menu.url }" rel="noreferrer" target="${ menu.blank ? '_blank' : '_self' }">
                        ${ menu.key }
                        ${ sub&&sub.length !== 0 ? 
            (sub.map((sub, index1)=>{ 
                if(sub.key === menu.key){
                    return ( `<span>${ sub.num }</span>` );
                }
            })) : '' }
            </a>
        </li>`;
        }).join('')}
    </ul>`);
};
export const getNavSelectHtml = function(list,title){
    return `<div class="secondary" id='secondary'>
        ${ list.map((item, index) => {
        return `<a class="item ${title === item.title ? 'active' : ''}" href="${item.url}">${ item.title }</a>`;
    }).join('')}</div>`;
};
// toolbar 
export const getToolbarHtml = function(roleId){
    return  `
    <div class="leke-toolbar-box">
    <ul class="c-sidebar">
        ${ [100,101].indexOf(roleId)>-1 ? toolbarNoteHtml : ''}
        ${ [100].indexOf(roleId)>-1 ? toolbarQuestionHtml : ''}
        ${ [101].indexOf(roleId)>-1 ? toolbarAnswerHtml : ''}
        <li class="mobile">
            <a
                onclick="event.preventDefault();"
            ></a>
            <div class="tdc">
                <div class="download">
                    <p>下载乐桃APP</p>
                </div>
                <div class="star">
                    <p>乐课网微讯</p>
                </div>
            </div>
        </li>
        <li class="support">
            <a target="_blank"></a>
        </li>
        <li class="helpCenter">
            <a
                href="https://tutor.leke.cn/auth/common/help/help.htm"
                target="_blank"
                rel="noreferrer"
            ></a>
        </li>
        <li class="gotop">
            <a onclick="window.scrollTo(0,0);"></a>
        </li>
    </ul>
    ${toolbarGotopHtml}
    </div>
`;};

// 笔记
export const toolbarNoteHtml = `
<li class='note'>
    <a></a>
</li>
`;

// 学生提问
export const toolbarQuestionHtml = `
<li class="question">
    <a onclick="event.preventDefault();"></a>
</li>
`;

// 老师解答
export const toolbarAnswerHtml = `
<li class="answer">
    <a href="https://webapp.leke.cn/page/doubt/pc/teacher/doubtList"></a>
</li>
`;

// 置顶
export const toolbarGotopHtml = `
<div class="gotop-extra">
    <a onclick="window.scrollTo(0,0)"></a>
</div>
`;


//笔记弹窗
export const getToolbarNoteModal = function(cross){
    return `<div id="toolbarNoteDialog">
    <div class="m-dialog-bg"></div>
    <div class="m-dialog m-dialog-lg">
        <div class="wrap">
            <h5 class="title">
                <span>笔记</span>
                <i class="iconfont icon-global-Course2 close"></i>
            </h5>
            <div class="con con-iframe">
                <iframe src="${iframeBaseUrl}/auth/global/note/common/globalNote.htm?cross=${cross ? 1 : 0}"></iframe>
            </div>
        </div>
    </div>
</div>`;
};

//提问弹窗
export const getToolbarQuestionModal = function(cross){
    return `<div id="toolbarQuestionModal">
    <div class="m-dialog-bg"></div>
    <div class="m-dialog m-dialog-lg">
        <div class="wrap">
            <h5 class="title">
                <span>我要提问</span>
                <i class="iconfont icon-global-Course2 close"></i>
            </h5>
            <div class="con con-iframe">
                <iframe
                id="questionIframe" 
                src="${iframeBaseUrl}/page/doubt/pc/student/doubtDialog?cross=${cross ? 1 : 0}">
                </iframe>
            </div>
        </div>
    </div>
</div>
`;};