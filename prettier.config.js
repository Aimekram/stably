module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: 'lf',
  bracketSpacing: true,
  singleQuote: true,
  bracketSameLine: true,
  trailingComma: 'es5',
  htmlWhitespaceSensitivity: 'strict',

  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindAttributes: ['className'],
};
