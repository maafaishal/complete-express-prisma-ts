import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import pluginPromise from 'eslint-plugin-promise';

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  prettier
);
