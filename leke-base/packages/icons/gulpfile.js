const gulp = require('gulp');
const {svgToTsx,getComponentName} = require('./utils');
const glob = require('glob');
const path = require('path');
const {buildTs,createStream} = require('@leke/gulp-compile');

const svgPath="svg/*.svg";
function createIndexStream(outDir){
    const code=glob.sync(svgPath).map(filePath=>{
        const basename=getComponentName(path.basename(filePath,path.extname(filePath)));
        return `export {default as ${basename}} from ${JSON.stringify('./'+basename)}`;
    }).join('\n');
    const base=path.join(__dirname,outDir);
    return createStream({
        base,
        path:path.join(base,'index.ts'),
        code
    });;
}
function svgStream(){
    return gulp.src(svgPath).pipe(svgToTsx());
}
exports.default=gulp.series(
    gulp.parallel(
        ()=>buildTs({stream:svgStream(),outDir:'es',modules:false}),
        ()=>buildTs({stream:svgStream(),outDir:'lib',modules:'commonjs'})
    ),
    gulp.parallel(
        ()=>buildTs({stream:createIndexStream('es'),outDir:'es',modules:false}),
        ()=>buildTs({stream:createIndexStream('lib'),outDir:'lib',modules:'commonjs'})
    )
);