module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    }
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  plugins: [
    'svelte3',
  ],
};
