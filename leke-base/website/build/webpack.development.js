const webpack=require('webpack');
const baseConfig=require('./webpack.base');
const {merge}=require('webpack-merge');

module.exports=merge(baseConfig,{
    mode:'development',
    devtool: 'eval-source-map',
    output: {
        filename:'js/[name].js',
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port:3333,
        host: '0.0.0.0',
        hot:true,
        compress:true,
        historyApiFallback:true,
        disableHostCheck: true,
        proxy: {
            "/auth": {
                target: "https://webapp.leke.cn",
                changeOrigin: true,
            },
            // context: ['/auth', '/proxy'],
            // target: 'https://webapp.leke.cn',
            // changeOrigin: true
        }
    }
});