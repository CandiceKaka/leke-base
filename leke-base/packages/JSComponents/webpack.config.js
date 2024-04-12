const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const componentsArr = require('./entry-arr');
const obj = {};
for(let i=0;i< componentsArr.length;i++){
    const key = componentsArr[i];
    obj[key] =  path.resolve(`./src/${key}/index.ts`);
}
module.exports = {
    mode: "production",
    entry: obj,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].min.js",
        library: "[name]",
        libraryTarget: "umd",
        libraryExport: "default",
        globalObject: "this",
    },
    target: ["web", "es5"],
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
                test: /\.html$/,
                loader: "raw-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
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
                    "less-loader",
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,//不将注释提取到单独的文件中
            }),
        ],
    },
    plugins: [
        //添加注释
        new webpack.BannerPlugin({
            banner:'源码地址：https://gitlab.leke.cn/frontend/fe-basics/leke-base/packages/JSComponents'
        }),
    ],
};
