if(process.env.WEB){
    module.exports=require('./lib/web-start');
}else{
    module.exports=require('./lib/node-start');
}