module.exports={
    presets:[
        '@babel/preset-typescript',
        ['@babel/preset-env',
            {
                modules:false,
                targets:{
                    browsers: [
                        'last 2 versions',
                        'ie >= 11',
                    ],
                }
            }]
    ],
    plugins:[
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-spread',
        '@babel/plugin-transform-object-assign',
        '@babel/plugin-transform-template-literals',
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        ['@babel/plugin-proposal-decorators',{legacy:true}]
    ]
};