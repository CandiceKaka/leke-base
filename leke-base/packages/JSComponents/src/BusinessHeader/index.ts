/*
 * @Author: taolixia 
 * @Date: 2021-08-09 14:39:47 
 * @Last Modified by: taolixia
 * @Last Modified time: 2021-08-28 21:47:53
 */
import {BusinessHeaderProps} from './type';
import { getUserInfo } from "./fetch";
import { reSetMeta } from "./utils";
import Header from "./components/header";
import Toolbar from "./components/toolbar";
import _ from "lodash";


export interface jsBusinessHeaderProps extends BusinessHeaderProps {
    el: HTMLElement;
    leke?:{
        user:{
            currentRoleId:number,
            currentSchoolNature:number
        }
    };
}
const defaultOps: jsBusinessHeaderProps = {
    el: typeof window!=='undefined'?document.querySelector('body'):null,
    onlyShowToolbar:false,
    projectName: "",
    icon: "",
    title: "",
    extraTitle: "",
    activeKey: "",
    defaultSubs: true,
    hide: false,
    hideToolbar: false,
    hidePhoto: true,
    fullScreen: false,
    hideSecondary: false,
    roleId:100
};

class BusinessHeader  {
    props:jsBusinessHeaderProps;
    userReady:boolean;
    leke:object;
    header:any;
    constructor(props={}) {
        this.props = {
            ...defaultOps,
            ...props
        };
        this.leke = {};
        //重置meta标签参数
        reSetMeta();
        this.render();
    }
    async initData(){
        const {  projectName, saveUserInfo } = this.props;
        const res = await getUserInfo(projectName);
        let Leke:any = {};
        Leke.domain = {
            payServerName: "https://pay.leke.cn",
            learnServerName: "https://learn.leke.cn",
            tutorServerName: "https://tutor.leke.cn",
            mainDomain: "leke.cn",
            wrongtopicServerName: "https://wrongtopic.leke.cn",
            tesolServerName: "http://tesol.sclass.cn",
            helpServerName: "https://help.leke.cn",
            fileServerName: "https://file.leke.cn",
            videoServerName: "https://video.leke.cn",
            crmServerName: "https://crm.leke.cn",
            eduplanServerName: "https://eduplan.leke.cn",
            noteServerName: "https://note.leke.cn",
            chatServerName: "https://chat.leke.cn",
            incentiveServerName: "https://incentive.leke.cn",
            casServerName: "https://cas.leke.cn",
            questionServerName: "https://question.leke.cn",
            homeworkServerName: "https://homework.leke.cn",
            noticeServerName: "https://notice.leke.cn",
            diagServerName: "https://diag.leke.cn",
            classServerName: "class.leke.cn",
            lekeServerName: "https://www.leke.cn",
            paperServerName: "https://paper.leke.cn",
            supportServerName: "https://support.leke.cn",
            mallServerName: "https://mall.leke.cn",
            lessonServerName: "https://lesson.leke.cn",
            indexServerName: "https://index.leke.cn",
            staticServerName: "https://static.leke.cn",
            resourceServerName: "https://resource.leke.cn",
            repositoryServerName: "https://repository.leke.cn",
            beikeServerName: "https://beike.leke.cn",
            monitorServerName: "https://monitor.leke.cn",
            fsServerName: "https://fs.leke.cn",
            sclassServerName: "http://www.sclass.cn",
            courseServerName: "https://course.leke.cn",
            homeServerName: "https://home.leke.cn",
            rateServerName: "https://rate.leke.cn",
            voiceServerName: "https://voice.leke.cn",
            casDomain: "leke.cn,sclass.cn",
            cloudServerName: "https://cloud.leke.cn",
            userServerName: "https://user.leke.cn",
            paikeServerName: "https://paike.leke.cn",
            rtmpServerName: "rtmp://vod1.leke.cn/vod",
            onlineServerName: "http://onlineclass.leke.cn",
        };
        const datas:any = res;
        Leke.assets = datas.assets;
        Leke.context = datas.context;
        Leke.device = datas.device;
        Leke.locale = datas.locale;
        Leke.spm = datas.spm;
        Leke.ticket = datas.ticket;
        Leke.user = datas.user;
        saveUserInfo && saveUserInfo(Leke);
        // this.userReady = true;
        this.leke = Leke;
        this.render();
    };
    rendertoolbar(){
        const { el, onlyShowToolbar } = this.props;
        if(onlyShowToolbar){
            require('./components/toolbar.less');
            new Toolbar({
                el,
                ...this.props,
                leke:{
                    user:{
                        currentRoleId:this.props.roleId
                    }
                }
            });
        }
    }
    render(){
        if(typeof window === "undefined")return;
        const { hide,el,onlyShowToolbar} = this.props;
        if(onlyShowToolbar){
            return this.rendertoolbar();
        }
        const { leke } = this;
        if(hide&&!el)return;
        if(leke&&leke['user']){
            el.innerHTML=null;
            this.header = new Header({leke,...this.props,el});
        }else{
            this.initData();
        }
    }
    onReRender(nextProps?){
        const $curProps = {...this.props,el:null};
        if(_.isEqual(nextProps, $curProps))return;
        if(nextProps){
            this.props = {...this.props,...nextProps};
        }
        this.render();
    }

    
}

export default BusinessHeader;