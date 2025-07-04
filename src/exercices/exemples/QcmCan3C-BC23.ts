import { createQcmFromJson } from '../utils/qcmUtils'
import qcmData from './modele-qcm-bc23.json'

// Export des métadonnées requises
export const uuid = '3cbc33'
export const titre = 'QCM CAN 3e - BC23'
export const dateDePublication = '3/7/2025'
export const refs = [
  { 'fr-fr': [] }
]
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = true
export const amcType = 'qcmMono'

// Création de l'exercice QCM à partir du JSON
const ExerciceQcmCan3C = createQcmFromJson(qcmData)

export default ExerciceQcmCan3C
