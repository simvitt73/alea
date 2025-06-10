import { PatternNumerique } from '../../lib/2d/polygones'
import { shuffle } from '../../lib/outils/arrayOutils'
import Exercice from '../Exercice'
import { fixeBordures, mathalea2d, type NestedObjetMathalea2dArray } from '../../modules/2dGeneralites'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { miseEnEvidence } from '../../lib/outils/embellissements'

export const titre = 'Comprendre un algorithme itératif'
export const interactifReady = true
export const interactifType = 'mathLive'

// Gestion de la date de publication initiale
export const dateDePublication = '10/06/2025'

/**
 * Étudier les premiers termes d'une série de motifs afin de donner le nombre de formes du motif suivant.
 * Les patterns sont des motifs numériques qui évoluent selon des règles définies.
 * Cet exercice contient des patterns issus de l'excellent site : https://www.visualpatterns.org/
 * @author Jean-Claude Lhote
 */
export const uuid = '328b3'

export const refs = {
  'fr-fr': ['6I13'],
  'fr-ch': []
}

export default class PaternNum0 extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 3
    this.comment = `Étudier les premiers termes d'une série de motifs afin de donner le nombre de formes du motif suivant.\n
 Les patterns sont des motifs numériques qui évoluent selon des règles définies.\n
 Cet exercice contient des patterns issus de l'excellent site : https://www.visualpatterns.org/`
    this.besoinFormulaireNumerique = ['Nombre de figures par question', 4]
    this.sup = 3
  }

  nouvelleVersion (): void {
    const nbFigures = Math.max(2, this.sup)
    const patterns = shuffle(listePatterns())
    for (let i = 0; i < this.nbQuestions;) {
      const objets: NestedObjetMathalea2dArray = []
      const pattern = patterns[i]
      const objetsCorr = pattern.render(nbFigures + 1, 0, 0)
      let yMax = 0
      let texte = `Voici les ${nbFigures} premiers motifs d'une série de motifs numériques. Ils évoluent selon des règles définies.<br>`
      let objet = pattern.render(1, 0, 0)
      for (let j = 1; j <= nbFigures; j++) {
        objets.push(objet)
        const { xmax, ymax } = fixeBordures(objet)
        yMax = Math.max(yMax, ymax)
        objet = pattern.render(j + 1, xmax + 2, 0)
      }
      texte += mathalea2d(Object.assign(fixeBordures(objets), { ymax: yMax + 1 }), objets)
      texte += `\n${this.interactif ? 'Quel sera le nombre de carreaux dans le motif suivant ?' : 'Dessiner le motif suivant.'}<br>`
      const nbSquares = pattern.render(nbFigures + 1, 0, 0).length
      if (this.interactif) {
        texte += ajouteChampTexteMathLive(this, i)
        handleAnswers(this, i, { reponse: { value: nbSquares } })
      }
      const texteCorr = `Le motif suivant contient $${miseEnEvidence(nbSquares)}$ carreaux.<br>
      ${mathalea2d(Object.assign({}, fixeBordures(objetsCorr)), objetsCorr)}`
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      i++
    }
  }
}
function listePatterns (): PatternNumerique[] {
  const pat0 = new PatternNumerique(
    [
      [0, 0],
      [0, 1],
      [1, 0],
    ]
  )
  pat0.iterate = function () {
    const newCells = new Set<string>()

    for (const key of this.cells) {
      const [x, y] = PatternNumerique.keyToCoord(key)
      let replaced = false
      // Check neighbor below
      if (this.hasCell(x, y - 1)) {
        newCells.add(PatternNumerique.coordToKey([x, y]))
        newCells.add(PatternNumerique.coordToKey([x, y + 1]))
        replaced = true
      }

      // Check neighbor to the left
      if (this.hasCell(x - 1, y)) {
        newCells.add(PatternNumerique.coordToKey([x, y]))
        newCells.add(PatternNumerique.coordToKey([x + 1, y]))
        replaced = true
      }

      // If no replacement triggered, keep original cell
      if (!replaced) {
        newCells.add(PatternNumerique.coordToKey([x, y]))
      }
    }
    return newCells
  }
  const pat1 = new PatternNumerique(
    [
      [0, 0]
    ]
  )
  pat1.iterate = function () {
    const newCells = new Set<string>()
    for (const key of this.cells) {
      const [x, y] = PatternNumerique.keyToCoord(key)
      newCells.add(PatternNumerique.coordToKey([x, y]))
      newCells.add(PatternNumerique.coordToKey([x + 1, y]))
      newCells.add(PatternNumerique.coordToKey([x, y + 1]))
      newCells.add(PatternNumerique.coordToKey([x + 1, y + 1]))
    }
    return newCells
  }
  const pat2 = new PatternNumerique(
    [
      [0, 0]
    ]
  )
  pat2.iterate = function () {
    const newCells = new Set<string>()
    for (const key of this.cells) {
      const [x, y] = PatternNumerique.keyToCoord(key)
      if (y === 0) {
        newCells.add(PatternNumerique.coordToKey([x, y]))
        newCells.add(PatternNumerique.coordToKey([x, y + 1]))
        newCells.add(PatternNumerique.coordToKey([x + 1, y]))
      } else {
        newCells.add(PatternNumerique.coordToKey([x, y]))
      }
    }
    return newCells
  }
  const pat3 = new PatternNumerique(
    [
      [0, 0],
      [0, 1]

    ]
  )
  pat3.iterate = function () {
    const newCells = new Set<string>()
    for (const key of this.cells) {
      const [x, y] = PatternNumerique.keyToCoord(key)
      newCells.add(PatternNumerique.coordToKey([x, y]))
      newCells.add(PatternNumerique.coordToKey([x, y + 1]))
      newCells.add(PatternNumerique.coordToKey([x + 1, y]))
      newCells.add(PatternNumerique.coordToKey([x + 1, y + 1]))
    }
    return newCells
  }
  return [pat0, pat1, pat2, pat3]
}
