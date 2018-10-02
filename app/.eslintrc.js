module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 1,
    'vue/require-default-prop': 'warning',
    'vue/attributes-order': 'error',
    'vue/no-confusing-v-for-v-if': 'error',
    'vue/order-in-components': 'error',
    'vue/no-use-v-if-with-v-for': 'error',
    'vue/no-v-html': 'warning',
    'vue/prop-name-casing': 'error',
    'vue/script-indent': 'error',
    'vue/html-quotes': 'error',
    'vue/html-closing-bracket-newline': 'warning',
    'vue/html-closing-bracket-spacing': ["error", {
      "startTag": "never",
      "endTag": "never",
      "selfClosingTag": "never"
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
