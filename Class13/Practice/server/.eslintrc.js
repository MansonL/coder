module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "rules": {
            "semi": ["error", "always"],
            "quotes": ["error", "double"]
        
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    }

};
