const gulp = require('gulp');
const {buildTs,buildLess,createStream}=require('@leke/gulp-compile');
const glob = require('glob');
const path = require('path');
const tsEntry=["components/*/*.{tsx,ts}","components/*/!(__test__|demos)/**/*.{tsx,ts}",'components/*.ts'];
const lessEntry=['components/**/*.less','less/base.less'];

function createIndexStream(){
    const base=path.resolve(__dirname,'./style');
    const code=glob.sync('./*/index.less',{cwd:base}).map(filePath=>{
        return `@import "${filePath}";`;
    }).join('\n');
    return createStream({
        base,
        path:path.join(base,'index.less'),
        code
    });
}
exports.default = gulp.parallel(
    ()=>buildTs({stream:gulp.src(tsEntry),outDir:'es',modules:false}),
    ()=>buildTs({stream:gulp.src(tsEntry),outDir:'lib',modules:'commonjs'}),
    gulp.series(
        ()=>gulp.src(lessEntry).pipe(gulp.dest('style')),
        ()=>createIndexStream().pipe(gulp.dest('style')),
    ),
    gulp.series(
        ()=>buildLess({stream:gulp.src(lessEntry),outDir:'style'}),
        ()=>buildLess({stream:createIndexStream(),outDir:'style'})
    )
);