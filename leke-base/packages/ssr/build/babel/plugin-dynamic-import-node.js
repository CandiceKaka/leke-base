const getWebpackChunkName=require('./getWebpackChunkName');

function createDynamicImportTransform({ template, types: t }) {
    const builder=template('Promise.resolve().then(() => Object.assign({__webpack_chunkname_:CHUNKNAME},require(SOURCE)))');
    const visited = typeof WeakSet === 'function' && new WeakSet();

    return (context, path) => {
        if (visited) {
            if (visited.has(path)) {
                return;
            }
            visited.add(path);
        }

        const [SOURCE]=path.parent.arguments;

        const chunkName=getWebpackChunkName(SOURCE.value,context.filename);

        const chunkNameNode=t.StringLiteral(chunkName);

        const newImport = builder({ SOURCE,CHUNKNAME:chunkNameNode});

        path.parentPath.replaceWith(newImport);
    };
}
module.exports=function (api) {
    const transformImport = createDynamicImportTransform(api);

    return {
        visitor: {
            Import(path) {
                transformImport(this, path);
            },
        },
    };
};