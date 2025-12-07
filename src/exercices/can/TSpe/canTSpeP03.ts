import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { choice } from '../../../lib/outils/arrayOutils'
import {
  ecritureAlgebrique,
  ecritureParentheseSiNegatif,
} from '../../../lib/outils/ecritures'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import FractionEtendue from '../../../modules/FractionEtendue'
import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
export const interactifReady = true
export const titre = "Calculer une probabilité avec loi binomiale."
export const interactifType = 'mathLive'
export const dateDePublication = '6/12/2025'

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Stéphane Guyon
 */

export const uuid = '32233'

export const refs = {
  'fr-fr': ['canTSpeP03'],
  'fr-ch': [''],
}
export default class CalculBinomiale extends ExerciceSimple {
  constructor() {
    super()
    this.versionQcmDisponible = true
    this.formatChampTexte = KeyboardType.clavierProbabilite
    this.optionsChampTexte = { texteAvant: '<br>' }
    this.typeExercice = 'simple'
    this.nbQuestions = 1

    
  }

  nouvelleVersion() {
      const n = randint(4, 20)
      const p = randint(1, 9) / 10
      const k = randint(3, n)

        this.question = `On répète ${n} fois et de manière indépendante une épreuve de Bernoulli, de paramètre $${texNombre(p, 2)}$. <br>
        Soit $X$ la variable aléatoire qui compte le nombre de succès obtenus.<br>`
        
        this.question +=
       `Quelle est la valeur de $P\\left(X=${k}\\right)$ ?<br>`
        this.reponse = 
        `$P\\left(X=${k}\\right)=\\displaystyle\\binom{${n}}{${k}}\\times ${texNombre(p, 2)}^{${k}}\\times ${texNombre(1 - p, 2)}^{${n - k}}$`
        this.correction = `$P\\left(X=${k}\\right)=\\displaystyle\\binom{${n}}{${k}}\\times ${texNombre(p, 2)}^{${k}}\\times ${texNombre(1 - p, 2)}^{${n - k}}$`

        this.distracteurs = [
          `$P\\left(X=${k}\\right)=\\displaystyle\\binom{${k}}{${n}}\\times ${texNombre(p, 2)}^{${k}}\\times ${texNombre(1 - p, 2)}^{${n - k}}$`,
          `$P\\left(X=${k}\\right)=\\displaystyle\\binom{${n}}{${k}}\\times ${texNombre(p, 2)}^{${n}}\\times ${texNombre(1 - p, 2)}^{${n - k}}$`,
          `$P\\left(X=${k}\\right)=\\displaystyle\\binom{${n}}{${k}}\\times ${texNombre(p, 2)}^{${n-k}}\\times ${texNombre(1 - p, 2)}^{${n}}$`,
          `$P\\left(X=${k}\\right)=\\left(\\dfrac{${n}}{${k}}\\right)\\times ${texNombre(p, 2)}^{${k}}\\times ${texNombre(1 - p, 2)}^{${n - k}}$`,
        ]

      
    this.canEnonce = this.question // 'Compléter'
    this.canReponseACompleter = ''
  }
}
