import { choice } from '../../lib/outils/arrayOutils'
import { ecritureAlgebrique } from '../../lib/outils/ecritures'
import { texNombre } from '../../lib/outils/texNombre'
import FractionEtendue from '../../modules/FractionEtendue'
import { gestionnaireFormulaireTexte, randint } from '../../modules/outils'
import Exercice from '../Exercice'
export const titre = 'Démontrer ou infirmer une égalité'
export const dateDePublication = '30/01/2026'

export const interactifReady = false
export const uuid = '1188c'
export const refs = {
  'fr-fr': ['4L14-3'],
  'fr-ch': [],
}
export default class DemontrerUneEgalite extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
    this.besoinFormulaireTexte = [
      "Types d'égalités",
      `Nombres séparés par des tirets\n
        1 : ax+b = c(x+d)\n
        2 : ax+b(x+d) = cx\n
        0 : Mélange`,
    ]
    this.sup = '1'
    this.besoinFormulaire2Texte = [
      'Types de problématiques',
      `Nombres séparés par des tirets\n
        1 : Tester l'égalité pour un nombre donné\n
        2 : Démontrer l'égalité pour tout nombre\n
        0 : Mélange`,
    ]
    this.sup2 = '1'
  }

  nouvelleVersion() {
    const listeTypeDeEgalites = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 2,
      melange: 0,
      defaut: 0,
      nbQuestions: this.nbQuestions,
    }).map(Number)
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const typeDeEgalite = listeTypeDeEgalites[i]
      const isTrueOrFalse = Math.random() < 0.5
      const question: {
        membre1: string[]
        membre2: string[]
        solutions: FractionEtendue[]
      } = this.genererSituation(typeDeEgalite, isTrueOrFalse)
      const correction: string[] = this.genereCorrection(
        question,
        typeDeEgalite,
        isTrueOrFalse,
      )
      const membre1Initial = question.membre1[0]
      const membre2Initial = question.membre2[0]

      const egalite = `${membre1Initial} = ${membre2Initial}`
      const typeDeQuestions = gestionnaireFormulaireTexte({
        saisie: this.sup2,
        min: 1,
        max: 2,
        melange: 0,
        defaut: 0,
        nbQuestions: Math.min(2, String(this.sup2).split('-').length),
      })
        .map(Number)
        .sort((a, b) => a - b)

      const questions: string[] = []
      const corrections: string[] = []
      const choixDuNombre = Math.random() < 0.5
      const nombreChoisi = choixDuNombre
        ? randint(
            -10,
            10,
            question.solutions.map((s) => s.toNumber()),
          )
        : choice(question.solutions)
      for (let k = 0; k < typeDeQuestions.length; k++) {
        const typeDeQuestion = typeDeQuestions[k]
        switch (typeDeQuestion) {
          case 1:
            questions.push(
              `Vérifier si l'égalité $${egalite}$ est vraie pour $x = ${nombreChoisi instanceof FractionEtendue ? `${nombreChoisi.texFractionSimplifiee}` : texNombre(nombreChoisi)}$.`,
            )
            corrections.push('')
            break
          case 2:
            questions.push(
              `Démontrer si l'égalité $${egalite}$ est vraie ou fausse pour tout nombre x.`,
            )
            corrections.push('')
            break
        }
      }

      if (this.questionJamaisPosee(i, egalite)) {
        this.listeQuestions.push(...questions)
        this.listeCorrections.push(...corrections)
        i++
        cpt = 0
      }
      cpt++
    }
  }

  genererSituation(typeQuestion: number, isTrueCase: boolean) {
    const question: {
      membre1: string[]
      membre2: string[]
      solutions: FractionEtendue[]
    } = {
      membre1: [],
      membre2: [],
      solutions: [],
    }
    switch (typeQuestion) {
      case 1: //  ax+b =? c(x+d)
        {
          const a = randint(2, 10)
          const c = isTrueCase ? a : randint(2, 10, a)
          const d = randint(1, 5)
          const b = isTrueCase ? c * d : randint(1, 10, c * d)
          question.membre1 = [`${a}x ${ecritureAlgebrique(b)}`]
          question.membre2 = [`${c}(x ${ecritureAlgebrique(d)})`]
          question.solutions = [new FractionEtendue(c * d - b, a - c)]
        }
        break
      case 2: // ax+b(x+d) =? cx
        {
          const a = randint(2, 10)
          const c = isTrueCase ? a : randint(2, 10, a)
          const d = randint(1, 5)
          const b = isTrueCase ? c * d : randint(1, 10, c * d)
          question.membre1 = [
            `${a}x ${ecritureAlgebrique(b)}(x ${ecritureAlgebrique(d)})`,
          ]
          question.membre2 = [`${c}x`]
          question.solutions = [new FractionEtendue(c * d - b, a - c)]
        }
        break
    }
    return question
  }

  genereCorrection(
    question: {
      membre1: string[]
      membre2: string[]
      solutions: FractionEtendue[]
    },
    typeDeEgalite: number,
    isTrueCase: boolean,
  ) {
    const correction: string[] = []
    switch (typeDeEgalite) {
      case 1:
        correction.push(
          `En développant et en simplifiant, on trouve que l'égalité revient à résoudre l'équation ${isTrueCase ? '0 = 0' : `${question.solutions[0].texFractionSimplifiee} = 0`}.`,
        )
        if (isTrueCase) {
          correction.push(`Cette égalité est vraie pour tout nombre x.`)
        } else {
          correction.push(
            `Cette égalité est fausse pour tout nombre x sauf pour x = ${question.solutions[0].texFractionSimplifiee}.`,
          )
        }
        break
      case 2:
        correction.push(
          `En développant et en simplifiant, on trouve que l'égalité revient à résoudre l'équation ${isTrueCase ? '0 = 0' : `${question.solutions[0].texFractionSimplifiee} = 0`}.`,
        )
        if (isTrueCase) {
          correction.push(`Cette égalité est vraie pour tout nombre x.`)
        } else {
          correction.push(
            `Cette égalité est fausse pour tout nombre x sauf pour x = ${question.solutions[0].texFractionSimplifiee}.`,
          )
        }
        break
    }
    return correction
  }
}
