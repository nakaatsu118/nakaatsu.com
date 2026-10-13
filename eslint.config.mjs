import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'dist-test/**',
      '.astro/**',
      '.wrangler/**',
      '.next/**',
      'out/**',
      'test-results/**',
      '.cursor/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.mjs'],
    languageOptions: {
      globals: {
        process: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        Response: 'readonly',
        AbortSignal: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.astro'],
    rules: { '@typescript-eslint/consistent-type-imports': 'error' },
  },
);
