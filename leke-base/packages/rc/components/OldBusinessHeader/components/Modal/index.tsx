import React,{Component} from 'react';
import ReactDOM from 'react-dom';

interface Props{
    visible?:boolean;
    size?:string;
    title?:string;
    iframe?:any;
    onCancel?:()=>void;
}

interface State{
    visible:boolean;
    size?:string;
    title?:string;
    iframe?:any;
}

export default class Modal extends Component<Props,State>{
    modal:any;
    constructor(props){
        super(props);
        this.state = {
            visible: this.props.visible,
            size: this.props.size,
            title: this.props.title,
            iframe: this.props.iframe,
        };
    }

    componentDidUpdate(prevProps, prevState){
        // first show
        if(!this.modal && this.props.visible !== prevProps.visible){
            if (typeof window !== 'undefined') {
                this.modal = document.createElement('div');
                document.body.appendChild(this.modal);
            }
        }
        if(this.props.visible !== prevProps.visible){
            this.setState({ visible: this.props.visible });
        }
        if(this.state.visible !== prevState.visible){
            this.renderModal();
        }
    }

    componentWillUnmount(){//在组件卸载的时候，保证弹层也被卸载掉
        if(this.modal){
            ReactDOM.unmountComponentAtNode(this.modal);
            if (typeof window !== 'undefined') {
                document.body.removeChild(this.modal);
            }
        }
    }

    // 关闭弹窗
    close=()=>{
        const { onCancel } = this.props;
        !!onCancel && onCancel();
    }

    renderModal(){ //将弹层渲染到body下的div标签
        const { visible, size, title, iframe } = this.state;
        const modal = visible?(
            <div className="m-dialog-bg">
                <div className={`m-dialog ${!!size ? 'm-dialog-'+size : ''}`}>
                    <div className="wrap">
                        <h5 className="title">
                            <span>{ title }</span>
                            <i className="iconfont icon-global-Course2 close" onClick={()=>this.close()}></i>
                        </h5>
                        <div className={`con
                                         ${!!size && !iframe ? 'con-'+size : ''}
                                         ${!!iframe ? 'con-iframe' : ''}`}>
                            { this.props.children }
                        </div>
                    </div>
                </div>
            </div>
        ):null;
        ReactDOM.render(modal, this.modal);
    }

    render(){
        return null;
    }
}
