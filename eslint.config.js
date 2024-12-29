import neostandard from 'neostandard'
import eslintPluginSvelte from 'eslint-plugin-svelte'

export default [
  ...neostandard({ ts: true }),
  ...eslintPluginSvelte.configs.recommended,
  {
    rules: {
      'no-multiple-empty-lines': ['error', { 
        max: 1,  // Autorise au maximum une ligne vide
        maxEOF: 1,  // 1 ligne vide à la fin du fichier
        maxBOF: 1   // 1 ligne vide au début du fichier
      }]
    }
  }
]
