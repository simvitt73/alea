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

type CaseTrig = { valueLatex: string; sols: string[]; refAngleLatex: string }

export default class Trigonometrie extends ExerciceQcmA {
  versionOriginale: () => void = () => {
    this.enonce = 'Résoudre $\\cos(x)=\\dfrac12$ sur $[0~;~2\\pi]$ ?'
    const ensembleSans$ = 'S=\\left\\{\\pi/3~;~5\\pi/3\\right\\}'
    this.correction =
      'On sait que $\\cos\\left(\\dfrac{\\pi}{3}\\right)=\\dfrac12$. ' +
      'Parité de la fonction cosinus : $\\cos\\left(-\\dfrac{\\pi}{3}\\right)=\\dfrac12$. ' +
      "Comme $-\\dfrac{\\pi}{3}\\notin[0~;~2\\pi]$, on prend $-\\dfrac{\\pi}{3}+2\\pi=\\dfrac{5\\pi}{3}$. " +
      `Donc $$${miseEnEvidence(ensembleSans$)}$$.`
    this.reponses = [
      '$S=\\left\\{\\pi/3~;~5\\pi/3\\right\\}$',
      '$S=\\left\\{\\pi/3~;~2\\pi/3\\right\\}$',
      '$S=\\left\\{-\\pi/3~;~\\pi/3\\right\\}$',
      '$S=\\left\\{\\pi/3~;~4\\pi/3\\right\\}$',
    ]
  }

  // Cas SIN : on retire sin(x)=1 (évite {π/2 ; π/2})
  private getSinCases(): CaseTrig[] {
    return [
      { valueLatex: '0', refAngleLatex: '0', sols: ['0', '\\pi'] },
      { valueLatex: '\\dfrac12', refAngleLatex: '\\dfrac{\\pi}{6}', sols: ['\\dfrac{\\pi}{6}', '\\dfrac{5\\pi}{6}'] },
      { valueLatex: '\\dfrac{\\sqrt2}{2}', refAngleLatex: '\\dfrac{\\pi}{4}', sols: ['\\dfrac{\\pi}{4}', '\\dfrac{3\\pi}{4}'] },
      { valueLatex: '\\dfrac{\\sqrt3}{2}', refAngleLatex: '\\dfrac{\\pi}{3}', sols: ['\\dfrac{\\pi}{3}', '\\dfrac{2\\pi}{3}'] },
    ]
  }

  private getCosCases(): CaseTrig[] {
    return [
      { valueLatex: '1', refAngleLatex: '0', sols: ['0', '2\\pi'] },
      { valueLatex: '\\dfrac{\\sqrt3}{2}', refAngleLatex: '\\dfrac{\\pi}{6}', sols: ['\\dfrac{\\pi}{6}', '\\dfrac{11\\pi}{6}'] },
      { valueLatex: '\\dfrac{\\sqrt2}{2}', refAngleLatex: '\\dfrac{\\pi}{4}', sols: ['\\dfrac{\\pi}{4}', '\\dfrac{7\\pi}{4}'] },
      { valueLatex: '\\dfrac12', refAngleLatex: '\\dfrac{\\pi}{3}', sols: ['\\dfrac{\\pi}{3}', '\\dfrac{5\\pi}{3}'] },
      { valueLatex: '0', refAngleLatex: '\\dfrac{\\pi}{2}', sols: ['\\dfrac{\\pi}{2}', '\\dfrac{3\\pi}{2}'] },
    ]
  }

  // --- utilitaires d'affichage ---
  private ensembleLatex(sols: string[]): string {
    return `S=\\left\\{${sols[0]}~;~${sols[1]}\\right\\}` // SANS dollars
  }
  private solutionsDistinctes(s: string[]): boolean {
    return s.length === 2 && s[0] !== s[1]
  }

  // --- familles d’angles pour distracteurs ciblés ---
  private familleAngles(refAngleLatex: string): string[] | null {
    switch (refAngleLatex) {
      case '\\dfrac{\\pi}{4}':
        return ['\\dfrac{\\pi}{4}', '\\dfrac{3\\pi}{4}', '\\dfrac{5\\pi}{4}', '\\dfrac{7\\pi}{4}']
      case '\\dfrac{\\pi}{3}':
        return ['\\dfrac{\\pi}{3}', '\\dfrac{2\\pi}{3}', '\\dfrac{4\\pi}{3}', '\\dfrac{5\\pi}{3}']
      case '\\dfrac{\\pi}{6}':
        return ['\\dfrac{\\pi}{6}', '\\dfrac{5\\pi}{6}', '\\dfrac{7\\pi}{6}', '\\dfrac{11\\pi}{6}']
      default:
        return null
    }
  }

  private combinaisonsDeux(angles: string[]): string[][] {
    const res: string[][] = []
    for (let i = 0; i < angles.length; i++) {
      for (let j = i + 1; j < angles.length; j++) {
        res.push([angles[i], angles[j]])
      }
    }
    return res
  }

  private genereDistracteursFamille(cas: CaseTrig): string[][] {
    const fam = this.familleAngles(cas.refAngleLatex)
    if (!fam) return [] // pas de famille ciblée -> on laissera le fallback
    const toutes = this.combinaisonsDeux(fam)

    // exclure la vraie paire (quel que soit l'ordre)
    const vraiA = cas.sols[0], vraiB = cas.sols[1]
    const filtrées = toutes.filter(
      ([a, b]) =>
        !(
          (a === vraiA && b === vraiB) ||
          (a === vraiB && b === vraiA)
        )
    )

    // piocher 3 au hasard
    const pool = [...filtrées]
    const res: string[][] = []
    while (res.length < 3 && pool.length > 0) {
      const k = randint(0, pool.length - 1)
      res.push(pool[k])
      pool.splice(k, 1)
    }
    return res
  }

  // fallback générique propre (sans dupliquer le bon cas)
  private genereDistracteursGeneriques(fonction: 'sin' | 'cos', indexCorrect: number): string[][] {
    const all = (fonction === 'sin' ? this.getSinCases() : this.getCosCases())
    const pool = all
      .map((c, i) => ({ c, i }))
      .filter(({ i }) => i !== indexCorrect)
      .filter(({ c }) => this.solutionsDistinctes(c.sols))

    const choisis: string[][] = []
    while (choisis.length < 3 && pool.length > 0) {
      const k = randint(0, pool.length - 1)
      choisis.push(pool[k].c.sols)
      pool.splice(k, 1)
    }

    // sécurité si jamais
    const secu = [
      ['\\dfrac{\\pi}{6}', '\\dfrac{5\\pi}{6}'],
      ['\\dfrac{\\pi}{4}', '\\dfrac{3\\pi}{4}'],
      ['\\dfrac{\\pi}{3}', '\\dfrac{2\\pi}{3}'],
    ]
    let t = 0
    while (choisis.length < 3 && t < secu.length) choisis.push(secu[t++])
    return choisis
  }

  private setEnonceCorrectionEtReponses(
    fonction: 'sin' | 'cos',
    cas: CaseTrig,
    distracteurs: string[][]
  ) {
    const fLatex = fonction === 'sin' ? '\\sin' : '\\cos'
    const valeur = cas.valueLatex

    // Énoncé
    this.enonce = `Résoudre $${fLatex}(x)=${valeur}$ sur $[0~;~2\\pi]$ ?`

    // Ensemble solution (sans dollars pour miseEnEvidence)
    const ensembleSans$ = this.ensembleLatex(cas.sols)

    // Correction (première valeur + ensemble en évidence)
    const premiere = cas.sols[0]
    const intro =
      fonction === 'sin'
        ? `On sait que $\\sin(${cas.refAngleLatex})=${valeur}$. `
        : `On sait que $\\cos(${cas.refAngleLatex})=${valeur}$. `
    this.correction =
      `${intro}La première valeur du cercle trigo qui convient est $x=${premiere}$. ` +
      `Donc $${miseEnEvidence(ensembleSans$)}$.`

    // Réponses QCM (avec dollars, sans miseEnEvidence)
    const bonne = `$${ensembleSans$}$`
    const mauvaises = distracteurs.slice(0, 3).map(d => `$${this.ensembleLatex(d)}$`)
    this.reponses = [bonne, ...mauvaises]
  }

  versionAleatoire = () => {
    const fonction: 'sin' | 'cos' = choice(['sin', 'cos'])
    const cases = fonction === 'sin' ? this.getSinCases() : this.getCosCases()

    const idx = randint(0, cases.length - 1)
    const cas = cases[idx]

    // 1) Distracteurs “famille” (π/4, π/3, π/6) si applicable
    let distracteurs = this.genereDistracteursFamille(cas)

    // 2) Sinon fallback générique propre
    if (distracteurs.length < 3) {
      distracteurs = this.genereDistracteursGeneriques(fonction, idx)
    }

    this.setEnonceCorrectionEtReponses(fonction, cas, distracteurs)
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}
