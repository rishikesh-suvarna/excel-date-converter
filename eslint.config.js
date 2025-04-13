// eslint.config.js
import eslint from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
      globals: {
        // Add Jest globals for all files
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly'
      }
    },
    plugins: {
      jest: jestPlugin
    },
    rules: {
      // Possible Errors
      'no-console': 'warn',
      'no-constant-condition': 'error',
      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-irregular-whitespace': 'error',
      'no-template-curly-in-string': 'error',
      'no-unreachable': 'error',

      // Best Practices
      'array-callback-return': 'error',
      'block-scoped-var': 'error',
      'consistent-return': 'error',
      curly: ['error', 'all'],
      'default-case': 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'always'],
      'no-alert': 'error',
      'no-caller': 'error',
      'no-else-return': 'error',
      'no-empty-function': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-lone-blocks': 'error',
      'no-multi-spaces': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-self-compare': 'error',
      'no-unused-expressions': 'error',
      'no-useless-return': 'error',
      radix: 'error',

      // Variables
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-use-before-define': ['error', { functions: false }],

      // Stylistic Issues
      'array-bracket-spacing': ['error', 'never'],
      'block-spacing': 'error',
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      camelcase: 'error',
      'comma-dangle': ['error', 'only-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'comma-style': ['error', 'last'],
      'computed-property-spacing': ['error', 'never'],
      'consistent-this': ['error', 'self'],
      'eol-last': 'error',
      'func-call-spacing': ['error', 'never'],
      'func-names': ['error', 'as-needed'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'keyword-spacing': 'error',
      'max-len': ['error', { code: 100, ignoreComments: true, ignoreStrings: true }],
      'new-cap': ['error', { newIsCap: true, capIsNew: false }],
      'no-array-constructor': 'error',
      'no-mixed-operators': 'error',
      'no-multi-assign': 'error',
      'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
      'no-new-object': 'error',
      'no-tabs': 'error',
      'no-trailing-spaces': 'error',
      'no-whitespace-before-property': 'error',
      'object-curly-spacing': ['error', 'always'],
      'padded-blocks': ['error', 'never'],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
      ],
      'quote-props': ['error', 'as-needed'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'semi-spacing': 'error',
      'space-before-blocks': 'error',
      'space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
      'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],

      // ES6
      'arrow-parens': ['error', 'as-needed'],
      'arrow-spacing': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-constructor': 'error',
      'no-useless-rename': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      'rest-spread-spacing': ['error', 'never'],
      'template-curly-spacing': 'error',

      // Jest
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  },
  {
    files: ['**/*.test.js', '**/*.spec.js'],
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
  }
];
