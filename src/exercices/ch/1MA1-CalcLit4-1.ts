import { gestionnaireFormulaireTexte, listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'
import FractionEtendue from '../../modules/FractionEtendue'
import EquationSecondDegre from '../../modules/EquationSecondDegre'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence, texteEnCouleurEtGras } from '../../lib/outils/embellissements'

export const titre = 'Résoudre une équation à l\'aide de la méthode de complétion du carré'
export const dateDePublication = '31/10/2024'
export const interactifReady = false
export const uuid = '7f0dc'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['CalcLit4-1']
}

/**
 * @author Nathan Scheinmann
*/

export default class ExerciceEquationSecondDegre extends Exercice {
  constructor () {
    super()
    this.besoinFormulaireTexte = ['Type des solutions', '1 : Au moins une fractionnaire\n2 : Irrationnelles\n3 : Mélange']
    this.besoinFormulaire2CaseACocher = ['Coefficient dominant égal à 1', false]
    this.sup = 3
    this.nbQuestions = 3
    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = true
  }

  nouvelleVersion () {
    const typesDeQuestionsDisponibles = gestionnaireFormulaireTexte({
      saisie: this.sup,
      min: 1,
      max: 2,
      melange: 3,
      defaut: 3,
      listeOfCase: ['fraction', 'irrationnel'],
      nbQuestions: this.nbQuestions,
      shuffle: true
    })
    const listeTypeDeQuestions = combinaisonListes(typesDeQuestionsDisponibles, this.nbQuestions)

    if (this.nbQuestions === 1) {
      this.consigne = 'Résoudre l\'équation suivante en utilisant la méthode de complétion du carré.'
    } else {
      this.consigne = 'Résoudre les équations suivantes en utilisant la méthode de complétion du carré.'
    }
    if (this.interactif) {
      this.consigne += ' Entrer les solutions sous forme d\'un ensemble en séparant les éléments séparé par des point-virgules. Si une équation n\'a pas de solution entrer l\'ensemble vide.'
    }

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let texte = ''
      let texteCorr = ''
      let equation = new EquationSecondDegre(new FractionEtendue(1, 1), new FractionEtendue(1, 1), new FractionEtendue(1, 1), new FractionEtendue(0, 1), new FractionEtendue(0, 1), new FractionEtendue(0, 1), { variable: 'x', format: 'melangeComplique' })
      let a : FractionEtendue
      let b : FractionEtendue
      let c : FractionEtendue
      let s1: FractionEtendue
      let s2 : FractionEtendue
      if (listeTypeDeQuestions[i] === 'fraction') {
        do {
          s1 = new FractionEtendue(randint(-5, 5, [0]), randint(1, 5, [0, 4]))
          s2 = new FractionEtendue(randint(-5, 5, [0]), randint(1, 5, [0, 4]))
          let coeffLead : FractionEtendue
          if (this.sup2 === false) {
            coeffLead = new FractionEtendue(randint(-5, 5, [0]), 1)
          } else {
            coeffLead = new FractionEtendue(1, 1)
          }
          equation = EquationSecondDegre.aPartirDesSolutions(s1, s2, coeffLead, { variable: 'x', format: 'reduit' as string })
        } while ((s1.denIrred === 1 && s2.denIrred === 1) || (s1.den === s2.den && s1.num === s2.num))
        // TODO multiplier par le dénominateur commun pour avoir des coefficients entiers ou pas dépendant du cas.
      } else if (listeTypeDeQuestions[i] === 'irrationnel') {
        // Tant que b^2-4ac n'est pas un carré parfait
        do {
          if (this.sup2 === false) {
            a = new FractionEtendue(randint(-6, 6, [0]), 1)
          } else {
            a = new FractionEtendue(1, 1)
          }
          b = new FractionEtendue(randint(-6, 6), 1)
          c = new FractionEtendue(randint(-6, 6), 1)
          equation = EquationSecondDegre.aPartirDesCoefficients(a, b, c, new FractionEtendue(0, 1), new FractionEtendue(0, 1), new FractionEtendue(0, 1), { variable: 'x', format: 'reduit' as string })
        } while (equation.delta.estParfaite === true || equation.delta.num === 0 || equation.delta.signe === -1)
      }
      texte += `$${equation.equationTex}$`
      const coefficientsEqReduite = equation.coefficientsEqReduite
      // Define the normalized coefficients using temporary variables
      const normalizedCoeff0 = coefficientsEqReduite[0].diviseFraction(coefficientsEqReduite[0]).simplifie()
      const normalizedCoeff1 = coefficientsEqReduite[1].diviseFraction(coefficientsEqReduite[0]).simplifie()
      const normalizedCoeff2 = coefficientsEqReduite[2].diviseFraction(coefficientsEqReduite[0]).simplifie()

      // Pass the normalized coefficients into the function
      const eqCoeffDom1 = EquationSecondDegre.aPartirDesCoefficients(
        normalizedCoeff0,
        normalizedCoeff1,
        normalizedCoeff2,
        new FractionEtendue(0, 1),
        new FractionEtendue(0, 1),
        new FractionEtendue(0, 1),
        { variable: 'x', format: 'reduit' as string }
      )
      if (this.correctionDetaillee) {
        texteCorr += `On applique la méthode de la complétion du carré pour résoudre l'équation \\[${equation.equationTex}.\\]`
        if (coefficientsEqReduite[0].texFraction !== '1') {
          texteCorr += `On divise l'équation par $${coefficientsEqReduite[0].texFraction}$, le coefficient dominant, pour obtenir une équation équivalente de la forme \\[${eqCoeffDom1.equationTex}.\\]`
        }
        texteCorr += `On complète le carré en additionnant et soustrayant le carré du ${texteEnCouleurEtGras('coefficient de $x$', 'blue')} divisé par 2.<br>
        C'est-à-dire que l'on ajoute et on soustrait à l'équation précédente \\[\\left(\\dfrac{${miseEnEvidence(`${eqCoeffDom1.coefficientsEqReduite[1].texFraction}`, 'blue')}}{2}\\right)^2=\\left(${eqCoeffDom1.coefficientsEqReduite[1].entierDivise(2).texFractionSimplifiee}\\right)^2=${eqCoeffDom1.coefficientsEqReduite[1].entierDivise(2).produitFraction(eqCoeffDom1.coefficientsEqReduite[1].entierDivise(2)).texFractionSimplifiee}\\].<br><br>
        $\\begin{aligned}`
        if (coefficientsEqReduite[0].texFractionSimplifiee === '1') {
          texteCorr += `&${equation.printToLatex()}&& \\text{équation initiale}\\\\`
        } else {
          texteCorr += `&${eqCoeffDom1.printToLatexMDG()}=0&&\\text{équation équivalente avec coefficient dominant égal à 1}\\\\`
        }

        texteCorr += '\\end{aligned}$'
      } else (texteCorr += `$${equation.ensembleDeSolutionsTex}$`)
      if (this.questionJamaisPosee(i, equation.ensembleDeSolutionsTex, equation.equationTex)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
