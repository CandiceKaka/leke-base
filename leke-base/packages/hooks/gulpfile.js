const gulp = require('gulp');
const {buildTs}=require('@leke/gulp-compile');
const tsEntry=['src/!(demos|__test__)/*.ts','src/index.ts'];
exports.default = gulp.parallel(
    ()=>buildTs({stream:gulp.src(tsEntry),outDir:'es',modules:false}),
    ()=>buildTs({stream:gulp.src(tsEntry),outDir:'lib',modules:'commonjs'})
);