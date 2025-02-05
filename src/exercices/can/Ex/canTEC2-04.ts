import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, ecritureParentheseSiNegatif } from '../../../lib/outils/ecritures'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { randint } from '../../../modules/outils'
import Exercice from '../../Exercice'
export const titre = 'Calculer le module d\'un quotient.'
export const interactifReady = true
export const interactifType = 'mathLive'

export const dateDePublication = '05/02/2025'

export const uuid = 'e0dea'
export const refs = {
  'fr-fr': ['canTEC2-04'],
  'fr-ch': []
}

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Stéphane Guyon

*/
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.optionsChampTexte = { texteAvant: '$\\dfrac{\\vert z_1  \\vert}{\\vert z_2  \\vert} =$' }
    this.formatChampTexte = KeyboardType.clavierFullOperations
  }

  nouvelleVersion () {
    const a1 = randint(-7, 7, 0)
    const b1 = randint(-7, 7, 0)
    const a2 = randint(-7, 7, 0)
    const b2 = randint(-7, 7, 0)

    this.question = `Soit $z_1=${a1}${ecritureAlgebriqueSauf1(b1)}\\text{i}$ et $z_2=${a2}${ecritureAlgebriqueSauf1(b2)}\\text{i}$ deux nombres complexes. <br>`
    this.question += 'Calculer  $\\Big\\vert\\dfrac{ z_1}{ z_2}\\Big\\vert$ . <br>'
    this.correction = 'On sait que si $z_1\\in \\mathbb{C}$ et  $z_2\\in \\mathbb{C}^{*}$, alors $\\Big\\vert\\dfrac{z_1}{z_2}\\Big\\vert=\\dfrac{\\vert z_1\\vert}{\\vert z_2\\vert}.$'
    this.correction += '<br>On sait aussi que si $z=a+\\text{i}b \\in \\mathbb C$ alors $\\vert z\\vert=\\sqrt{a^2+b^2}$.'
    this.correction += '<br> Dans notre situation, en utilisant successivement ces deux propriétés, il vient : <br> '
    this.correction += `$\\begin{aligned} \\Big\\vert\\dfrac{ z_1}{ z_2}\\Big\\vert&=\\Big\\vert\\dfrac{${a1}${ecritureAlgebriqueSauf1(b1)}\\text{i}}{ ${a2}${ecritureAlgebriqueSauf1(b2)}\\text{i}}\\Big\\vert\\\\
    &=\\dfrac{\\big\\vert${a1}${ecritureAlgebriqueSauf1(b1)}\\text{i}\\big\\vert}{ \\big\\vert${a2}${ecritureAlgebriqueSauf1(b2)}\\text{i}\\big\\vert}\\\\
    &=\\dfrac{\\sqrt{${a1 * a1}+${b1 * b1}}}{\\sqrt{${a2 * a2}+${b2 * b2}}}
    &=\\dfrac{\\sqrt{${a1 * a1 + b1 * b1}}}{\\sqrt{${a2 * a2 + b2 * b2}}} 
    &=\\sqrt{\\dfrac{${a1 * a1 + b1 * b1}}{${a2 * a2 + b2 * b2}}}\\end{aligned}$`
    this.correction += `<br>Le module de $\\Big\\vert\\dfrac{ z_1}{ z_2}\\Big\\vert$  est donc égal à $${miseEnEvidence(`\\sqrt{\\dfrac{${a1 * a1 + b1 * b1}}{${a2 * a2 + b2 * b2}}}`)}$.`
    this.reponse = Math.sqrt(a1 * a1 + b1 * b1)
    this.canEnonce = this.question// 'Compléter'
    this.canReponseACompleter = ''
  }
}
