/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "next",
    "next/core-web-vitals",
    "prettier",
  ],
  rules_:{
    "no-var":"off",
    "@typescript-eslint/no-unsafe-assignment":"off",
    "prefer-const":"off",
    "@typescript-eslint/consistent-indexed-object-style":"off"
  },
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
};

module.exports = config;
