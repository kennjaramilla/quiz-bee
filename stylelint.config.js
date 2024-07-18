module.exports = {
    extends: 'stylelint-config-standard',
    plugins: ['stylelint-scss'],
    rules: {
      'indentation': 2,
      'scss/double-slash-comment-whitespace-inside': 'always',
      'scss/at-extend-no-missing-placeholder': true,
      'scss/dollar-variable-pattern': '^foo',
      'scss/percent-placeholder-pattern': '^foo',
      'scss/at-if-no-null': true,
      'color-hex-case': 'lower',
      'color-hex-length': 'short',
      'declaration-colon-space-after': 'always',
      'max-empty-lines': 1,
      'no-extra-semicolons': true,
      'string-quotes': 'double'
    }
  };
  