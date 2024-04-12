import React, { PureComponent, Fragment } from "react";
import Modal from "../Modal";



const iframeBaseUrl =
  typeof window !== "undefined" && window.location.hostname.includes("homework")
      ? ""
      : "https://webapp.leke.cn";



interface Props{
    leke?:any;
}
interface State{
    show:boolean;
    goTopShow:boolean;
    noteVisible:boolean;
    questionVisible:boolean;
    cross:number;
}
export default class Toolbar extends PureComponent<Props,State> {
    delegation:any;
    hasRegisterQuestionDialog:any;
    questionTimeout:number;
    constructor(props) {
        super(props);
        // const Leke = JSON.parse(localStorage.getItem('Leke'));
        const Leke = props.leke;
        this.state = {
            noteVisible: false, // 笔记弹窗是否显示
            questionVisible: false, // 我要提问弹窗是否显示
            cross:
        typeof window !== "undefined" &&
        window.document.domain === Leke.domain.mainDomain
            ? 1
            : 0,
            show: true, // 是否显示toolbar
            goTopShow: false, // 是否显示回到顶部
        };
        // 创建委托者
        if (typeof window !== "undefined") {
            let newWindow:any = window;
            this.delegation = newWindow.TOOLBAR_DELEGATION = {
                questionSubmit: [],
                closeQuestionDialog: this.closeQuestionDialog,
            };
        }
    }

    componentDidMount() {
        window.document.domain='leke.cn';
        if (this.isPC()) {
            this.widthChange();
            this.scrolling();
            if (typeof window !== "undefined") {
                window.onresize = () => {
                    this.widthChange();
                };
                window.onscroll = () => {
                    this.scrolling();
                };
            }
            (window as any).closeExtracurricular = ()=>{
                this.closeQuestionDialog();
            };
        }
    }

    isPC = () => {
        let flag = true;
        if (typeof window !== "undefined") {
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
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
        }
        return flag;
    };
    // 监听窗口大小变化
    widthChange = () => {
        const { show } = this.state;
        if (typeof window !== "undefined") {
            show !== document.documentElement.clientWidth >= 1320 &&
        this.setState({ show: document.documentElement.clientWidth >= 1320 });
        }
    };
    // 监听滚动条变化
    scrolling = () => {
        const { show, goTopShow } = this.state;
        if (typeof window !== "undefined") {
            if (
                document.documentElement.scrollTop * 2 >
            document.documentElement.scrollHeight &&
        !show
            ) {
                this.setState({ goTopShow: true });
            } else {
                goTopShow !== false && this.setState({ goTopShow: false });
            }
        }
    };

    closeQuestionDialog = () => {
        this.setState({ questionVisible: false });
    };

    //   watchQuestionDialog = () => {
    //       if (!this.state.questionVisible || this.hasRegisterQuestionDialog) {
    //           return;
    //       }
    //       setTimeout(() => {
    //       // 监听我要提问弹窗的按钮事件
    //           if (typeof window !== "undefined") {
    //               let iframe:any = document.getElementById("questionIframe");
    //               let loadFn = () => {
    //                   let iDom = iframe.contentWindow.document;
    //                   iDom.getElementById("jSubmitBtn").addEventListener("click", () => {
    //                       if (this.delegation.questionSubmit.every((cb) => cb() !== false)) {
    //                           this.closeQuestionDialog();
    //                       }
    //                   });
    //                   iDom.getElementById("jCancelBtn").addEventListener("click", () => {
    //                       this.closeQuestionDialog();
    //                   });
    //                   // 防止多次绑定按钮事件
    //               };
    //               if (iframe.contentWindow.document.getElementById("jSubmitBtn")) {
    //                   loadFn();
    //               } else {
    //                   iframe.onload = loadFn;
    //               }
    //           }
    //       }, 100);
    //       this.hasRegisterQuestionDialog = true;
    //   };

    //   componentDidUpdate(prevProps, prevState) {
    //         if (this.state.questionVisible !== prevState.questionVisible) {
    //             this.watchQuestionDialog();
    //         }
        
    //   }

    componentWillUnmount() {
        clearTimeout(this.questionTimeout);
    }

    // 笔记弹窗隐藏
    noteCancel = () => {
        this.setState({ noteVisible: false });
    };
    // 我要提问弹窗隐藏
    questionCancel = () => {
        this.setState({ questionVisible: false });
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
    render() {
        const { noteVisible, questionVisible, show, goTopShow } = this.state;
        // const Leke = JSON.parse(localStorage.getItem('Leke'));
        const Leke = this.props.leke;
        const roleId = Leke.user.currentRoleId;
        const toolbar = (
            <Fragment>
                <ul className={`c-sidebar ${show ? "" : 'hide'}`}>
                    {roleId === 100 || roleId === 101 ? (
                        <li
                            className={'note'}
                            onClick={() => this.setState({ noteVisible: true })}
                        >
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            ></a>
                        </li>
                    ) : (
                        ""
                    )}
                    <Modal
                        visible={noteVisible}
                        size={"lg"}
                        title={"笔记"}
                        iframe={true}
                        onCancel={this.noteCancel}
                    >
                        <iframe
                            src={
                                iframeBaseUrl +
                                "/page/note/pc/noteDialog"
                            }
                        ></iframe>
                    </Modal>
                    {roleId === 100 ? (
                        <li
                            className="question"
                            onClick={() => this.setState({ questionVisible: true })}
                        >
                            <a
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                            ></a>
                        </li>
                    ) : (
                        ""
                    )}
                    <Modal
                        visible={questionVisible}
                        size={"lg"}
                        title={"我要提问"}
                        iframe={true}
                        onCancel={this.questionCancel}
                    >
                        <iframe
                            id="questionIframe"
                            src={
                                iframeBaseUrl +
                            "/page/doubt/pc/student/doubtDialog"
                            }
                        ></iframe>
                    </Modal>
                    {roleId === 101 ? (
                        <li className="answer">
                            <a href="https://webapp.leke.cn/page/doubt/pc/teacher/doubtList"></a>
                        </li>
                    ) : (
                        ""
                    )}
                    <li className="mobile">
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        ></a>
                        <div className="tdc">
                            <div className="download">
                                <p>下载乐桃APP</p>
                            </div>
                            <div className="star">
                                <p>乐课网微讯</p>
                            </div>
                        </div>
                    </li>
                    <li className="support">
                        {/* <a href="https://static.leke.cn/pages/shortcut/technicalSupport.html" target="_blank"></a> */}
                        {/* <a href={"https://webapp.leke.cn/wisdom-online-support/index.html#/wisdomOnlineSup?title="+document.title} target="_blank"></a> */}
                        <a onClick={this.openWindow} target="_blank"></a>
                    </li>
                    <li className="helpCenter">
                        <a
                            href="https://tutor.leke.cn/auth/common/help/help.htm"
                            target="_blank"
                            rel="noreferrer"
                        ></a>
                    </li>
                    <li className="gotop">
                        <a onClick={() => window.scrollTo(0, 0)}></a>
                    </li>
                </ul>
                <div
                    className={`gotop-extra ${
                        goTopShow ? 'gotop-extra-show' : ""
                    }`}
                >
                    <a onClick={() => window.scrollTo(0, 0)}></a>
                </div>
            </Fragment>
        );
        return toolbar;
    }
}
