module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["prettier"],
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/standard",
    "plugin:prettier/recommended",
    "eslint:recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": "error",
    "vue/multi-word-component-names": "off",
  },
};
