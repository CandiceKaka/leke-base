import React,{Component} from 'react';
import Navigator from '../Navigate';
import Toolbar from '../Toolbar';

interface Props{
    hidePhoto?:boolean;
    renderHeader?:any;
    fullScreen?:boolean;
    icon?:string;
    title?:string;
    extraTitle?:string;
    subs?:any;
    leke?:any;
    activeKey?:number;
    hideSecondary?:boolean;
    defaultSubs?:any;
    hideToolbar?:boolean;
}
interface State{
    userInfo_currentPhoto:string;
    currentUserName:string;
    currentSchoolId:number;
    hover:boolean;
}
export default class BusinessHeader extends Component<Props,State>{
    constructor(props){
        super(props);
        // let { currentPhoto, currentUserName, currentSchoolId } = JSON.parse(localStorage.getItem('Leke')).user;
        let { currentPhoto, currentUserName, currentSchoolId } = props.leke.user;
        this.state = {
            userInfo_currentPhoto: !!currentPhoto ? 'https://file.leke.cn'+currentPhoto : 'https://static.leke.cn/images/home/photo.png',	// 用户头像
            currentUserName,	// 用户名
            currentSchoolId: currentSchoolId,	// 学校类型id
            hover: false,	// 是否显示操作列表
        };
    }

    componentDidMount(){
        // 百度统计
        if (typeof window !== 'undefined') {
            let hm = window.document.createElement('script');
    		hm.src = 'https://hm.baidu.com/hm.js?1cc429d7f39859f7f65470f59284e944';
    		let s = document.getElementsByTagName('script')[0];
    		s.parentNode.insertBefore(hm, s);
        }
    }

    render(){
        const { userInfo_currentPhoto, currentUserName, currentSchoolId, hover } = this.state;
        const { hidePhoto,icon,title,extraTitle,fullScreen,subs,activeKey,hideSecondary,defaultSubs,hideToolbar,leke } = this.props;
        const RHeader =  this.props.renderHeader;
        const ownHeader = typeof RHeader ==='function';//是否使用自定义header
        const header = (
            <div className="c-businesshead">
                <div className={`c-businesshead__auto ${fullScreen ? 'c-businesshead__fullscreen' : ''}`}>
                    {/* 左侧业务tab */}
                    {
                        ownHeader ? <RHeader/> :<Navigator
    						icon={ icon }
    						title={ title }
    						extraTitle = { extraTitle }
    						subs={ subs }
                            activeKey = { activeKey }
    						leke={leke}
                            hideSecondary = { hideSecondary }
                            defaultSubs = { defaultSubs }
    					/>
                    }
                    {/* 右侧用户信息 */}
                    {
                        !hidePhoto ?
                            <div className="c-businesshead__person"
                                onMouseEnter={()=>this.setState({ hover: true })}
                                onMouseLeave={()=>this.setState({ hover: false })}
                            >
                                <div className="c-businesshead__headframe">
                                    <img src={ userInfo_currentPhoto } alt="" />
                                </div>
                                <div className="c-businesshead__choose">
                                    { currentUserName }
                                </div>
                                <i className="c-businesshead__showHidden"></i>
                                <div className={`c-businesshead__myselfcentre ${hover ? 'c-businesshead__myselfcentre-show':''}`}>
                                    <ul>
                                        <i></i>
                                        <li><a target="_blank" rel="noreferrer" href="https://tutor.leke.cn/auth/common/user/myDetail.htm">个人中心</a></li>
                                        <li><a target="_blank" rel="noreferrer" href={currentSchoolId !== -1?'https://cas.leke.cn/logout':'https://cas.leke.cn/logout?service=http://www.sclass.cn'}>退出登录</a></li>
                                    </ul>
                                </div>
                            </div> : ''
                    }
                </div>
                {
                    !hideToolbar && <Toolbar leke={leke}/>
                }
            </div>
        );

        return header;
    }
}
