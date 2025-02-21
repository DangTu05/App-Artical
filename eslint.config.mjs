import js from "@eslint/js";
import globals from "globals";
import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["dist"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: parser,
    },
    plugins: {
      "@typescript-eslint": plugin,
    },
    rules: {
      ///Common
      "no-console": 1,
      "no-lonely-if": 1,
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": 1,
      "no-trailing-spaces": 1,
      "no-multi-spaces": 1,
      "no-multiple-empty-lines": 1,
      "space-before-blocks": ["error", "always"],
      "object-curly-spacing": [1, "always"],
      indent: ["warn", 2],
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "array-bracket-spacing": 1,
      "linebreak-style": 0,
      "no-unexpected-multiline": "warn",
      "keyword-spacing": 1,
      "comma-dangle": 0,
      "comma-spacing": 1,
      "arrow-spacing": 1,
    },
  },
];
