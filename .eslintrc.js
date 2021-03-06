module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es6": true,
        "mocha": true
    },
    "extends": [
        "eslint:recommended",
        "airbnb"
    ],
    "parserOptions": {
        "ecmaVersion": 2016,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
             2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "max-len": [1, 80, 2],
        "prefer": { 
            "arg": "param",
            "argument": "param", 
            "class": "constructor", 
            "return": "returns", 
            "virtual": "abstract" 
        },
        "preferType": {
             "Boolean": "boolean", 
             "Number": "number", 
             "object": "Object", 
             "String": "string" 
        },
        "requireReturn": false,
        "requireReturnType": false,
        "requireParamType": false,
        "matchDescription": ".+",
        "requireParamDescription": false,
        "requireReturnDescription": false

    }
};