const {webStyleConfig, nodeStyleConfig} = require('./styleConfig');
const getBabelConfig = require("../babel");
// const exclude = /node_modules(\/|\\)(?!@leke\/ssr)/
const exclude = /node_modules/;
const isProd = process.env.NODE_ENV === 'production';
const name = isProd ? 'img/[name]_[hash].[ext]' : 'img/[name].[ext]';
module.exports = function (target = 'web') {
    const rules = [
        {
            test: /\.(ts|tsx|js|jsx)?$/,
            use: [
                {
                    loader: "babel-loader",
                    options: getBabelConfig(target)
                },

            ],
            exclude
        },
        {
            test: /\.(png|jpe?g|gif|svg|mp3)(\?.*)?$/,
            loader: 'file-loader',
            options: {
                name,
                emitFile: target === 'web'
            }
        }
    ];
    return rules.concat(target === 'web' ? webStyleConfig : nodeStyleConfig);
};