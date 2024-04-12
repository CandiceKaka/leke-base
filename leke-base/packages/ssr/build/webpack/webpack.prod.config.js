const webpack=require("webpack");
const baseWebpackConfig=require('./webpack.base.config');
const {merge}=require('webpack-merge');
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CssMinimizerPlugin=require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ResourcePlugin=require('./resource-plugin');
const getRules=require('./getRules');
const {resolveEntry,webpackConfig}=require('../resolveConfig');
const {clientName,serverName}=require('../static');

const clientConfig = merge(baseWebpackConfig, {
    mode: 'production',
    entry: {[clientName]:resolveEntry('core-js')},
    devtool:false,
    output: {
        filename: 'js/[name].[chunkhash].js',
    },
    target:['web','es5'],
    optimization: {
        minimize:true,
        runtimeChunk: "single",
        moduleIds:'deterministic',
        chunkIds:'deterministic',
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true
            })
        ]
    },
    module: {
        rules: getRules()
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify('production'),
            "process.env.WEB": JSON.stringify(true)
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            ignoreOrder: true
        }),
        new ResourcePlugin()
    ]
});

const serverConfig = merge(baseWebpackConfig,{
    mode:'production',
    entry: {[serverName]:resolveEntry()},
    devtool:false,
    output: {
        filename: `${serverName}.js`,
        libraryTarget: "commonjs2"  // 打包成commonjs2规范
    },
    optimization: {
        minimize:true
    },
    node: {
        __dirname: true,
        __filename:true
    },
    module: {
        rules: getRules('node')
    },
    plugins:[
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify('production'),
            "process.env.WEB": JSON.stringify(false)
        }),
    ],
    target: "node",  // 指定node运行环境
    externals: ['react','react-dom','axios','qs']
});

if(typeof webpackConfig==='function'){
    webpackConfig(clientConfig);
    webpackConfig(serverConfig);
}
exports.clientConfig=clientConfig;
exports.serverConfig=serverConfig;