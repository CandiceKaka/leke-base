const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path=require('path');
const resolvePaths=require('../../resolvePaths');

module.exports ={
    entry:{
        'index': path.resolve(__dirname, "../src/index.tsx"),
        'mobile': path.resolve(__dirname, "../src/mobileIndex.tsx")
    },
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    resolve: {
        fallback: { "path": false },
        extensions: ['.ts','.tsx','.js','.jsx'],
        alias: {
            ...resolvePaths(path.resolve(__dirname,'../../')),
            "@leke/rc":path.resolve(__dirname,'../../packages/rc'),
            "@leke/mobile":path.resolve(__dirname,'../../packages/mobile'),
            "@leke/http":path.resolve(__dirname,'../../packages/http/src/index.ts')
        }
    },
    module: {
        rules:[
            {
                test: /node_modules(\/|\\)vfile(\/|\\)core\.js/,
                use: [{
                    loader: 'imports-loader',
                    options: {
                        type: 'commonjs',
                        imports: ['single process/browser process'],
                    },
                }],
            },
            // {
            //     test: /\.tsx?$/,
            //     loader: 'ts-loader',
            //     exclude: /node_modules/
            // },
            {
                test: /\.j|tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.md$/,
                loader: path.resolve(__dirname,'./markdown-loader.js')
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:path.join(__dirname,'../index.html'),
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename:'mobile.html',
            template:path.join(__dirname,'../mobile.html'),
            chunks: ['mobile']
        })
    ]
};