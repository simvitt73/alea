import Exercice from '../Exercice'
import figureApigeom from '../../lib/figureApigeom'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Figure from 'apigeom'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import checkCircle from '../../../../apigeom/src/check/checkCircleRadius'
import type Point from 'apigeom/src/elements/points/Point'
import { lettreDepuisChiffre, numAlpha } from '../../lib/outils/outilString'
import Decimal from 'decimal.js'
import { texNombre } from '../../lib/outils/texNombre'

export const titre = 'Utiliser la définition du cercle et du disque'

export const dateDePublication = '11/01/2025'
export const interactifReady = true
export const interactifType = 'custom'

export const uuid = 'abcde'
export const refs = {
  'fr-fr': [],
  'fr-ch': []
}
/**
 * Utiliser la définition du cercle et du disque
 * @author
*/
export default class nomExercice extends Exercice {
  figuresApiGeom!: Figure[]
  lesPoints!: Point[][]
  choixRayon!: number[][]
  choixCouleur!: string[][]
  estUnCercle!: boolean[][]
  constructor () {
    super()
    this.nbQuestions = 1
    this.besoinFormulaireNumerique = ['Type de Questions', 3, '1 : Que des cercles\n2 : Que des disques\n3 : Mélange']
    this.besoinFormulaire2Numerique = ['Nombre de cas par question (4 maximum)', 4]
    this.sup = 1
    this.sup2 = 1
  }

  nouvelleVersion () {
    this.figuresApiGeom = []
    this.lesPoints = []
    this.choixRayon = []
    this.choixCouleur = []
    this.estUnCercle = []
    let typeDeQuestions = []
    switch (this.sup) {
      case 1 :
        typeDeQuestions = [true]
        break
      case 2 :
        typeDeQuestions = [false]
        break
      default :
        typeDeQuestions = [true, false]
        break
    }
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      this.lesPoints[i] = []
      this.choixRayon[i] = []
      this.choixCouleur[i] = combinaisonListes(['rouge', 'bleu', 'noir', 'vert'])
      this.estUnCercle[i] = combinaisonListes(typeDeQuestions, this.sup2)
      let texte = ''
      const texteCorr = ''
      const coordonnes : number[][] = []

      this.figuresApiGeom[i] = new Figure({ xMin: -5.5, yMin: -5.5, width: 330, height: 330 })
      let isDuplicate = true
      let newElement: number[]
      for (let ee = 0; ee < this.sup2; ee++) {
        do {
          newElement = [randint(-4, 4), randint(-4, 4)]

          // Vérifie si le nouvel élément est déjà dans le tableau
          isDuplicate = coordonnes.some(
            (el) => el[0] === newElement[0] && el[1] === newElement[1]
          )
        } while (isDuplicate)
        coordonnes[ee] = newElement
        this.lesPoints[i][ee] = this.figuresApiGeom[i].create('Point', { x: newElement[0], y: newElement[1], shape: 'x', label: lettreDepuisChiffre(ee + 1), labelDxInPixels: 10, labelDyInPixels: 20 })
        this.choixRayon[i][ee] = randint(20, 50, this.choixRayon[i])
        texte += numAlpha(ee + 1) + `Tracer, en ${this.choixCouleur[i][ee]}, l'ensemble des points à une distance`
        texte += this.estUnCercle[i][ee] ? ' de ' : ' inférieure ou égale à '
        texte += `$${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités du point ${lettreDepuisChiffre(ee + 1)}.<br>`
      }
      this.figuresApiGeom[i].setToolbar({ tools: ['POINT', 'LINE', 'SET_OPTIONS', 'CIRCLE_CENTER_POINT', 'CIRCLE_RADIUS', 'DISC_CENTER_POINT', 'DISC_RADIUS', 'DRAG', 'REMOVE'] })
      // this.figuresApiGeom[i].create('Grid')
      this.figuresApiGeom[i].options.color = 'blue'
      texte += figureApigeom({ exercice: this, i, figure: this.figuresApiGeom[i], idAddendum: '6GXX' + i, defaultAction: 'DRAG' })
      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }

  correctionInteractive = (i: number) => {
    if (this.answers == null) this.answers = {}
    // Sauvegarde de la réponse pour Capytale
    this.answers[this.figuresApiGeom[i].id] = this.figuresApiGeom[i].json
    const resultat = []
    const divFeedback = document.querySelector(`#feedbackEx${this.numeroExercice}Q${i}`) as HTMLDivElement
    let feedback = ''

    for (let ee = 0; ee < this.sup2; ee++) {
      const verif = checkCircle({ figure: this.figuresApiGeom[i], center: this.lesPoints[i][ee], radius: new Decimal(this.choixRayon[i][ee]).div(10).toNumber() })
      // console.log(verif.element, verif.element?.color, verif.element?.fillColor)
      if (this.estUnCercle[i][ee]) { // SI C'EST UN CERCLE
        // if (verif.isValid && verif.element?.color === this.choixCouleur[i][ee] && verif.element?.fillColor === this.choixCouleur[i][ee]) resultat.push('OK')
        if (verif.isValid && verif.element?.color === this.choixCouleur[i][ee]) resultat.push('OK')
        else {
          resultat.push('KO')
          feedback += numAlpha(ee + 1)
          if (!verif.isValid) {
            feedback += `Aucun cercle de centre ${this.lesPoints[i][ee].label} et de rayon $${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités n'est tracé.<br>`
          } else {
            feedback += `Le cercle de centre ${this.lesPoints[i][ee].label} et de rayon $${texNombre(new Decimal(this.choixRayon[i][ee]).div(10).toNumber())}$ unités n'est pas tracé en ${this.choixCouleur[i][ee]}.<br>`
          }
        }
      }
    }
    if (divFeedback) divFeedback.innerHTML = feedback
    this.figuresApiGeom[i].isDynamic = false
    this.figuresApiGeom[i].divButtons.style.display = 'none'
    this.figuresApiGeom[i].divUserMessage.style.display = 'none'
    return resultat
  }
}
