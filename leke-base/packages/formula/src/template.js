import html from './template.html';

const jmeMath = [
    {
        title:'公式',
        x:0,
        y:0,
        list:[
            "\\frac{}{}","^{}/_{}","\\newSup{}{}","\\newSub{}{}","\\newSupSub{}{}{}","\\bar{}",
            "\\sqrt{}","\\nthroot{}{}","\\sum^{}_{}","\\log_{}","\\int_{}^{}","\\oint_{}^{}",
            "\\overrightarrow{}"
        ]
    },
    {
        title:'符号',
        x:0,
        y:-56,
        list:[
            "+","-","\\pm","\\times","\\div","\\ast","/","\\bigtriangleup",
            "=","\\ne","\\approx",">","<","\\ge","\\le","\\infty",
            "\\cap","\\cup","\\because","\\therefore","\\supset","\\subset","\\supseteq","\\subseteq",
            "\\nsupseteq","\\nsubseteq","\\in","\\ni","\\notin","\\mapsto","\\leftarrow","\\rightarrow",
            "\\Leftarrow","\\Rightarrow","\\leftrightarrow","\\Leftrightarrow","\\perp","\\circ",
            "\\bigotimes","\\bigodot","\\angle","\\measuredangle","\\lbrace","\\rbrace","[","]",
            "(",")"
        ]
    },
    {
        title:"字母",
        x:0,
        y:-(56+32+32+24+12+32+12),
        list:[
            "\\alpha","\\beta","\\gamma","\\delta","\\varepsilon","\\varphi","\\lambda","\\mu",
            "\\rho","\\sigma","\\omega","\\Gamma","\\Delta","\\Theta","\\Lambda","\\Xi",
            "\\Pi","\\Sigma","\\Upsilon","\\Phi","\\Psi","\\Omega","\\pi","\\theta"
        ]
    }
];
export default function () {
    const w=32+12;
    const mathHtml=jmeMath.reduce((result,item)=>{
        const {list,x,y}=item;
        result+="<ul class='mathIcon'>";
        list.forEach((o,index)=>{
            const X=x-index%19*w;
            const Y=y-Math.floor(index/19)*w;
            result += `<li data-latex="${list[index]}" style="background-position:${X}px ${Y}px;"></li>`;
        });
        result+="</ul>";
        return result;
    },'');
    return html.replace('{mathTemplate}',mathHtml);
}