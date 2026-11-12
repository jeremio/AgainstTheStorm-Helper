import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
}, {
  // Cantonnee aux fichiers Vue. Declaree globalement, la regle etait aussi chargee pour
  // README.md (formatters: true fait linter le markdown), ou eslint-plugin-vue plante :
  // TypeError getDocumentFragment sur un document qui n'est pas un SFC.
  files: ['**/*.vue'],
  rules: {
    'vue/block-order': ['error', {
      order: [['template', 'script'], 'style'],
    }],
  },
})
