module.exports = function ({ types: t }) {
    return {
        visitor: {
            ImportDeclaration(path){
                const value=path.node.source.value;
                if(/\.(css|less|scss)$/.test(value)){
                    path.remove();
                }
            }
        }
    };
};