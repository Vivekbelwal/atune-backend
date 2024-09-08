module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
  ],
  plugins: ['@typescript-eslint/eslint-plugin', 'json-format'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~/test', './test'],
          ['~', './src'],
        ],
        extensions: ['.js', '.ts'],
      },
    },
  },
  env: {
    es6: true,
    node: true,
    browser: false,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-empty': 'warn',
    'func-names': 'warn',
    'no-continue': 'off',
    'no-console': 'error',
    'require-await': 'warn',
    'no-process-exit': 'error',
    'no-param-reassign': 'off',
    'no-await-in-loop': 'warn',
    'prefer-destructuring': 'warn',
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-constant-condition': 'error',
    'require-atomic-updates': 'off',
    'import/prefer-default-export': 'off',
    'import/no-named-as-default-member': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'never',
      },
    ],
    'no-underscore-dangle': ['error', { allow: ['_id'], allowAfterThis: true }],
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 'first',
        ObjectExpression: 1,
        // FIXME: Can be removed if fixed in new version
        // https://github.com/typescript-eslint/typescript-eslint/issues/1824#issuecomment-957559729
        ignoredNodes: ['ClassBody.body > PropertyDefinition[decorators.length > 0] > .key'],
      },
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'function' },
    ],
  },
  overrides: [
    {
      files: ['./config.js', './src/config/**/*.js', './ecosystem.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['./dev/playground/**/*.{js,ts}'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: [
        './src/apps/**/*.module.ts',
        './src/apps/**/*.entity.ts',
        './src/apps/**/*.resolver.ts',
        './src/apps/**/*.service.ts',
      ],
      rules: {
        'import/no-cycle': 'off',
      },
    },
    {
      files: ['./src/seeds/**', './dev/scripts/**', './dev/playground/**/*.{js,ts}'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-process-exit': 'off',
        'no-console': 'off',
      },
    },
  ],
};
