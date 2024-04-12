const path=require('path');
const webpack=require('webpack');
const MFS=require('memory-fs');
const vm=require('vm');
const webpackDevServer=require('webpack-dev-server');
const {clientConfig,serverConfig}=require('./webpack/webpack.dev.config.js');
const cluster=require('cluster');
const cookieParser=require('cookie-parser');
const {devServer}=require('./resolveConfig');

if (cluster.isMaster){
    let render;
    cluster.fork();
    cluster.on('message', (worker, renderStr, handle) => {
        const sandbox = {
            console,
            module,
            require
        };
        vm.runInNewContext(renderStr, sandbox);
        render = sandbox.module.exports.default;
    });

    const clientCompiler = webpack(clientConfig);
    const options={
        publicPath:clientConfig.output.publicPath,
        ...devServer,
        before(app){
            if(typeof devServer.before==='function'){
                devServer.before.apply(null,arguments);
            }
            const jsonPath=path.join(clientCompiler.outputPath, 'resource.json');
            const fs=clientCompiler.outputFileSystem;
            app.use(cookieParser());
            app.use((req, res,next) => {
                if(render&&fs.existsSync(jsonPath)){
                    const jsonString=fs.readFileSync(jsonPath);
                    render(req, res,next, JSON.parse(jsonString));
                }
            });
            app.use(function(err, req, res, next) {
                console.log(err);
                res.setHeader('Content-Type', 'text/plain;charset=utf-8');
                let {status,config,headers}=err;
                if(config&&headers){ //接口请求失败
                    return res.status(500).end(`request failed to ${config.url}`);
                }
                if(status===404){
                    return res.status(404).end('匹配不到路由');
                }
                res.status(500).end(err.toString());
            });
        }
    };
    const server=new webpackDevServer(clientCompiler,options);

    server.listen(devServer.port,devServer.host);

    process.on('uncaughtException', function (err) {
        console.log(err);
    });
}else{
    const mfs = new MFS();
    const serverCompiler = webpack(serverConfig);
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) return console.error(err);
        const renderStr = mfs.readFileSync(path.join(serverConfig.output.path, serverConfig.output.filename), 'utf-8');
        process.send(renderStr);
    });
}