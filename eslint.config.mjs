import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

// `eslint-config-next` already registers the react, import and @typescript-eslint plugins.
export default defineConfig([
  ...nextVitals,
  {
    // Pin the version: `eslint-config-next` sets `detect`, whose lookup crashes under ESLint 10.
    settings: { react: { version: '19' } },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      prettier,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-use-before-define': 'error',
      'no-use-before-define': 'off',
      'no-await-in-loop': 'warn',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'prefer-promise-reject-errors': 'warn',
      'spaced-comment': 'error',
      'no-duplicate-imports': 'error',
      // Superseded by `unused-imports/no-unused-vars`, which can also drop the import itself.
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          // Side effects, then the `@/…` app imports, then everything else, stylesheets last.
          groups: [['^\\u0000'], ['^@/'], ['^'], ['^.+\\.(css|scss)$']],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/no-named-as-default-member': 'warn',
    },
  },
]);
