module.exports = {
  root: true,
  extends: ['plugin:@next/next/recommended', '@payloadcms'],
  ignorePatterns: ['**/payload-types.ts'],
  plugins: ['prettier', 'simple-import-sort'],
  rules: {
    'prettier/prettier': '0'['error', { endOfLine: 'auto' }],  
    'no-console': 'off',
    'simple-import-sort/imports': 'error',
  },
};

