const path = require('path');
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
    mode: 'production',
    devtool: false,
    entry: {Formula:path.resolve(__dirname, 'src', 'index.js')},
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
    }
};