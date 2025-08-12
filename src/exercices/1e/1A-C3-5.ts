import { miseEnEvidence } from '../../lib/outils/embellissements'
import { randint } from '../../modules/outils'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '10/08/2025'
export const uuid = '6bf0f'
// Author Stéphane Guyon
export const refs = {
  'fr-fr': ['1A-C3-5'],
  'fr-ch': []
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer avec des puissances (5)'
export default class Puissances extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce = 'Soit $n$ un entier non-nul. A quelle expression est égale $2\\times\\left(2\\times 3^n+3\\times 2^n\\right)$ ?'
    this.correction = `On applique la propriété des puissances de puissances d'un réel : <br>
    Soit $n\\in \\mathbb{N}$, et $p \\in \\mathbb{N}$, on a : 
     $\\left(a^{n}\\right)^{p}=a^{np}$<br>
    $\\begin{aligned}\\left(3^{n}\\right)^{2}&=\\left(3^{n}\\right)^{2n}\\\\
    &=\\left(3^{2}\\right)^{n}\\\\
    &=9^{n}
    \\end{aligned}$`
    miseEnEvidence('$4\\times 3^{n}-3\\times 2^{n+1}$')

    this.reponses = [
      '$4\\times 3^{n}+3\\times 2^{n+1}$',
      '$ 4\\times 6^{n}$',
      '$4\\times 3^{n}+3\\times 4^{n}$',
      '$2\\times 6^{n}+6\\times 4^{n}$',
    ]
  }

  versionAleatoire = () => {
    const a = randint(2, 5)
    const b = randint(2, 5, a)

    this.enonce = `Soit $n$ un entier non-nul. A quelle expression est égale $${a}\\times\\left(${a}\\times ${b}^n+${b}\\times ${a}^n\\right)$ ?`
    this.correction = `    Soit $n\\in \\mathbb{N}$ on a : <br>
      $\\begin{aligned}${a}\\times\\left(${a}\\times ${b}^n+${b}\\times ${a}^n\\right)&=\\left(${a}\\times${a}\\times ${b}^n+${a}\\times${b}\\times ${a}^n\\right)\\\\
   &=${a ** 2}\\times ${b}^n+${b}\\times ${a}^{n+1}\\\\
    \\end{aligned}$<br>
    L'expression obtenue est $${miseEnEvidence(`${a ** 2}\\times ${b}^n+${b}\\times ${a}^{n+1}`)}$`
    this.reponses = [`$${a ** 2}\\times ${b}^n+${b}\\times ${a}^{n+1}$`,
      `$${a}\\times${a * b}^n$`,
      `$${a ** 2}\\times ${b * a}^n+${b * a}\\times ${a}^{n+1}$`,
      `$${a}\\times ${b * a}^n+${b}\\times ${a * a}^n$`
    ]
  }

  constructor () {
    super()
    this.versionAleatoire()
  }
}
