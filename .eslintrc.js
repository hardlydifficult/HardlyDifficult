module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: "vue-eslint-parser",
  extends: [
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:vue/essential",
  ],
  plugins: ["markdown", "prettier", "json"],
};
