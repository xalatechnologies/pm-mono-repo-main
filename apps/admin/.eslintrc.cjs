module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: '18.2',
    },
  },
  rules: {
    // Allow JSX in .tsx files
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    
    // Allow React 17+ JSX transform (no need to import React)
    'react/react-in-jsx-scope': 'off',
    
    // Allow default props with TypeScript
    'react/require-default-props': 'off',
    
    // Allow non-null assertions in TypeScript
    '@typescript-eslint/no-non-null-assertion': 'warn',
    
    // Console statements are warnings
    'no-console': 'warn',
    
    // Alert is a warning
    'no-alert': 'warn',
    
    // Allow any types with warning
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // Prop types not needed with TypeScript
    'react/prop-types': 'off',
    
    // Allow unused vars starting with _
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  ignorePatterns: ['dist/', 'node_modules/'],
};
