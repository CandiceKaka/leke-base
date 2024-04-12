const baseWebpackConfig=require('./webpack.base');
const {merge}=require('webpack-merge');
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CssMinimizerPlugin=require('css-minimizer-webpack-plugin');

const postcssLoader={
    loader: 'postcss-loader',
    options: {
        postcssOptions:{
            plugins: [
                require('postcss-preset-env')({
                    browsers:['last 2 versions'],
                    autoprefixer:{}
                })
            ]
        }
    }
};
const buildConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        filename:'js/[name].[chunkhash].js',
        publicPath:'/leke-base/'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    postcssLoader
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    postcssLoader,
                    'less-loader'
                ]
            }
        ]
    },
    optimization: {
        minimize:true,
        runtimeChunk: "single",
        minimizer:[
            new CssMinimizerPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            ignoreOrder: true
        })
    ]
});
module.exports=buildConfig;