const gulp = require('gulp');
const {buildTs}=require('@leke/gulp-compile');
const tsEntry='src/*.ts';
exports.default = ()=>buildTs({stream:gulp.src(tsEntry),outDir:'lib',modules:'commonjs'});