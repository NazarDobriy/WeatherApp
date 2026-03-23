/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'at-rule-empty-line-before': null,
    'color-no-invalid-hex': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'no-unknown-animations': true,
    'no-unknown-custom-media': true,
    'unit-no-unknown': true,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'layer',
          'screen',
          'variants',
          'responsive',
          'apply',
          'use',
          'include',
          'mixin',
        ],
      },
    ],
    'selector-class-pattern': [
      '^[a-z0-9\\-_]+$',
      {
        resolveNestedSelectors: true,
        ignorePattern: '^(mdc-|mat-|cdk-)',
      },
    ],
  },
};
