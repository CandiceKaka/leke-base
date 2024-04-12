import React, { PureComponent } from 'react';
interface Props{
    roleId?:number;
    title?:string;
    isLoaded?:boolean;
}
interface State{
    list:any[];
}
class Secondary extends PureComponent<Props,State>{
    constructor(props){
        super(props);
        this.state = {
            list: []
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.isLoaded && this.props.isLoaded !== prevProps.isLoaded) {
            const { roleId } = this.props;
            if (!window['getBusinessTeacherMenu']) return;
            const list = window['getBusinessTeacherMenu'](roleId) || [];
            this.updateList(list);
        }
    }
    updateList = (list) => {
        this.setState({ list });
    };

    render(){
        const { title } = this.props;
        const module = (
            <div className="secondary" id='secondary'>
                {this.state.list.length &&
                    this.state.list.map((item, index) => {
                        return (
                            <a className={`item ${title === item.title ? 'active' : ''}`}
                                href = { item.url }
                                key = { index }
                            >
                                { item.title }
                            </a>
                        );
                    })}
            </div>
        );

        return module;
    }
}

export default Secondary;