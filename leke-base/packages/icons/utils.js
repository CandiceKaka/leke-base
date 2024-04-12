const path = require('path');
const { Transform } = require('stream');
const SVGO = require('svgo');
const svgo=new SVGO({
    plugins: [
        {removeXMLNS:true},
        {
            removeAttrs: {attrs: ['class','width','height','fill','aria-hidden']},
        },
        {
            addAttributesToSVGElement:{
                attributes:[
                    {width:'1em'},
                    {height:'1em'},
                    {fill:'currentColor'},
                    {'aria-hidden':true}
                ]
            }
        }
    ]
});


function transformReactComponentString(data){
    return `import React from 'react'
import classNames from 'classnames'
export default React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>((props,ref)=>{
    return <i ref={ref} {...props} className={classNames('leke-icon',props.className)} >${data}</i>
})`;
}

function getComponentName(basename) {
    return basename.replace(/\b([a-z])/g,($0,$1)=>$1.toUpperCase()).replace('-','');
}
function resetFilePath(filePath,dirname=path.dirname(filePath)) {
    const basename = path.basename(filePath,'.svg');
    const filename = getComponentName(basename)+'.tsx';
    return path.join(dirname,filename);
}
function svgToTsx(){
    const stream = new Transform({ objectMode: true });

    stream._transform = (file, encoding, next) => {
        if (path.extname(file.path).toLowerCase() !== '.svg' || !file.contents.toString('utf8')) {
            return next(null, file);
        }

        if (file.isStream()) {
            return next(null, file);
        }

        if (file.isBuffer()) {
            svgo.optimize(file.contents.toString('utf8'), { path: file.path }).then(result => {
                file.contents = Buffer.from(transformReactComponentString(result.data));
                file.path = resetFilePath(file.path);
                return next(null, file);
            }).catch(error => {
                console.log(error);
                return next(null);
            });
        }
    };

    return stream;
}
exports.svgToTsx = svgToTsx;
exports.resetFilePath=resetFilePath;
exports.getComponentName=getComponentName;
