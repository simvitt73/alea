// Ajouté le 15/07/2025 par JC-Lhote pour peermettre à des listeners de savoir que la correction est affichée

import { tick } from 'svelte'

// Peut-être est à déplacer dans un fichier de fonctions utilitaires ?
export function handleCorrectionAffichee () {
  // On attend le tick Svelte pour s'assurer que le DOM est à jour
  tick().then(() => {
    // Vérifie qu'au moins un élément de correction est dans le DOM
    if (document.querySelector('[id^="correction-exo"]')) {
      const correctionsAffichees = new window.Event('correctionsAffichees', {
        bubbles: true,
      })
      document.dispatchEvent(correctionsAffichees)
    }
  })
}
