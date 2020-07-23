module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "security"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  ignorePatterns: [],
  settings: {
    "import/extensions": [".ts"],
  },
  extends: [
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    // 'import/prefer-default-export': 0,
    // 'consistent-return': 0,
    // 'import/no-unused-modules': [2, {'unusedExports': true}],
    // 'object-curly-newline': ['error', {
    //   ImportDeclaration: 'never',
    // }],
    // 'no-underscore-dangle': 0,
    // 'max-len': 0,
    // 'implicit-arrow-linebreak': 0,
    // 'no-plusplus': 0,
    // Typescript
    // '@typescript-eslint/no-var-requires': 0,
    // '@typescript-eslint/ban-ts-ignore': 0,
    // '@typescript-eslint/no-empty-interface': 0,
    // '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
  },
};
