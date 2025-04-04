import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      eqeqeq: 'error',
      'jsx-quotes': ['warn', 'prefer-single'],
      'keyword-spacing': 'error',
      'no-bitwise': 'error',
      'no-console': 'error',
      'no-eval': 'error',
      'no-nested-ternary': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              message: 'Import [module] from lodash/[module] instead',
              name: 'lodash',
            },
          ],
          patterns: [
            {
              group: ['lodash/set'],
              message: 'Import [module] from lodash/fp/[module] instead',
            },
          ],
        },
      ],
      'no-undef': ['error', { typeof: true }],
      'no-useless-escape': 'error',
      'no-var': 'error',
      'object-curly-spacing': ['error', 'always'],
      quotes: ['error', 'single'],
      'react/jsx-sort-props': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/sort-comp': 'error',
      'react/sort-prop-types': 'error',
      semi: ['error', 'never'],
      'sort-imports': [
        'warn',
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: true,
        },
      ],
      'sort-keys': [
        'warn',
        'asc',
        {
          caseSensitive: true,
          minKeys: 2,
          natural: false,
        },
      ],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]

export default eslintConfig
