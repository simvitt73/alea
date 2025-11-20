import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { context } from '../../modules/context'
import {
  gestionnaireFormulaireTexte,
  listeQuestionsToContenu,
  randint,
} from '../../modules/outils'
import Exercice from '../Exercice'

import { KeyboardType } from '../../lib/interactif/claviers/keyboard'
import { reduireAxPlusByPlusC } from '../../lib/outils/ecritures'
import { miseEnEvidence } from '../../lib/outils/embellissements'

export const interactifReady = true
export const interactifType = 'mathLive'
export const titre = "Développer à l'aide des identités remarquables"
export const dateDePublication = '19/11/2025'

/**
 * @author Eric Elter
 */

export const uuid = '7bd4f'

export const refs = {
  'fr-fr': ['2N41-6c'],
  'fr-ch': [],
}
export default class DevelopperIdentitesRemarquables5 extends Exercice {
  constructor() {
    super()
    this.besoinFormulaireNumerique = [
      'Valeur devant $x$',
      2,
      '1 : Égal à 1\n2 : Supérieur à 1',
    ]

    this.besoinFormulaire2Texte = [
      "Type d'identités remarquables",
      [
        'Nombres séparés par des tirets  :',
        '1 : (a+b)²',
        '2 : (a-b)²',
        '3 : (a+b)(a-b)',
        '4 : Mélange',
      ].join('\n'),
    ]

    this.besoinFormulaire3Texte = [
      "Type d'opérations avant identité remarquable",
      [
        'Nombres séparés par des tirets  :',
        '1 : Addition',
        '2 : Soustraction',
        '3 : Multiplication',
        '4 : Mélange',
      ].join('\n'),
    ]

    this.nbQuestions = 5
    this.sup = 2
    this.sup2 = 4
    this.sup3 = 4

    this.correctionDetailleeDisponible = true
    context.isHtml ? (this.spacingCorr = 2) : (this.spacingCorr = 1.5)
    if (!context.isHtml) {
      this.correctionDetaillee = false
    }
  }

  nouvelleVersion() {
    this.consigne =
      this.nbQuestions > 1
        ? 'Développer et réduire les expressions suivantes.'
        : "Développer et réduire l'expression suivante."

    const listeTypeDIdentites = gestionnaireFormulaireTexte({
      nbQuestions: this.nbQuestions,
      saisie: this.sup2,
      max: 3,
      melange: 4,
      defaut: 4,
    }).map(Number)

    const listeTypeDOperations = gestionnaireFormulaireTexte({
      nbQuestions: this.nbQuestions,
      saisie: this.sup3,
      max: 3,
      melange: 4,
      defaut: 4,
    }).map(Number)

    let listeTypeDeQuestions = [
      ...new Set(
        listeTypeDIdentites.flatMap((m) =>
          listeTypeDOperations.map((n) => 100 * this.sup + 10 * m + n),
        ),
      ),
    ]

    listeTypeDeQuestions = combinaisonListes(
      listeTypeDeQuestions,
      this.nbQuestions,
    )
    for (
      let i = 0, texte = '', texteCorr, cpt = 0, a, b, c, typesDeQuestions;
      i < this.nbQuestions && cpt < 50;

    ) {
      typesDeQuestions = listeTypeDeQuestions[i]
      b = randint(2, 9)
      a = randint(1, 9, [b])
      c = randint(2, 9) // Coefficient devant l'expression

      if (this.questionJamaisPosee(i, typesDeQuestions, a, b, c)) {
        texteCorr = ''
        let A2 = 0
        let B2 = 0
        let C2 = 0

        switch (typesDeQuestions) {
          // -------------------------------------------
          // -------- (x + a)² ------------------------
          // -------------------------------------------

          case 111: // c + (x+a)²
            texte = `$${c}+(x+${a})^2$`
            A2 = 1
            B2 = 2 * a
            C2 = c + a * a
            if (this.correctionDetaillee) {
              texteCorr += `On développe $(x+${a})^2$.<br>`
              texteCorr += `$(x+${a})^2 = x^2 + ${2 * a}x + ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}+(x+${a})^2 = ${c}+(x^2+${2 * a}x+${a * a}) = ${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}+(x+${a})^2=${c}+(x^2+${2 * a}x+${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break

          case 112: // c - (x+a)²
            texte = `$${c}-(x+${a})^2$`
            A2 = -1
            B2 = -2 * a
            C2 = c - a * a
            if (this.correctionDetaillee) {
              texteCorr += `On développe $(x+${a})^2$.<br>`
              texteCorr += `$(x+${a})^2 = x^2 + ${2 * a}x + ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}-(x+${a})^2 = ${c}-(x^2+${2 * a}x+${a * a}) = ${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}-(x+${a})^2=${c}-(x^2+${2 * a}x+${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break

          case 113: // c × (x+a)²
            texte = `$${c}(x+${a})^2$`
            A2 = c
            B2 = c * 2 * a
            C2 = c * a * a
            if (this.correctionDetaillee) {
              texteCorr += `On développe $(x+${a})^2$.<br>`
              texteCorr += `$(x+${a})^2 = x^2 + ${2 * a}x + ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}(x+${a})^2 = ${c}(x^2+${2 * a}x+${a * a}) = ${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}(x+${a})^2=${c}(x^2+${2 * a}x+${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break

          // -------------------------------------------
          // -------- (x - a)² ------------------------
          // -------------------------------------------

          case 121: // c + (x-a)²
            texte = `$${c}+(x-${a})^2$`
            A2 = 1
            B2 = -2 * a
            C2 = c + a * a
            if (this.correctionDetaillee) {
              texteCorr += `On développe $(x-${a})^2$.<br>`
              texteCorr += `$(x-${a})^2 = x^2 - ${2 * a}x + ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}+(x-${a})^2 = ${c}+(x^2-${2 * a}x+${a * a}) = ${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}+(x-${a})^2=${c}+(x^2-${2 * a}x+${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break

          case 122: // c - (x-a)²
            texte = `$${c}-(x-${a})^2$`
            A2 = -1
            B2 = 2 * a
            C2 = c - a * a
            if (this.correctionDetaillee) {
              texteCorr += `On développe $(x-${a})^2$.<br>`
              texteCorr += `$(x-${a})^2 = x^2 - ${2 * a}x + ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}-(x-${a})^2 = ${c}-(x^2-${2 * a}x+${a * a}) = ${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}-(x-${a})^2=${c}-(x^2-${2 * a}x+${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break

          case 123: // c × (x-a)²
            texte = `$${c}(x-${a})^2$`
            A2 = c
            B2 = c * -2 * a
            C2 = c * a * a
            if (this.correctionDetaillee) {
              texteCorr += `On développe $(x-${a})^2$.<br>`
              texteCorr += `$(x-${a})^2 = x^2 - ${2 * a}x + ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}(x-${a})^2 = ${c}(x^2-${2 * a}x+${a * a}) = ${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}(x-${a})^2=${c}(x^2-${2 * a}x+${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break

          // -------------------------------------------
          // -------- (bx + a)² -----------------------
          // -------------------------------------------

          case 211: // c + (bx+a)²
            texte = `$${c}+(${b}x+${a})^2$`
            A2 = b * b
            B2 = 2 * b * a
            C2 = c + a * a
            if (this.correctionDetaillee) {
              texteCorr += `On développe $(${b}x+${a})^2$.<br>`
              texteCorr += `$(${b}x+${a})^2 = ${b * b}x^2 + ${2 * b * a}x + ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}+(${b}x+${a})^2 = ${c}+(${b * b}x^2+${2 * b * a}x+${a * a}) = ${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}+(${b}x+${a})^2=${c}+(${b * b}x^2+${2 * b * a}x+${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break

          case 212: // c - (bx+a)²
            texte = `$${c}-(${b}x+${a})^2$`
            A2 = -b * b
            B2 = -2 * b * a
            C2 = c - a * a
            if (this.correctionDetaillee) {
              texteCorr += `On développe $(${b}x+${a})^2$.<br>`
              texteCorr += `$(${b}x+${a})^2 = ${b * b}x^2 + ${2 * b * a}x + ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}-(${b}x+${a})^2 = ${c}-(${b * b}x^2+${2 * b * a}x+${a * a}) = ${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}-(${b}x+${a})^2=${c}-(${b * b}x^2+${2 * b * a}x+${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break

          case 213: // c × (bx+a)²
            texte = `$${c}(${b}x+${a})^2$`
            A2 = c * b * b
            B2 = c * 2 * b * a
            C2 = c * a * a
            if (this.correctionDetaillee) {
              texteCorr += `On développe $(${b}x+${a})^2$.<br>`
              texteCorr += `$(${b}x+${a})^2 = ${b * b}x^2 + ${2 * b * a}x + ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}(${b}x+${a})^2 = ${c}(${b * b}x^2+${2 * b * a}x+${a * a}) = ${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}(${b}x+${a})^2=${c}(${b * b}x^2+${2 * b * a}x+${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break

          // -------------------------------------------
          // -------- (bx - a)² -----------------------
          // -------------------------------------------

          case 221: // c + (bx-a)²
            texte = `$${c}+(${b}x-${a})^2$`
            A2 = b * b
            B2 = -2 * b * a
            C2 = c + a * a
            if (this.correctionDetaillee) {
              texteCorr += `On développe $(${b}x-${a})^2$.<br>`
              texteCorr += `$(${b}x-${a})^2 = ${b * b}x^2 - ${2 * b * a}x + ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}+(${b}x-${a})^2 = ${c}+(${b * b}x^2-${2 * b * a}x+${a * a}) = ${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}+(${b}x-${a})^2=${c}+(${b * b}x^2-${2 * b * a}x+${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break

          case 222: // c - (bx-a)²
            texte = `$${c}-(${b}x-${a})^2$`
            A2 = -b * b
            B2 = 2 * b * a
            C2 = c - a * a
            if (this.correctionDetaillee) {
              texteCorr += `On développe $(${b}x-${a})^2$.<br>`
              texteCorr += `$(${b}x-${a})^2 = ${b * b}x^2 - ${2 * b * a}x + ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}-(${b}x-${a})^2 = ${c}-(${b * b}x^2-${2 * b * a}x+${a * a}) = ${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}-(${b}x-${a})^2=${c}-(${b * b}x^2-${2 * b * a}x+${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break

          case 223: // c × (bx-a)²
            texte = `$${c}(${b}x-${a})^2$`
            A2 = c * b * b
            B2 = c * -2 * b * a
            C2 = c * a * a
            if (this.correctionDetaillee) {
              texteCorr += `On développe $(${b}x-${a})^2$.<br>`
              texteCorr += `$(${b}x-${a})^2 = ${b * b}x^2 - ${2 * b * a}x + ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}(${b}x-${a})^2 = ${c}(${b * b}x^2-${2 * b * a}x+${a * a}) = ${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}(${b}x-${a})^2=${c}(${b * b}x^2-${2 * b * a}x+${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break

          // case 131: // c + (x-a)(x+a)
          case 131: {
            const signOrder = choice(['true', 'false'])
            const first = signOrder === 'true' ? `(x-${a})` : `(x+${a})`
            const second = signOrder === 'true' ? `(x+${a})` : `(x-${a})`

            texte = `$${c}+${first}${second}$`
            // (x-a)(x+a) = x^2 - a^2
            const A2 = 1
            const B2 = 0
            const C2 = c - a * a

            if (this.correctionDetaillee) {
              texteCorr += `On développe $${first}${second}$.<br> `
              texteCorr += `$${first}${second} = x^2 - ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}+${first}${second}=${c}+(x^2-${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}+${first}${second}=${c}+(x^2-${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }

            break
          }

          // case 132: // c - (x-a)(x+a)
          case 132: {
            const signOrder = choice(['true', 'false'])
            const first = signOrder === 'true' ? `(x-${a})` : `(x+${a})`
            const second = signOrder === 'true' ? `(x+${a})` : `(x-${a})`

            texte = `$${c}-${first}${second}$`
            // -(x^2 - a^2) = -x^2 + a^2
            const A2 = -1
            const B2 = 0
            const C2 = c + a * a

            if (this.correctionDetaillee) {
              texteCorr += `On développe $${first}${second}$.<br> `
              texteCorr += `$${first}${second} = x^2 - ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}-${first}${second}=${c}-(x^2-${a * a})=${c}-x^2+${a * a}=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}-${first}${second}=${c}-(x^2-${a * a})=${c}-x^2+${a * a}=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }

            break
          }

          // case 133: // c × (x-a)(x+a)
          case 133: {
            const signOrder = choice(['true', 'false'])
            const first = signOrder === 'true' ? `(x-${a})` : `(x+${a})`
            const second = signOrder === 'true' ? `(x+${a})` : `(x-${a})`

            texte = `$${c}${first}${second}$`
            // c(x^2 - a^2) = c x^2 - c a^2
            const A2 = c
            const B2 = 0
            const C2 = -c * a * a

            if (this.correctionDetaillee) {
              texteCorr += `On développe $${first}${second}$.<br> `
              texteCorr += `$${first}${second} = x^2 - ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}${first}${second}=${c}(x^2-${a * a})=${c}x^2-${c * a * a}=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}${first}${second}=${c}(x^2-${a * a})=${c}x^2-${c * a * a}=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break
          }

          // case 231: // c + (bx-a)(bx+a)
          case 231: {
            const signOrder = choice(['true', 'false'])
            const first = signOrder === 'true' ? `(${b}x-${a})` : `(${b}x+${a})`
            const second =
              signOrder === 'true' ? `(${b}x+${a})` : `(${b}x-${a})`

            texte = `$${c}+${first}${second}$`
            // (bx-a)(bx+a) = b^2 x^2 - a^2
            const A2 = b * b
            const B2 = 0
            const C2 = c - a * a

            if (this.correctionDetaillee) {
              texteCorr += `On développe $${first}${second}$.<br> `
              texteCorr += `$${first}${second} = ${b * b}x^2 - ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}+${first}${second}=${c}+(${b * b}x^2-${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}+${first}${second}=${c}+(${b * b}x^2-${a * a})=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }

            break
          }

          // case 232: // c - (bx-a)(bx+a)
          case 232: {
            const signOrder = choice(['true', 'false'])
            const first = signOrder === 'true' ? `(${b}x-${a})` : `(${b}x+${a})`
            const second =
              signOrder === 'true' ? `(${b}x+${a})` : `(${b}x-${a})`

            texte = `$${c}-${first}${second}$`
            // -(b^2 x^2 - a^2) = -b^2 x^2 + a^2
            const A2 = -b * b
            const B2 = 0
            const C2 = c + a * a

            if (this.correctionDetaillee) {
              texteCorr += `On développe $${first}${second}$.<br> `
              texteCorr += `$${first}${second} = ${b * b}x^2 - ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}-${first}${second}=${c}-(${b * b}x^2-${a * a})=${c}-${b * b}x^2+${a * a}=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}-${first}${second}=${c}-(${b * b}x^2-${a * a})=${c}-${b * b}x^2+${a * a}=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break
          }

          // case 233: // c × (bx-a)(bx+a)
          case 233: {
            const signOrder = choice(['true', 'false'])
            const first = signOrder === 'true' ? `(${b}x-${a})` : `(${b}x+${a})`
            const second =
              signOrder === 'true' ? `(${b}x+${a})` : `(${b}x-${a})`

            texte = `$${c}${first}${second}$`
            // c(b^2 x^2 - a^2) = c b^2 x^2 - c a^2
            const A2 = c * b * b
            const B2 = 0
            const C2 = -c * a * a

            if (this.correctionDetaillee) {
              texteCorr += `On développe $${first}${second}$.<br> `
              texteCorr += `$${first}${second} = ${b * b}x^2 - ${a * a}$<br>`
              texteCorr += `Puis on remplace.<br>`
              texteCorr += `$${c}${first}${second}=${c}(${b * b}x^2-${a * a})=${c * b * b}x^2-${c * a * a}=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            } else {
              texteCorr += `$${c}${first}${second}=${c}(${b * b}x^2-${a * a})=${c * b * b}x^2-${c * a * a}=${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}$`
            }
            break
          }
        }

        if (this.interactif) {
          handleAnswers(this, i, {
            reponse: {
              value: `${reduireAxPlusByPlusC(A2, B2, C2, 'x^2', 'x')}`,
              options: { developpementEgal: true },
            },
          })
          texte +=
            ' $=$ ' +
            ajouteChampTexteMathLive(
              this,
              i,
              KeyboardType.clavierDeBaseAvecVariable,
            )
        }

        const textCorrSplit = texteCorr.split('=')
        let aRemplacer = textCorrSplit[textCorrSplit.length - 1]
        aRemplacer = aRemplacer.replaceAll('$', '')

        texteCorr = ''
        for (let ee = 0; ee < textCorrSplit.length - 1; ee++) {
          texteCorr += textCorrSplit[ee] + '='
        }
        texteCorr += ` ${miseEnEvidence(aRemplacer)}$`

        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
