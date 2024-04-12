const path = require('path');
const mkdirp = require('mkdirp');
const fs = require('fs');

class resourcePlugin {
    constructor(filename='resource.json') {
        this.filename=filename;
        this.compiler = null;
    }

    handleEmit(hookCompiler, callback){
        const stats = hookCompiler.getStats().toJson();
        const result = JSON.stringify(
            {
                publicPath:stats.publicPath,
                namedChunkGroups:stats.namedChunkGroups
            },
            null,
            2
        );

        this.writeAssetsFile(result);

        callback();
    }

    writeAssetsFile(jsonString){
        const outputDir=this.compiler.outputPath;
        const outputFile = path.resolve(outputDir, this.filename);
        if(this.compiler.options.mode==="development"){
            const outputFileSystem=this.compiler.outputFileSystem;
            if (!outputFileSystem.existsSync(outputDir)){
                outputFileSystem.mkdirpSync(outputDir);
            }
            outputFileSystem.writeFileSync(outputFile, jsonString);
        }else{
            if (!fs.existsSync(outputDir)) {
                mkdirp.sync(outputDir);
            }
            fs.writeFileSync(outputFile, jsonString);
        }
    }

    apply(compiler) {
        this.compiler = compiler;
        compiler.hooks.emit.tapAsync('resource-plugin', this.handleEmit.bind(this));
    }
}

module.exports=resourcePlugin;
