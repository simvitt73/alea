import Exercice from '../Exercice'
import { shuffle } from '../../lib/outils/arrayOutils'
import { choisitLettresDifferentes } from '../../lib/outils/aleatoires'
import { context } from '../../modules/context'
import Figure from 'apigeom'
import figureApigeom from '../../lib/figureApigeom'
import type SuperFigure from 'apigeom'
import type Line from 'apigeom/src/elements/lines/Line'
import { createList } from '../../lib/format/lists'
import { randint } from '../../modules/outils'
import { wrapperApigeomToMathalea } from '../../lib/apigeom/apigeomZoom'

export const titre = 'Construire des symétriques de points par rapport à un point'
export const dateDePublication = '27/09/2024'
export const interactifReady = true
export const interactifType = 'custom'

export const uuid = '62453'
export const refs = {
  'fr-fr': ['6G1'],
  'fr-ch': []
}

/**
 * fonction pour verifier qu'on est dans le cadre
 * @param points
 */
function checkDistance (points: {x: number, y:number}[]) {
  for (const point of points) {
    if (point.y < -8 || point.y > 8 || point.x < -8 || point.x > 8) {
      return false
    }
  }
  return true
}

/**
 * Construction interactive de symétriques de points
 * @author Jean-Claude Lhote
 */
export default class PointsIntersectionDroites extends Exercice {
  antecedents!: object[][]
  labels!: string[][]
  exoCustomResultat: boolean
  figuresApiGeom!: SuperFigure[]
  constructor () {
    super()
    this.exoCustomResultat = true
    this.nbQuestions = 1
    this.spacingCorr = 1
  }

  nouvelleVersion () {
    const colors: string[] = context.isHtml ? ['red', 'green', 'purple', 'blue', 'gray', 'yellow'] : ['gray', 'gray', 'gray', 'gray', 'gray', 'gray']
    this.answers = {}
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    this.figuresApiGeom = []
    const nbPoints = 4
    this.labels = Array.from({ length: this.nbQuestions }, () => [])
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 20;) {
      let enonce = ''
      let nuage: {x: number, y:number}[] = []
      // On construit les points
      do {
        nuage = []
        for (let x = -8; x < 8; x += 1) {
          if (x !== 0) nuage.push({ y: (randint(2, 8) + 1) * (-1) ** x, x })
        }
        nuage = shuffle(nuage)
        nuage = nuage.slice(0, nbPoints)
      } while (!checkDistance(nuage))
      // Les antécédents sont des points nommés
      this.labels[i] = Array.from(choisitLettresDifferentes(15, 'Q', true))
      const options = {}
      this.figuresApiGeom[i] = new Figure(Object.assign(options, { xMin: -10, yMin: -10, width: 600, height: 600 }))
      this.figuresApiGeom[i].scale = 1
      this.figuresApiGeom[i].setToolbar({ tools: ['NAME_POINT', 'POINT_INTERSECTION', 'UNDO', 'REDO', 'REMOVE'], position: 'top' })
      const fig = this.figuresApiGeom[i]
      const pointsPossibles = shuffle(nuage).map((el, k) => fig.create('Point', { x: el.x, y: el.y, label: this.labels[i][k] }))
      const droites: Line[] = []
      let indiceDroite = 0
      for (let k = 0; k < nbPoints; k++) {
        for (let j = k + 1; j < nbPoints; j++) {
          droites.push(fig.create('Line', { point1: pointsPossibles[k], point2: pointsPossibles[j], color: colors[indiceDroite], label: `(d_${indiceDroite})` }))
          indiceDroite++
        }
      }
      const listeDeuxDroites = [
        [droites[0], droites[1]],
        [droites[0], droites[2]],
        [droites[0], droites[3]],
        [droites[0], droites[4]],
        [droites[0], droites[5]],
        [droites[1], droites[2]],
        [droites[1], droites[3]],
        [droites[1], droites[4]],
        [droites[1], droites[5]],
        [droites[2], droites[3]],
        [droites[2], droites[4]],
        [droites[2], droites[5]],
        [droites[3], droites[4]],
        [droites[3], droites[5]],
        [droites[4], droites[5]]
      ]
      const allIntersections = listeDeuxDroites
        .map((droites: Line[], k) => Object.assign({}, {
          intersection: fig.create('PointIntersectionLL', { line1: droites[0], line2: droites[1], label: this.labels[i][k] }),
          deuxDroites: droites
        }))
      const intersections = shuffle(allIntersections
        .filter(val => checkDistance([{ x: val.intersection.x, y: val.intersection.y }]))
        .filter((val, k) => allIntersections.slice(k + 1, allIntersections.length)
          .every((val2) => Math.abs(val2.intersection.x - val.intersection.x) < 0.1 && Math.abs(val2.intersection.y - val.intersection.y) < 0.1)))

      const lesTroisPoints = intersections.slice(0, 3)
      enonce = 'Nommer le point d\'intersection des droites : '
      const listeQuestions = createList({
        items: lesTroisPoints.map((val) => {
          return `(${val.deuxDroites[0].point1.label + val.deuxDroites[0].point2.label}) et (${val.deuxDroites[1].point1.label + val.deuxDroites[1].point2.label})`
        }),
        style: 'alpha'

      })
      enonce += listeQuestions

      if (this.sup === 1) Object.assign(options, { snapGrid: true, dx: 1, dy: 1 })
      if (this.questionJamaisPosee(i, this.labels.join())) {
        if (context.isHtml) {
          if (this.interactif) {
            this.listeQuestions.push(enonce + '<br>' + figureApigeom({ exercice: this, figure: fig, i, isDynamic: true, defaultAction: 'NAME_POINT' }))
          } else {
            this.listeQuestions.push(enonce + '<br>' + wrapperApigeomToMathalea(this.figuresApiGeom[i]))
          }
        } else {
          this.listeQuestions.push(enonce + '<br><br>' + this.figuresApiGeom[i].tikz())
        }
        i++
      }
      cpt++
    }
  }
}
