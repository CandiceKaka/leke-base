import React, { Component } from "react";
import Header from "./components/Header";
import PropTypes from "prop-types";
import { getUserInfo } from "./fetch";
import { userInfo } from "./utils";

userInfo();

interface Props{
    projectName?:string;
    saveUserInfo?:(params:any)=>void;
    hide?:boolean;
}

interface State{
    userReady:boolean;
    leke?:any;

}

export default class BusinessHeader extends Component<Props,State> {
    constructor(props) {
        super(props);
        this.state = {
            userReady: false,
        };
    }

    static propTypes = {
        projectName: PropTypes.string.isRequired, //项目名称，用户获取用户信息数据请求
        saveUserInfo: PropTypes.func, //用于提供用户信息,每个项目可以单独存储数据
        hide: PropTypes.bool, //控制业务头是否展示
    };
    
    static defaultProps = {
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
    };

    componentDidMount() {
        // 请求用户信息
        this.fetchData();
    }

  fetchData = async () => {
      const { projectName, saveUserInfo } = this.props;
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
      this.setState({
          userReady: true,
          leke: Leke,
      });
  };

  render() {
      const { hide } = this.props;
      const { userReady, leke } = this.state;
      return !hide && userReady ? <Header {...this.props} leke={leke} /> : null;
  }
}


