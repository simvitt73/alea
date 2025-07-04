import { createQcmFromJson, createSimpleQcm, createMultipleChoiceQcm } from '../utils/qcmUtils'
import type { QcmJsonData } from '../QcmJsonGenerator'

// Exemple 1 : QCM simple avec une question
const ExerciceQcmSimple = createSimpleQcm(
  'Combien font $3 \\times 7$ ?',
  ['$21$', '$18$', '$24$', '$28$'],
  [
    'Correct ! $3 \\times 7 = 21$',
    'Erreur : vérifiez votre calcul',
    'Erreur : c\'est $3 \\times 8$',
    'Erreur : c\'est $4 \\times 7$'
  ],
  'Multiplication simple'
)

// Exemple 2 : QCM à réponses multiples
const ExerciceQcmMultiple = createMultipleChoiceQcm(
  'Quels sont les nombres premiers inférieurs à 10 ?',
  ['2', '3', '4', '5', '6', '7', '8', '9'],
  [true, true, false, true, false, true, false, false],
  [
    'Correct ! 2 est premier',
    'Correct ! 3 est premier',
    'Faux ! 4 = 2 × 2',
    'Correct ! 5 est premier',
    'Faux ! 6 = 2 × 3',
    'Correct ! 7 est premier',
    'Faux ! 8 = 2 × 4',
    'Faux ! 9 = 3 × 3'
  ],
  'Nombres premiers'
)

// Exemple 3 : QCM complet à partir de données JSON
const qcmDataComplet: QcmJsonData = {
  titre: 'Géométrie - Angles',
  consigne: 'Choisissez la bonne réponse pour chaque question.',
  options: {
    vertical: false,
    ordered: false
  },
  questions: [
    {
      enonce: 'Quelle est la somme des angles d\'un triangle ?',
      reponses: ['$180°$', '$360°$', '$90°$', '$270°$'],
      corrections: [
        'Correct ! La somme des angles d\'un triangle est toujours $180°$',
        'Erreur : c\'est la somme des angles d\'un quadrilatère',
        'Erreur : c\'est la mesure d\'un angle droit',
        'Erreur : vérifiez votre calcul'
      ]
    },
    {
      enonce: 'Combien d\'angles droits y a-t-il dans un carré ?',
      reponses: ['$4$', '$2$', '$3$', '$1$'],
      corrections: [
        'Correct ! Un carré a 4 angles droits',
        'Erreur : c\'est le nombre d\'angles droits d\'un rectangle',
        'Erreur : comptez bien tous les angles',
        'Erreur : il y en a plus d\'un'
      ]
    },
    {
      enonce: 'Quelle est la mesure d\'un angle plat ?',
      reponses: ['$180°$', '$90°$', '$360°$', '$270°$'],
      corrections: [
        'Correct ! Un angle plat mesure $180°$',
        'Erreur : c\'est un angle droit',
        'Erreur : c\'est un angle complet',
        'Erreur : vérifiez votre réponse'
      ]
    }
  ]
}

const ExerciceQcmComplet = createQcmFromJson(qcmDataComplet)

// Export des exercices avec les métadonnées requises
export const uuid1 = 'qcm-simple-multiplication'
export const titre1 = 'QCM Simple - Multiplication'
export const interactifReady1 = true
export const interactifType1 = 'qcm'
export const amcReady1 = true
export const amcType1 = 'qcmMono'

export const uuid2 = 'qcm-multiple-nombres-premiers'
export const titre2 = 'QCM Multiple - Nombres premiers'
export const interactifReady2 = true
export const interactifType2 = 'qcm'
export const amcReady2 = true
export const amcType2 = 'qcmMult'

export const uuid3 = 'qcm-complet-geometrie'
export const titre3 = 'QCM Complet - Géométrie'
export const interactifReady3 = true
export const interactifType3 = 'qcm'
export const amcReady3 = true
export const amcType3 = 'qcmMono'

// Classes d'exercices exportées
export { ExerciceQcmSimple, ExerciceQcmMultiple, ExerciceQcmComplet }
