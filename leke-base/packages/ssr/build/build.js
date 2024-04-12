const webpack=require('webpack');
const {clientConfig,serverConfig}=require('./webpack/webpack.prod.config.js');
const cluster=require('cluster');
const rimraf=require('rimraf');
rimraf.sync(clientConfig.output.path);
if (cluster.isMaster){
    const workerClient=cluster.fork();
    const workerServer=cluster.fork();
    workerClient.send('client');
    workerServer.send('server');
    let n=0;
    cluster.on('message', (worker, message, handle) => {
        n++;
        n===2&&cluster.disconnect();
    });
}else{
    process.on('message', msg => {
        if(msg==='client'){
            webpack(clientConfig,(err,stats)=>{
                if(err){
                    console.log(err);
                }else{
                    process.stdout.write(stats.toString({
                        colors: true,
                        modules: false,
                        children: false,
                        chunks: false,
                        chunkModules: false
                    }) + '\n\n');
                }
                process.send('end');
            });
        }else{
            webpack(serverConfig,(err,stats)=>{
                if(err){
                    console.log(err);
                }else{
                    process.stdout.write(stats.toString({
                        colors: true,
                        modules: false,
                        children: false,
                        chunks: false,
                        chunkModules: false
                    }) + '\n\n');
                }
                process.send('end');
            });
        }
    });
}