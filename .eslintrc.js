module.exports = {
  root: true,
  extends: [
    'universe/native',
    'universe/web',
    'universe/shared/typescript-analysis',
    'prettier',
  ],
  ignorePatterns: ['build'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
  ],
  settings: {
    react: {
      version: '18.0', // Instead of "detect"
    },
  },
};