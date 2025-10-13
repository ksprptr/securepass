import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  {
    ignores: ["**/next-env.d.ts"],
  },
  ...compat.extends(
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ),
  {
    plugins: {
      "unused-imports": unusedImports,
      prettier,
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      semi: "error",
      "react/no-unescaped-entities": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/no-use-before-define": ["error"],
      "no-use-before-define": "off",
      "no-await-in-loop": "warn",
      "no-eval": "error",
      "no-implied-eval": "error",
      "prefer-promise-reject-errors": "warn",
      "spaced-comment": "error",
      "no-duplicate-imports": "error",
      "no-explicit-any": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_"
        }
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^\\u0000", "^@?w"], ["^@/"], ["^."], ["^.+.(css|scss)$"]]
        }
      ],
      "simple-import-sort/exports": "error",
      "import/no-named-as-default-member": "warn"
    }
  }
];

export default config;
