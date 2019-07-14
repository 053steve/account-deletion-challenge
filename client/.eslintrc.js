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
        "consistent-return": 1,
        "import/no-extraneous-dependencies": [
            "error", {
                "devDependencies": true
            }
        ]
    }
};