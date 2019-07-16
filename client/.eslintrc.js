module.exports = {
    "settings": {
        "react": {
            version: require('./package.json').dependencies.react,
        },
    },
    "extends": [
        "standard",
        "airbnb-base",
        "plugin:prettier/recommended",
        "plugin:react/recommended"
    ],
    "parser": "babel-eslint",
    "plugins": ["react"],
    "rules": {
        "default-case": 1,
        "consistent-return": 0,
        "no-underscore-dangle": 0,
        "no-string-refs": 1,
        "no-shadow": 1,
        "import/prefer-default-export": 0,
        "no-string-refs": 0,
        "import/no-extraneous-dependencies": [
            "error", {
                "devDependencies": true
            }
        ]
    }
};