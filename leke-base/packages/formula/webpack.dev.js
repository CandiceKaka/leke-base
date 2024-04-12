const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssOptions=[
    "css-loader",
    {
        loader: "postcss-loader",
        options: {
            postcssOptions: {
                plugins: [
                    require("postcss-preset-env")({
                        browsers: ["last 2 versions"],
                        autoprefixer: {},
                    }),
                ],
            },
        },
    },
];
module.exports = {
    mode:'development',
    devtool: 'eval-source-map',
    entry: './index.js',
    target:['web','es3'],
    output: {
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        extensions: [".ts",".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/,/jquery-1\.8\.3\.min/]
            },
            {
                test: /\.html$/,
                use: ['raw-loader']
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: true,
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: cssOptions,
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    ...cssOptions,
                    "less-loader",
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:path.join(__dirname,'./index.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        port:8989,
        host: '0.0.0.0',
        hot:true,
        compress:true,
        historyApiFallback:true,
        disableHostCheck: true,
    }
};
