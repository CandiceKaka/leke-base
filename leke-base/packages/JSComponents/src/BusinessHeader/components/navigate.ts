/*
 * @Author: taolixia 
 * @Date: 2021-08-09 14:39:47 
 * @Last Modified by: taolixia
 * @Last Modified time: 2021-08-18 21:03:52
 */
import {jsBusinessHeaderProps} from '../index';
import {str2dom} from '../../../../AV/src/tools/dom';
import {getNavHtml,getNavMenuHtml,getNavSelectHtml} from './html';
import jsonp from 'jsonp';
class NavigateContainer  {
    props:jsBusinessHeaderProps;
    $navContainer:Element
    $navSecondContainer:Element
    constructor(props) {
        this.props = props;
        let self = this;
        this.render();
        // 引入静态资源配置
        if(!window['getBusinessDefaultMenu']){
            const businessHeaderDataJs = document.querySelector('#businessHeaderDataJs');
            if(businessHeaderDataJs){
                businessHeaderDataJs.replaceWith('');
            }
            const script = document.createElement('script');
            script.id = 'businessHeaderDataJs';
            script.src = 'https://static.leke.cn/datas/business-header-data.js?_t='+new Date().getTime();
            script.onload = () => {
                self.renderSubs();
            };
            document.head.appendChild(script);
        }else{
            this.renderSubs();
        }  
    }
    render(){
        const {el,extraTitle,title} = this.props;
        const iconClass = this.iconClass();
        const navHTML = getNavHtml(title,extraTitle,iconClass);
        this.$navContainer = str2dom(navHTML)[0];
        this.$navSecondContainer = this.$navContainer.querySelector('.c-businesshead__img');
        el&&el.appendChild(this.$navContainer);
    }
    /**
     * 渲染二级子标题
     */
    renderSecondary = () => {
        const {leke,hideSecondary,title} = this.props;
        const { currentSchoolNature,currentRoleId } = leke.user;
        if(currentRoleId === 101 && currentSchoolNature === 1&&!hideSecondary){
            if(window['getBusinessTeacherMenu']){
                const list = window['getBusinessTeacherMenu'](currentRoleId) || [];
                this.$navSecondContainer&&this.$navSecondContainer.appendChild(str2dom(getNavSelectHtml(list,title))[0]);
            }
        }
    }
    renderSubs(){
        this.renderSecondary();
        const { leke, icon, subs } = this.props;
        if(!icon)return;
        const { currentRoleId } = leke.user;
        let currentSubs = [], defaultSubs = [];
        const getMenuFun = () => {
            if(window['getBusinessDefaultMenu']){
                // 获取默认的子标题配置
                window['getBusinessDefaultMenu'](leke)[icon].map((item) => {
                    if (item.roleId === currentRoleId) {
                        defaultSubs = item.menus;
                    }
                    return null;
                });
            }
            if(subs !== undefined){
                if(subs.length === 0){
                    currentSubs = [];
                }else{
                    // 传入的配置项中是否有当前的角色id
                    let hasRoleId = false;
                    subs.map(item => {
                        if(typeof item.roleId === 'number'){
                            if(item.roleId === currentRoleId){
                                hasRoleId = true;
                                if(item.menus instanceof Array){
                                    // 设置当前子标题(默认-进行数组合并，非默认-全部使用自定义配置)
                                    currentSubs = this.props.defaultSubs ? this.concatArray(defaultSubs, item.menus) : item.menus;
                                }else{
                                    throw new Error('menus必须为Array类型');
                                }
                            }
                        }else{
                            throw new Error('roleId必须为Number类型');
                        }
                    });
                    if(!hasRoleId){
                        if (typeof window !== 'undefined') {
                            window.location.href = 'https://static.leke.cn/pages/noAccess.html';
                        }
                        // throw new Error('传入的自定义配置项中没有当前角色的配置项');
                    }
                }
            }else{
                currentSubs = defaultSubs;
            }
            if(currentSubs&&currentSubs.length){
                const sub = [];
                currentSubs.map((item)=>{
                    item.roleId === currentRoleId && item.menus.map((menu)=>{
                        if(!!menu.data){
                            jsonp(menu.data, null, (err, data) => {
                                if (err) {
                                    console.error(err.message);
                                } else {
                                    let num = data.datas.num > 99 ? '99+' : data.datas.num;
                                    let item = {
                                        key: menu.key,
                                        num: num,
                                    };
                                    sub.push(item);
                                    // this.state.sub = [...sub];
                                }
                            });
                        }
                    });
                });
                const $NavMenuHtml = str2dom(getNavMenuHtml(currentSubs,this.getMenuClass.bind(this),sub))[0];
                this.$navContainer&&this.$navContainer.appendChild($NavMenuHtml);
            }
        }; 
        getMenuFun();
    }
    /**
     * 默认配置和传入配置进行数组合并并去重
     * 去重规则：传入配置中有默认配置中相同的key时，使用传入配置
    */
     concatArray = (defaultSubs, newSubs) =>{
         let oldSubs = Array.from(defaultSubs);
         oldSubs.map((defaultItem:any, i)=>{
             newSubs.map((newItem, j)=>{
                 if(defaultItem.key === newItem.key){
                     oldSubs[i] = newSubs[j];
                 }
             });
         });
         return oldSubs;
     }

     /**
     * 判断是否当前子标题是否选中
     * menu: 子标题数组
    */
     getMenuClass (menu){
         if (typeof window !== 'undefined') {
             const style = 'hoverclick';
             if(this.props.activeKey === menu.key){
                 return style;
             }else if(window.location.href === menu.url){
                 return style;
             }
             // 判断menu调用的是自定义或者配置项
             if(menu.defaultActive !== undefined){
                 return menu.defaultActive ? style : '';
             }
             if(menu.urls !== undefined && menu.urls.constructor === Array){
                 let active = false;
                 menu.urls.map( item =>{
                     window.location.href === item && ( active = true );
                 });
                 return active ? style : '';
             }
             return '';
                
            
         }
     }

     /**
     * 左侧标题图片class
     */
     iconClass(){
         const { hideSecondary,title,icon } = this.props;
         const { currentSchoolNature,currentRoleId} = this.props.leke.user;
         let style = '';
         if(icon && title ){
             style = `c-businesshead__${icon}`;
             if(currentRoleId === 101 && currentSchoolNature === 1 && !hideSecondary){
                 style = 'c-businesshead__menu';
             }
         }else{
             style = 'c-businesshead__default';
         }

         return style;
     }
}

export default NavigateContainer;