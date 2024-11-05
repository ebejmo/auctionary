import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {},
  },
  pluginJs.configs.recommended,
];
