import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";
import parserTs from "@typescript-eslint/parser";

/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  files: ["**/*.ts", "**/*.tsx"],

  languageOptions: {
    parser: parserTs,
    parserOptions: {
      project: "./tsconfig.json",
      sourceType: "module",
    },
  },

  rules: {
    "prettier/prettier": "error",

    "no-console": ["warn", { allow: ["warn", "error"] }],

    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "off",

    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.plugins(
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-prettier"
  ),
  config,
  { ignores: ["node_modules", "**/*.cjs", "dist", ".storybook"] },
];

export default eslintConfig;
