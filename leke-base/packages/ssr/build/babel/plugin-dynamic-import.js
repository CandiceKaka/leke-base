const getWebpackChunkName=require('./getWebpackChunkName');

module.exports = function ({types: t}) {
    return {
        visitor: {
            Import:function (path, state) {
                const {node}=path.parentPath;
                const [module] = node.arguments;
                if(module.leadingComments){
                    return;
                }
                const webpackChunkName =getWebpackChunkName(module.value,state.filename);
                module.leadingComments = [{
                    type: "CommentBlock",
                    value: `webpackChunkName: '${webpackChunkName}'`
                }];
                path.parentPath.replaceWith(
                    t.callExpression(
                        t.Import(),
                        [module]
                    )
                );
            }
        }
    };
};