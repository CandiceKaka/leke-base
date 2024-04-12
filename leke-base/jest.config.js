const path=require('path');
const resolvePaths=require('./resolvePaths');
let coverageDir=process.argv[process.argv.length-1];
const collectCoverageFrom=["!**/node_modules/**"];

if(coverageDir.indexOf('./packages')===0){
    coverageDir=coverageDir.replace('./','');
}else if(coverageDir.indexOf('packages')!==0){
    coverageDir='packages';
}
switch (coverageDir) {
case 'packages':
    collectCoverageFrom.push(
        "<rootDir>/packages/rc/components/**/*.tsx",
        "<rootDir>/packages/hooks/src/!(demos)/*.ts",
        "<rootDir>/packages/store/src/!(index|types|context).{ts,tsx}"
    );
    break;
case 'packages/rc':
    collectCoverageFrom.push("<rootDir>/packages/rc/components/**/*.tsx");
    break;
case 'packages/mobile':
    collectCoverageFrom.push("<rootDir>/packages/mobile/components/**/*.tsx");
    break;
case 'packages/hooks':
    collectCoverageFrom.push("<rootDir>/packages/hooks/src/!(demos)/*.ts");
    break;
case 'packages/store':
    collectCoverageFrom.push("<rootDir>/packages/store/src/!(index|types|context).{ts,tsx}");
    break;
default:
    collectCoverageFrom.push(
        `<rootDir>/${coverageDir}/*.${coverageDir.indexOf('packages/rc')===0?'tsx':'ts'}`,
        `<rootDir>/${coverageDir}/**/!(demos)/*.ts`
    );
    break;

}
module.exports = {
    transform:{
        '\\.(ts|js)x?$':'babel-jest',
        '\\.html$':'jest-raw-loader',
        '\\.md$':path.resolve('./jest-markdown.js')
    },
    moduleNameMapper:{
        ...resolvePaths('<rootDir>'),
        '\\.(css|less)$': 'identity-obj-proxy'
    },
    setupFiles:["<rootDir>/jest.setup.js"],
    moduleFileExtensions: ['ts','tsx','js','jsx','md'],
    collectCoverageFrom,
    testPathIgnorePatterns:[
        "/node_modules/",
        "/demos/",
        "/es/",
        "/lib/",
        "/formula/"
    ],
    collectCoverage: true
};