const path=require('path');
const {alias}=require('../resolveConfig');

module.exports=function (url,filePath) {
    const pathname=(()=>{
        for(let key in alias){
            if(url.indexOf(key+'/')===0){
                return alias[key]+url.replace(key,'');
            }
        }
        return path.resolve(path.dirname(filePath),url);
    })();
    const relativePath=path.relative(process.cwd(),pathname);
    return Buffer.from(relativePath,'utf8').toString('hex');
};
