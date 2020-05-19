module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-console": 0,
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    semi: ["error", "always"],
    "no-extra-semi": "error",
    quotes: ["error", "double"],
    indent: ["error", 2],
    "no-new-func": 0,
    "space-before-function-paren": ["error", "never"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
