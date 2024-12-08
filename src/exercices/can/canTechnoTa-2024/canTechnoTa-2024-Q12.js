import Exercice from '../../Exercice'
import { choice } from '../../../lib/outils/arrayOutils'
import Decimal from 'decimal.js'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
export const titre = 'Lien entre augmenter et multiplication par un multiple de 100'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '7c903'
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
    this.optionsChampTexte = { texteApres: '%' }
    this.canOfficielle = false
  }

  nouvelleVersion () {
    if (this.canOfficielle) {
      this.reponse = 100
      this.question = 'Multplier une valeur par 2 revient à l\'augmenter de '
      this.correction = `$2=1+\\dfrac{${miseEnEvidence(100)}}{100}$`
      this.canEnonce = 'Multplier une valeur par 2 revient à l\'augmenter de'
      this.canReponseACompleter = ''
    } else {
      const couple = choice([2,3,4,5])
      const a = couple[0]
      this.reponse = a * 100
      this.question = `Multplier une valeur par ${a} revient à l'augmenter de `
      this.correction = `$${a}=1+\\dfrac{${miseEnEvidence((a-1)*100)}}{100}$`
      this.canEnonce = `Multplier une valeur par ${a} revient à l'augmenter de`
      this.canReponseACompleter = ''
    }
  }
}
