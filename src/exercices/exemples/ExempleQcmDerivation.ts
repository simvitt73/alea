import { createQcmFromJson } from '../utils/qcmUtils'
import qcmData from './qcm-derivation.json'
export const uuid = 'deriv'

/**
 * Exercice QCM sur le calcul de dérivées
 * Basé sur les exercices 1AN10-1, 1AN14-1, 1AN14-3, 1AN14-4, 1AN14-6
 *
 * Questions couvrant :
 * - Définition de la dérivée
 * - Dérivées des fonctions usuelles
 * - Dérivées de fonctions composées
 * - Dérivées de quotients
 */
const ExerciceQcmDerivation = createQcmFromJson(qcmData)

export default ExerciceQcmDerivation
