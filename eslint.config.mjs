import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

// Add these two:
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 1) Next.js presets (legacy -> flat via compat)
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 2) Shared JS/TS rules (e.g., prefer-const)
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Warn when let can be const
      'prefer-const': 'warn',
    },
  },

  // 3) TypeScript-specific rules
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // If you want type-aware rules later, add:
        // project: ['./tsconfig.json'],
        // tsconfigRootDir: __dirname,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      // Avoid duplicate reports with the base rule
      'no-unused-vars': 'off',

      // Your rules (kept) + sensible options
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': ['warn', { fixToUnknown: false, ignoreRestArgs: false }],

      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },

  // 4) Ignores
  {
    ignores: ['.next/'],
  },
];
