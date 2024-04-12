const babel=require('@babel/core');
const path=require('path');

module.exports={
    process(source,filename){
        const jsxMatch=source.match(/(?<=```jsx)([\s\S]*?)(?=```)/g);
        let jsxCode=jsxMatch?jsxMatch.join('\n'):'';
        jsxCode+=`export const filename=${JSON.stringify(path.basename(filename))}`;
        return babel.transformSync(jsxCode,{
            filename,
            "presets": [
                ["@babel/preset-env",{targets:{node:'current'}}],
                "@babel/preset-react"
            ]
        }).code;
    }
};