module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                modules:false,
                useBuiltIns:'usage',
                corejs:3
            }
        ],
        "@babel/preset-typescript",
        "@babel/preset-react"
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-proposal-class-properties',
        ["import", {
            libraryName: "@leke/rc",
            libraryDirectory: "components",
            camel2DashComponentName: false,
            style(name) {
                return `${name}/index.less`;
            }
        }],
        ["import", {
            libraryName: "@leke/mobile",
            libraryDirectory: "components",
            camel2DashComponentName: false,
            style(name) {
                return `${name}/index.less`;
            }
        },'mobile'],
    ]
};