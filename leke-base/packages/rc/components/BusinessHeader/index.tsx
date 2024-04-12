/*
 * @Author: taolixia 
 * @Date: 2021-08-10 15:11:31 
 * @Last Modified by: taolixia
 * @Last Modified time: 2021-08-28 21:50:15
 */

import React from 'react';
import {BusinessHeader as JSBusinessHeader} from '@leke/JSComponents';
import {BusinessHeaderProps} from './type';
class BusinessHeader extends React.PureComponent<BusinessHeaderProps> {
    $HeaderContainer:React.RefObject<HTMLDivElement>
    headerRef=null
    customHeader=null
    constructor(props){
        super(props);
        this.$HeaderContainer = React.createRef();
    }
    componentDidMount(){
        this.init();
    }
    componentDidUpdate(prevProps){
        this.onReRender();
    }
    getProps(){
        const $props = {...this.props};
        if($props.renderHeader){
            //直接渲染react组件
            $props['renderHeader']=()=>{
                return false;
            };
        }
        return $props;
    }
    init(){
        this.headerRef = new JSBusinessHeader({
            el:this.$HeaderContainer.current,
            ...this.getProps()
        });
    }
    onReRender(){
        if(this.headerRef){
            this.headerRef.onReRender({...this.getProps()});
        }else{
            this.init();
        }
    }
    public render() {
        const RHeader = this.props.renderHeader;
        const fullScreen = this.props.fullScreen;
        return (
            <>
                <div style={{display:RHeader?'none':'block'}} ref={this.$HeaderContainer} />
                {RHeader?<div className="c-businesshead">
                    <div className={`c-businesshead__auto ${fullScreen ? 'c-businesshead__fullscreen' : ''}`}>
                        <RHeader/>
                    </div>
                </div>:null}
            </>
        );
    }
}
export default BusinessHeader;
