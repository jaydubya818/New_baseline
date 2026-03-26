/** @type {import('prettier').Config} */
const config = {
  // Core formatting
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',

  // JSX
  jsxSingleQuote: false,

  // End of line
  endOfLine: 'lf',

  // Tailwind class sorting (requires prettier-plugin-tailwindcss)
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
}

export default config
