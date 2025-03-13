module.exports = {
  root: true,
  extends: ['universe/native', 'universe/web', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['build'],
};