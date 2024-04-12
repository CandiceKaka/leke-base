module.exports={
    extends: [
        "prettier",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended"
    ],
    settings:{
        react:{
            version:"16.9"
        }
    },
    parser: "@typescript-eslint/parser",
    plugins: ["markdown","react"],
    overrides: [{
        files: ["**/*.md"],
        rules: {
            "react-hooks/rules-of-hooks": 0,
            "react-hooks/exhaustive-deps": 0
        }
    }],
    rules: {
        "react/prop-types": 0,
        "react-hooks/exhaustive-deps": 2,
        "react/display-name":0,
        "no-var": 2,
        "semi": 2,
        "indent": [2,4],
        "no-alert": 2,
        "no-console": 0,
        "no-else-return":2
    }
};