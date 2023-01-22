module.exports = {
  extends: ['airbnb', 'airbnb/hooks', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parser: '@babel/eslint-parser',
  rules: {
    'react/jsx-filename-extension': 'off',
    'no-underscore-dangle': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-fragments': 'off',
  },
};
