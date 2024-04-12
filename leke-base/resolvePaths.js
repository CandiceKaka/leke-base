const tsconfig=require('./tsconfig.json');
const {paths}=tsconfig.compilerOptions;
const path=require('path');
module.exports=function (publicPath) {
    const moduleNameMapper={};
    for(let key in paths){
        moduleNameMapper[key]=path.join(publicPath,paths[key][0]);
    }
    return moduleNameMapper;
};