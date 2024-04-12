/*
 * @Author: taolixia 
 * @Date: 2021-08-09 14:39:47 
 * @Last Modified by: taolixia
 * @Last Modified time: 2021-08-28 21:48:02
 */
import {jsBusinessHeaderProps} from '../index';
import {str2dom} from '../../../../AV/src/tools/dom';
import Navigate from './navigate';
import Toolbar from './toolbar';


class BusinessHeaderContainer  {
    props:jsBusinessHeaderProps;
    navigate=null
    toolBar=null
    // $container:Element;
    constructor(props) {
        this.props = props;
        this.render();
    }
    
    render(){
        require('../index.less');
        const {fullScreen,el,renderHeader,hideToolbar} = this.props;
        if(!hideToolbar){
            this.renderToolBar(document.querySelector('.c-businesshead__auto') ||document.body);
        }
        //直接渲染react组件
        if(typeof renderHeader==='function'&&!renderHeader()){
            return;
        }
        const $containerHtml = str2dom(`<div class="c-businesshead">
        <div class="c-businesshead__auto ${fullScreen ? 'c-businesshead__fullscreen' : ''}">
        </div>
        </div>`)[0];
        el.appendChild($containerHtml);
        const $box = $containerHtml.querySelector('.c-businesshead__auto');
        if(typeof renderHeader==='function'){
            //直接渲染原生dom
            $box.appendChild(renderHeader());
        }else{
            this.renderNavigate($box);
        }
    }
    renderNavigate(el){
        this.navigate = new Navigate({
            ...this.props,
            el,
        });
        
    }
    renderToolBar(el){
        this.toolBar = new Toolbar({
            ...this.props,
            el,
        });
    }

    
}

export default BusinessHeaderContainer;