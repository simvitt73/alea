import { choice } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '27/08/2025'
export const uuid = '73469'
//  @author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-C3-10'],
  'fr-ch': [],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Résoudre une équation trigonométrique'
export default class Trigonometrie extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce =
      'Résoudre $\\cos(x)=\\dfrac12$ sur $[0~;~2\\pi]$ ?'
    this.correction =
      'On sait que $\\cos\\left(\\dfrac{\\pi}{3}\\right)=\\dfrac12$.'
    this.correction += 'donc $\\cos\\left(\\dfrac{-\\pi}{3}\\right)=\\dfrac12$ par parité de la fonction cosinus.'
    this.correction += `Comme $-\\pi/3 \\notin [0~;~2\\pi]$, on prend comme mesure d\'angle $-\\pi/3+2\\pi=\\dfrac{5\\pi}{3}$. Donc les solutions sont $${miseEnEvidence('x=\\dfrac{\\pi}{3}')}$ et $${miseEnEvidence('x=\\dfrac{5\\pi}{3}')}$.`

    this.reponses = [
      '$S=\\{\\pi/3~;~5\\pi/3\\}$',
      '$S=\\{\\pi/3~;~2\\pi/3\\}$',
      '$S=\\{-\\pi/3~;~\\pi/3\\}$',
      '$S=\\{\\pi/3~;~4\\pi/3\\}$',
    ]
  }

  versionAleatoire = () => {
    const fonction=choice(['sin','cos']) 
    const angle=choice([2,3,4,6])
    if (fonction === 'sin') {solution=[0,]
      this.enonce = `Soit $n$ un entier non nul.<br> À quelle expression est égale $\\dfrac{1}{\\left(-1\\right)^{n+${k}}}$  ?`
    if (k === 2 || k === 4 || k === 6) {
      this.correction = `Soit $n\\in \\mathbb{N}.$<br> $\\begin{aligned}\\left(-1\\right)^{n+${k}}&=\\left(-1\\right)^{n}\\times \\left(-1\\right)^${k}\\\\
      &=\\left(-1\\right)^{n}
    \\end{aligned}$<br>
   $\\begin{aligned}\\text{or, }\\dfrac{1}{\\left(-1\\right)^{n}}&=\\dfrac{1^n}{\\left(-1\\right)^{n}}\\\\
      &=\\left(\\dfrac{1}{-1}\\right)^{n}\\\\
      &=\\left(-1\\right)^{n}.\\\\
    \\end{aligned}$<br>
    En conséquence, pour tout entier $n$, on a $\\left(-1\\right)^{n+${k}}=${miseEnEvidence('\\dfrac{1}{\\left(-1\\right)^{n}}')}$.
    `
      this.reponses = [
        '$\\left(-1\\right)^{n} $',
        '$\\left(-1\\right)^{n+1}$ ',
        '$-\\left(-1\\right)^{n} $',
        '$\\left(-1\\right)^{n-1}$ ',
      ]
    } else {
      this.correction = `Soit $n\\in \\mathbb{N}.$<br>$\\begin{aligned}\\left(-1\\right)^{n+${k}}&=\\left(-1\\right)^${k}\\times \\left(-1\\right)^{n} \\\\
      &=-\\left(-1\\right)^{n}
    \\end{aligned}$<br>

     En conséquence, pour tout entier $n$, on a $\\left(-1\\right)^{n+${k}}=-\\dfrac{1}{\\left(-1\\right)^{n}}=${miseEnEvidence('-\\left(-1\\right)^{n}')}.$`
      this.reponses = [
        '$-\\left(-1\\right)^{n}$ ',
        '$\\left(-1\\right)^{n} $',
        '$\\left(-1\\right)^{n+2} $',
        '$-\\left(-1\\right)^{n+1} $',
      ]
    }
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
