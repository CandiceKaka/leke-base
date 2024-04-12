const gulp = require('gulp');
const {buildTs}=require('@leke/gulp-compile');

exports.default = ()=>buildTs({stream:gulp.src('src/*.{ts,tsx}'),outDir:'lib',modules:'commonjs'});