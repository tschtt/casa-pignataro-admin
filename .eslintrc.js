module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/attributes-order': 'off',
    'node/no-callback-literal': 'off',
    'prefer-const': 'off',
    'dot-notation': 'off',
    'import/order': 'off',
  }
}
