import babelParser from '@babel/eslint-parser';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import eslintConfigs from '@dr.pogodin/eslint-configs';

export default defineConfig([{
  // ignores: ['build/'],
  languageOptions: {
    globals: {
      fetch: 'readonly',
      JSX: true,
    },
    parser: babelParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
      requireConfigFile: false,
      babelOptions: { presets: ['@babel/preset-react'] },
    },
  },
  settings: {
    'import/resolver': {
      node: {},
      exports: {},
    },
    react: { version: 'detect' },
  },
  plugins: {
    prettier,
  },
  extends: [
    prettierConfig,
    eslintConfigs.configs.javascript,
    eslintConfigs.configs.react,
  ],
  rules: {
    // "import/no-commonjs": "off",
    // "import/no-unassigned-import": "off",
    "sort-keys": "off",
    'import/no-unassigned-import': 'off',
    'no-unused-vars': ['error', { caughtErrors: 'none', ignoreRestSiblings: true, varsIgnorePattern: '^React$' }],
    // "@stylistic/object-curly-newline": "off",
    // "@stylistic/max-len": "off",
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": true, "peerDependencies": true}],
    "react/jsx-filename-extension": "off",
  }
}]);
