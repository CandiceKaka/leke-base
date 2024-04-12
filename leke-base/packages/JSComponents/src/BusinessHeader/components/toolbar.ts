/*
 * @Author: taolixia 
 * @Date: 2021-08-09 14:39:47 
 * @Last Modified by: taolixia
 * @Last Modified time: 2021-08-28 21:49:28
 */
import {jsBusinessHeaderProps} from '../index';
import {str2dom} from '../../../../AV/src/tools/dom';
import {getToolbarHtml,getToolbarNoteModal,getToolbarQuestionModal} from './html';
class Toolbar  {
    $Container:Element;
    $Note:Element;
    $noteDialog:Element;
    $Support:Element;
    $question:Element;
    $QuestionDialog:Element;
    props:jsBusinessHeaderProps;
    state:{
        noteVisible:boolean;
        questionVisible:boolean;
        show:boolean;
        goTopShow:boolean;
    }
    constructor(props) {
        this.props = props;
        this.state = {
            noteVisible:false,
            questionVisible:false,
            goTopShow:false,
            show:true,
        };

        // 监听属性变化
        let _State = {...this.state};
        let self = this;
        for(const i in this.state){
            Object.defineProperty(this.state, i, {
                get(){
                    return _State[i];
                },
                set(val){
                    if(_State[i] === val)return;
                    _State[i] = val;
                    self.watch(i,val);
                    return val;
                }
            });
        }
        this.render();
        this.init();
        this.bindEvent();
        
    }
    render(){
        const {el,leke} = this.props;
        const { user={currentRoleId:null} } = leke;
        const toolbarHtml = getToolbarHtml(user.currentRoleId);
        this.$Container = str2dom(toolbarHtml)[0];
        // const $goTop = str2dom(toolbarHtml)[1];
        this.$Note = this.$Container.querySelector('.note');
        this.$Support = this.$Container.querySelector('.support');
        this.$question = this.$Container.querySelector('.question');
        el.appendChild(this.$Container);
        // el.appendChild($goTop);
    }
    init(){
        //不能加，会导致一些场景报错 window.document.domain='leke.cn';
        if (this.isPC()) {
            this.widthChange();
            this.scrolling();
            window.onresize = () => {
                this.widthChange();
            };
            window.onscroll = () => {
                this.scrolling();
            };
            const self = this;
            window['TOOLBAR_DELEGATION'] = {
                questionSubmit: [],
                closeQuestionDialog: self.closeQuestionDialog.bind(self)
            };
            //新的提问弹窗
            window['closeExtracurricular'] = ()=>{
                this.closeQuestionDialog();
            };
        }
    }
    bindEvent(){
        // 点击笔记按钮
        this.$Note&&this.$Note.addEventListener('click',(e)=>{
            !this.state.noteVisible&&(this.state.noteVisible = true);
        });

        // 点击技术支持
        this.$Support&&this.$Support.addEventListener('click',(e)=>{
            this.openWindow();
        });

        // 点击我要提问
        this.$question&&this.$question.addEventListener('click',(e)=>{
            !this.state.questionVisible&&(this.state.questionVisible = true);
        });
    }
    // 监听窗口大小变化
    widthChange(){
        const { show } = this.state;
        const isThan = document.documentElement.clientWidth >= 1320;
        show !== isThan && (this.state.show=!show);
    };
    // 监听滚动条变化
    scrolling(){
        const { show, goTopShow } = this.state;
        if (typeof window !== "undefined") {
            if (
                document.documentElement.scrollTop * 2 >
            document.documentElement.scrollHeight &&
        !show
            ) {
                if(!goTopShow)this.state.goTopShow=true;
            } else {
                if(goTopShow)this.state.goTopShow=false;
            }
        }
    };
    isPC(){
        let flag = true;
        const userAgentInfo = navigator.userAgent;
        const Agents = [
            "Android",
            "iPhone",
            "SymbianOS",
            "Windows Phone",
            "iPad",
            "iPod",
        ];
        for (let v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > -1) {
                flag = false;
                break;
            }
        }

        return flag;
    };
    closeQuestionDialog(){
        this.state.questionVisible = false;
    };

    // 笔记弹窗隐藏
    noteCancel = () => {
        this.state.noteVisible=false;
    };
    // 我要提问弹窗隐藏
    questionCancel = () => {
        this.state.questionVisible=false;
    };
    // 打开小窗口
    openWindow = () => {
        window.open(
            "https://webapp.leke.cn/wisdom-online-support/index.html#/wisdomOnlineSup?title=" +
        document.title,
            "技术支持",
            "width=850,height=820,top=100, left=450,menubar=no,toolbar=no,status=no,scrollbars=yes,resizable=no,channelmode"
        );
    };
    
    watch(key,val){
        switch(key){
        case 'goTopShow':
            const $goTop = document.querySelector('.gotop-extra');
            if(val){
                $goTop['style'].display = 'block';
            }else{
                $goTop['style'].display = 'none';
            }
            break;
        case 'noteVisible':

            if(!document.querySelector('#toolbarNoteDialog')){
                const cross = typeof window !== 'undefined' && window.document.domain === 'leke.cn';
                const $dom = getToolbarNoteModal(cross);
                this.$noteDialog = str2dom($dom)[0];
                document.body.appendChild(this.$noteDialog);
                this.$noteDialog.querySelector('.close').addEventListener('click',()=>{
                    this.noteCancel();
                });
            }else{
                if(this.state.noteVisible){
                    this.$noteDialog['style'].display='block';
                }else{
                    this.$noteDialog['style'].display='none';
                }
            }
            
            break;
        case 'questionVisible':
            if(!document.querySelector('#toolbarQuestionModal')){
                const cross = typeof window !== 'undefined' && window.document.domain === 'leke.cn';
                const $dom = getToolbarQuestionModal(cross);
                this.$QuestionDialog = str2dom($dom)[0];
                document.body.appendChild(this.$QuestionDialog);
                this.$QuestionDialog.querySelector('.close').addEventListener('click',()=>{
                    this.questionCancel();
                });
            }else{
                if(this.state.questionVisible){
                    this.$QuestionDialog['style'].display='block';
                }else{
                    this.$QuestionDialog['style'].display='none';
                }
            }
            break;
        case 'show':
            if(this.state.show){
                this.$Container.children[0]['style'].display='block';
            }else{
                this.$Container.children[0]['style'].display='none';
            }
            break;
        default:
            break;
        }
    }
}

export default Toolbar;