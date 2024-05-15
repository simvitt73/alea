import { sqrt } from 'mathjs'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, rienSi1 } from '../lib/outils/ecritures'
import { texNombre } from '../lib/outils/texNombre'
import FractionEtendue from './FractionEtendue'
import { ComputeEngine, type BoxedExpression } from '@cortex-js/compute-engine'

const ce = new ComputeEngine()

function soluceEE (expr:BoxedExpression):BoxedExpression {
  if (expr.ops) { // Pour ne pas accepter les +0 ou les \\times1
    return expr.engine.box([expr.head,
      ...expr.ops.map((x) =>
        soluceEE(x)
      )], { canonical: ['Multiply'] })
  }
  return expr.canonical
}

// créer une fonction qui construit une équation du second degré. On peut la créer à partir de solutions, à partir des coefficients ou simplement donner des conditions sur la solution et les coefficients pour la créer.
class EquationSecondDegre {
  coefficients: FractionEtendue[]
  coefficientsEqReduite: FractionEtendue[]
  delta: FractionEtendue
  nombreSolutions: number
  solutionsListeTex: string[]
  ensembleDeSolutionsTex: string
  natureDesSolutions: string
  constructor (a: FractionEtendue, b: FractionEtendue, c: FractionEtendue, d: FractionEtendue, e: FractionEtendue, f: FractionEtendue) {
    this.coefficients = [a, b, c, d, e, f]
    this.coefficientsEqReduite = [a.differenceFraction(d), b.differenceFraction(e), c.differenceFraction(f), new FractionEtendue(0, 1), new FractionEtendue(0, 1), new FractionEtendue(0, 1)]
    this.delta = this.coefficientsEqReduite[1].produitFraction(this.coefficientsEqReduite[1]).differenceFraction(this.coefficientsEqReduite[0].produitFraction(this.coefficientsEqReduite[2]).produitFraction(4))
    this.nombreSolutions = 0
    if (this.delta.num > 0) {
      this.nombreSolutions = 2
    } else if (this.delta.num === 0) {
      this.nombreSolutions = 1
    } else {
      this.nombreSolutions = 0
    }
    this.solutionsListeTex = []
    this.natureDesSolutions = ''
    if (this.nombreSolutions > 0) {
      if (this.delta.estParfaite) {
        if (this.coefficientsEqReduite[1].multiplieEntier(-1).differenceFraction(new FractionEtendue(sqrt(this.delta.num) as number, sqrt(this.delta.den) as number)).produitFraction((a.multiplieEntier(2)).inverse()).den === 1) {
          this.natureDesSolutions = 'entier'
        } else {
          this.natureDesSolutions = 'fractionnaire'
        }
      }
    } else { this.natureDesSolutions = 'irrationnel' }
    if (this.natureDesSolutions === 'entier' || this.natureDesSolutions === 'fractionnaire') {
      this.solutionsListeTex = [`${this.coefficientsEqReduite[1].multiplieEntier(-1).differenceFraction(new FractionEtendue(sqrt(this.delta.num) as number, sqrt(this.delta.den) as number)).produitFraction((this.coefficientsEqReduite[0].multiplieEntier(2)).inverse()).texFSD}`, `${this.coefficientsEqReduite[1].multiplieEntier(-1).sommeFraction(new FractionEtendue(sqrt(this.delta.num) as number, sqrt(this.delta.den) as number)).produitFraction((this.coefficientsEqReduite[0].multiplieEntier(2)).inverse()).texFSD}`]
      const expr = this.coefficientsEqReduite[0].texFractionSignee + '*x^2' + this.coefficientsEqReduite[1].texFractionSignee + '*x' + '+' + this.coefficientsEqReduite[2].texFSD + '=0'
      console.log(expr)
      // const eq = ce.parse(expr)
      const eq = ce.parse(expr, { canonical: ['InvisibleOperator', 'Order'] })
      // console.log(eq, 'te', eq.solve('x')[0].latex)
    } else {
      const expr = this.coefficientsEqReduite[0].texFractionSignee + '*x^2' + this.coefficientsEqReduite[1].texFractionSignee + '*x' + '+' + this.coefficientsEqReduite[2].texFSD + '=0'
      console.log(expr)
      const eq = ce.parse(expr)
      // const ee = expr.engine.box
      // console.log('toto', eq, 'te', soluceEE(ce.parse(this.eq.solve('x')[1])).latex)
      // console.log('toto', eq, 'te', eq.solve('x')[1])
      console.log('Equation', eq.latex)
      console.log('Ancienne Solution', eq.solve('x')[1].latex)
      console.log('Nouvelle Solution', soluceEE(eq.solve('x')[1]).latex)
      console.log(' ')
      console.log(ce.serialize(ce.box(ce.parse(eq.solve('x')[1].latex))), { canonical: true }, eq.solve('x')[1].latex)
    }
    this.ensembleDeSolutionsTex = this.delta.num < 0 ? 'S=\\emptyset' : this.delta.num > 0 ? 'S = \\{' + this.solutionsListeTex.join(';') + '\\}' : `S=${this.solutionsListeTex[0]}`
  }

  // Méthode pour créer une équation à partir des coefficients
  static aPartirDesCoefficients (a: FractionEtendue, b: FractionEtendue, c: FractionEtendue, d: FractionEtendue, e: FractionEtendue, f: FractionEtendue): EquationSecondDegre {
    return new EquationSecondDegre(a, b, c, d, e, f)
  }

  // Méthode pour créer une équation à partir des solutions
  static aPartirDesSolutions (sol1: FractionEtendue, sol2: FractionEtendue, coeffLead: FractionEtendue): EquationSecondDegre {
    const a = coeffLead
    const b = sol1.sommeFraction(sol2).multiplieEntier(-1).produitFraction(coeffLead)
    const c = sol1.produitFraction(sol2).produitFraction(coeffLead)
    const d = new FractionEtendue(0, 1)
    const e = new FractionEtendue(0, 1)
    const f = new FractionEtendue(0, 1)
    return new EquationSecondDegre(a, b, c, d, e, f)
  }

  // Méthode pour créer une équation à partir du type de jeu de coefficients
  // static aPartirDuTypeDesCoefficients (type: string): EquationSecondDegre {
  //   const fractionNulle = new FractionEtendue(0, 1)
  //   let coefficients: FractionEtendue[] = [fractionNulle, fractionNulle, fractionNulle, fractionNulle, fractionNulle, fractionNulle] // Initialiser avec tous les coefficients à 0

  //   switch (type) {
  //     case 'naturels':
  //       // Définir les coefficients pour les nombres naturels
  //       coefficients = [fractionNulle, fractionNulle, fractionNulle, fractionNulle, fractionNulle, fractionNulle] // Exemple de coefficients
  //       break
  //     case 'entiers':
  //       // Définir les coefficients pour les entiers
  //       coefficients = [fractionNulle, fractionNulle, fractionNulle, fractionNulle, fractionNulle, fractionNulle] // Exemple de coefficients
  //       break
  //     case 'décimaux':
  //       // Définir les coefficients pour les nombres décimaux
  //       coefficients = [fractionNulle, fractionNulle, fractionNulle, fractionNulle, fractionNulle, fractionNulle] // Exemple de coefficients
  //       break
  //     case 'fraction':
  //       // Définir les coefficients pour les fractions
  //       coefficients = [fractionNulle, fractionNulle, fractionNulle, fractionNulle, fractionNulle, fractionNulle] // Exemple de coefficients
  //       break
  //     default:
  //       // Par défaut, utiliser les nombres naturels si le type n'est pas reconnu
  //       coefficients = [fractionNulle, fractionNulle, fractionNulle, fractionNulle, fractionNulle, fractionNulle] // Exemple de coefficients
  //   }

  //   return new EquationSecondDegre(coefficients[0], coefficients[1], coefficients[2], coefficients[3], coefficients[4], coefficients[5])
  // }

  printToLatex (): string {
    let expr = ''
    let checkPreviousNull = true
    const nomVal = ['x^2', 'x', '', 'x^2', 'x', '']
    for (let i = 0; i < 3; i++) {
      if ((this.coefficients.slice(0, 3).every(item => item.num === 0)) && i === 0) {
        expr = expr + '0'
      } else if (!(this.coefficients[i].num === 0) && checkPreviousNull) {
        if (nomVal[i] === '') {
          expr = expr + `${texNombre(this.coefficients[i], 0)}${nomVal[i]}`
        } else {
          expr = expr + `${rienSi1(this.coefficients[i])}${nomVal[i]}`
        }
        checkPreviousNull = false
      } else if (!(this.coefficients[i].num === 0) && !checkPreviousNull) {
        if (nomVal[i] === '') {
          expr = expr + `${ecritureAlgebrique(this.coefficients[i])}${nomVal[i]}`
        } else {
          expr = expr + `${ecritureAlgebriqueSauf1(this.coefficients[i])}${nomVal[i]}`
        }
        checkPreviousNull = false
      }
    }
    expr = expr + '='
    checkPreviousNull = true
    for (let i = 3; i < 6; i++) {
      if ((this.coefficients.slice(3).every(item => item.num === 0)) && i === 3) {
        expr = expr + '0'
      } else if (!(this.coefficients[i].num === 0) && checkPreviousNull) {
        if (nomVal[i] === '') {
          expr = expr + `${texNombre(this.coefficients[i], 0)}${nomVal[i]}`
        } else {
          expr = expr + `${rienSi1(this.coefficients[i])}${nomVal[i]}`
        }
        checkPreviousNull = false
      } else if (!(this.coefficients[i].num === 0) && !checkPreviousNull) {
        if (nomVal[i] === '') {
          expr = expr + `${ecritureAlgebrique(this.coefficients[i])}${nomVal[i]}`
        } else {
          expr = expr + `${ecritureAlgebriqueSauf1(this.coefficients[i])}${nomVal[i]}`
        }
        checkPreviousNull = false
      }
    }
    return expr
  }
}

export default EquationSecondDegre
