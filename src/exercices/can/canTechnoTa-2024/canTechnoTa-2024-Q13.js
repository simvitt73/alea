import Exercice from '../../Exercice'
import { choice } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Lien entre augmenter et multiplication par un multiple de 100'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'f36c0'
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Mathieu Degrange
 * Référence
*/
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.formatChampTexte = KeyboardType.clavierDeBase
    this.formatInteractif = 'calcul'
    this.optionsChampTexte = { }
    this.canOfficielle = false
  }

  nouvelleVersion () {
    if (this.canOfficielle) {
      this.reponse = '\\dfrac{4}{15}'
      this.question = '$\\dfrac{1}{3}$ de $\\dfrac{4}{5}$ '
      this.correction = `$\\dfrac{1}{3} \\times \\dfrac{4}{5} = \\dfrac{1 \\times 4}{3 \\times 5} = \\dfrac{4}{15}$`
      this.canEnonce = '$\\dfrac{1}{3}$ de $\\dfrac{4}{5}$'
      this.canReponseACompleter = ''
    } else {
      const nombres = shuffle([3,4,5,7,11])
      const a = nombres[0]
      const b = nombres[1]
      const c = nombres[2] 
      // 1/a de b/c
      this.reponse = `\\dfrac{${b}}{${a*c}}`
      this.question = `$\\dfrac{1}{${a}}$ de $\\dfrac{${b}}{${c}}$ `
      this.correction = `$\\dfrac{1}{${a}} \\times \\dfrac{${b}}{${c}} = \\dfrac{1 \\times ${b}}{${a} \\times ${c}} = \\dfrac{${b}}{${a*c}}$`
      this.canEnonce = `$\\dfrac{1}{${a}}$ de $\\dfrac{${b}}{${c}}$`
      this.canReponseACompleter = ''
    }
  }
}
