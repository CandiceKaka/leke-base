const babel=require('@babel/core');
const config=require('../babel.config');

module.exports=function (source) {
    let code='';
    const jsxMatch=source.match(/(?<=```jsx)([\s\S]*?)(?=```)/g);
    if(jsxMatch){
        code+=jsxMatch[0];
        const cssMatch=source.match(/(?<=```css)([\s\S]*?)(?=```)/g);
        if(cssMatch){
            code+=`export const css = ${JSON.stringify(cssMatch[0])};`;
            source=source.replace(/```css([\s\S]*?)```/g,'');
        }
    }
    const introductionMatch=source.match(/(?<=---\s*\n)([\s\S]*?)(?=---)/g);
    if(introductionMatch){
        introductionMatch[0].replace(/^\s+|\s+$/g,'').split('\n').forEach(item=>{
            const o=item.split(':');
            code+=`export const ${o[0]} = ${JSON.stringify(o[1].replace(/^\s+|\s+$/g,''))};`;
        });
        source=source.replace(/---\s*\n([\s\S]*?)---/g,'');
    }
    code+=`export const source = ${JSON.stringify(source)};`;
    return babel.transform(code,{filename:this.resourcePath,...config}).code;
};