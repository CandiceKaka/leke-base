const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {cssModules,modifyVars,postcssConfig,browsers}=require('../resolveConfig');
const postcssPresetEnv=require('postcss-preset-env');

const modulesOption={
    localIdentName: '[local]_[hash:base64:5]',
    auto(filename) {
        return filename.indexOf('node_modules')===-1;
    }
};
const lessConfig={
    loader: "less-loader",
    options: {
        lessOptions:{
            modifyVars,
            javascriptEnabled: true
        }
    }
};
const config={
    postcssOptions: {
        plugins: [
            postcssPresetEnv({browsers,autoprefixer:{}})
        ]
    }
};
if(typeof postcssConfig==='function'){
    postcssConfig(config);
}
const postcss={loader:'postcss-loader',options:config};
const webCSSConfig=[
    {
        loader: MiniCssExtractPlugin.loader
    },
    {
        loader: 'css-loader',
        options: {modules:cssModules===true?modulesOption:cssModules}
    },
    postcss
];
const webStyleConfig = [
    {
        test: /\.css$/,
        use: webCSSConfig
    },
    {
        test: /\.less$/,
        use: [
            ...webCSSConfig,
            lessConfig
        ]
    }
];
const nodeCssConfig=[
    {
        loader: 'css-loader',
        options: {modules:{...modulesOption,exportOnlyLocals: true}}
    }
];
const nodeStyleConfig = [
    {
        test: /\.css$/,
        use: nodeCssConfig
    },
    {
        test: /\.less$/,
        use: [
            ...nodeCssConfig,
            lessConfig
        ]
    }
];
module.exports={
    webStyleConfig,
    nodeStyleConfig
};
