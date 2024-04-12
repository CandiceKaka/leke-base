import {nodeResolve} from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import {babel} from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
const extensions=['.ts','.js'];
const plugins=[
    babel({extensions,babelHelpers:'runtime',exclude:'node_modules/**'}),
    commonjs({extensions,transformMixedEsModules:true}),
    nodeResolve({browser:true}),
    postcss({
        inject:true,
        minimize:true,
        plugins: [
            require("postcss-preset-env")({
                browsers: ["last 2 versions"],
                autoprefixer: {},
            }),
        ]
    }),
    {
        transform(code,id){
            if(id.endsWith('.html')){
                return {
                    code: `export default ${JSON.stringify(code)};`,
                    map: { mappings: "" }
                };
            }
        }
    }
];
export default ['AudioPlayer','VideoPlayer','AudioRecorder'].reduce((result,name)=>{
    result.push(
        {
            input: `./src/${name}/index.ts`,
            plugins,
            external:[/@babel\/runtime/,/hls\.js/,'@leke/http'],
            output: [
                {
                    file: `lib/${name}.js`,
                    format: 'cjs',
                    exports:'auto'
                },
                {
                    file: `es/${name}.js`,
                    format: 'esm'
                }
            ]
        }
    );
    return result;
},[]);