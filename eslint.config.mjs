import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import babelParser from '@babel/eslint-parser';
import eslintConfigs from '@dr.pogodin/eslint-configs';

export default defineConfig([
  {
    ignores: ['**/node_modules', '**/cjs', '**/es', '**/.yarn', '**/example', '**/*.tsx'],
  },
  {
    extends: [eslintConfigs.configs.javascript, prettierConfig, eslintConfigs.configs.react],
    languageOptions: {
      globals: {
        JSX: true,
        fetch: 'readonly',
      },
      parser: babelParser,
      parserOptions: {
        babelOptions: { presets: ['@babel/preset-react'] },
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        requireConfigFile: false,
        sourceType: 'module',
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      camelcase: ['error', { ignoreDestructuring: false, properties: 'never' }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.config.*', '**/__test__/**/*'] }],
      'import/no-unassigned-import': 'off',
      'no-eq-null': 'off',
      'no-underscore-dangle': 'off',
      'no-unused-vars': ['error', { caughtErrors: 'none', ignoreRestSiblings: true, varsIgnorePattern: '^React$' }],
      'no-useless-assignment': 'off',
      'react/jsx-filename-extension': 'off',
      'sort-keys': 'off',
    },
    settings: {
      'import/resolver': {
        exports: {},
        node: {},
      },
      react: { version: 'detect' },
    },
  },
]);
