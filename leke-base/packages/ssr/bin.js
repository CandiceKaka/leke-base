#!/usr/bin/env node
const {argv}=process;
const arg=argv[2];

if(arg==='build'){
    require('./build/build');
}else{
    if(arg==='debug'){
        const inspector=require('inspector');
        inspector.open('9292','127.0.0.1');
    }
    require('./build/devServer');
}