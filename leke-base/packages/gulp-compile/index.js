const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require("gulp-typescript");
const merge2 = require('merge2');
const gulpLess = require('gulp-less');
const getBabelConfig = require('./getBabelConfig');
const Vinyl = require('vinyl');

function dest(stream,out){
    const output=Array.isArray(out)?out:[out];
    return output.reduce((stream,current)=>{
        return stream.pipe(gulp.dest(current));
    },stream);
}

function buildTs({outDir,modules,stream}){
    const tsResult = stream.pipe(ts({
        "allowSyntheticDefaultImports": true,
        "target": "ESNext",
        "module": "ESNext",
        "moduleResolution": "node",
        "jsx": "preserve",
        "skipLibCheck": true,
        "noImplicitAny": false,
        "declaration": true
    }));
    return dest(
        merge2(
            [
                tsResult.js.pipe(babel(getBabelConfig(modules))).pipe(gulp.dest(outDir)),
                tsResult.dts.pipe(gulp.dest(outDir))
            ]
        ),
        outDir
    );
}
exports.buildTs=buildTs;

exports.buildJs=function ({stream,outDir,modules}) {
    return dest(stream.pipe(babel(getBabelConfig(modules))),outDir);
};

exports.buildLess=function ({stream,outDir}) {
    return dest(stream.pipe(gulpLess()),outDir);
};

exports.getBabelConfig=getBabelConfig;

exports.createStream=function createStream(options){
    const {code}=options;
    delete options.code;
    const stream=require('stream').Readable({ objectMode: true });
    stream._read = function () {
        this.push(new Vinyl({
            ...options,
            contents: Buffer.from(code)
        }));
        this.push(null);
    };
    return stream;
};