import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  rules: {
    'vue/block-order': ['error', {
      order: [['template', 'script'], 'style'],
    }],

  },
})
