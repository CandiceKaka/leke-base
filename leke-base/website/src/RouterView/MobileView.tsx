/**
 * @description 专门用于解析移动端文档
 * @author zhoujd@cnstrong.cn
 */

import React from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
    jsx,
    javascript,
    css,
} from "react-syntax-highlighter/dist/esm/languages/prism";
import gfm from "remark-gfm";
import "./index.less";
import ReactMarkdown from "react-markdown";
import classNames from "classnames";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("css", css);

interface propTypes {
  source: string;
  default?: React.FC;
  title?: string;
  description?: string;
}
function MarkdownView(props: propTypes) {
    const { default: JSXComponent, source, title } = props;
    function codeBlock({ value, language }: { value: string; language: string }) {
        
        if (language === "jsx" && JSXComponent) {
            return (
                <div className="code-highlighter">
                    <SyntaxHighlighter language={"jsx"} style={coy}>
                        {value}
                    </SyntaxHighlighter>
                </div>
            );
        }
        return (
            <SyntaxHighlighter language={language} style={coy}>
                {value}
            </SyntaxHighlighter>
        );
    }
    return (
        <section
            className={classNames("markdown-section", title ? "nav-section" : "")}
        >
            {!JSXComponent && title ? <h2>{title}</h2> : null}
            <ReactMarkdown
                plugins={[gfm]}
                source={source}
                escapeHtml={false}
                renderers={{
                    code: codeBlock,
                }}
            />
        </section>
    );
}

export default function MobileView({ data, name }) {
    return (
        <>
            {name && (
                <button
                    onClick={() => {
                        window.open("./mobile.html#" + name);
                    }}
                >
                  点击打开移动端展示
                </button>
            )}
            <div className="mobile-markdown-list">
                <div className="mobile-markdown-content">
                    {data.map((item, index) => item.title !== 'API' ? (
                        <MarkdownView key={index} {...item} />
                    ): null)}
                </div>
                {name && (
                    <div className="mobile-viewport">
                        <iframe
                            src={"./mobile.html#" + name}
                            width={300}
                            height={533.6}
                            frameBorder="none"
                        />
                    </div>
                )}
            </div>
            <div>
                {data.map((item, index) => item.title === 'API' ? (
                    <MarkdownView key={index} {...item} />
                ): null)}
            </div>
        </>
    );
}
