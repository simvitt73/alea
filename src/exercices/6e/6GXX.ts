import Exercice from '../Exercice'
import figureApigeom from '../../lib/figureApigeom'
import { listeQuestionsToContenu } from '../../modules/outils'
import Figure from 'apigeom'
import { choice } from '../../lib/outils/arrayOutils'

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
  constructor () {
    super()
    this.consigne = 'Consigne'
    this.nbQuestions = 1
  }

  nouvelleVersion () {
    this.figuresApiGeom = []
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let texte = ''
      const texteCorr = ''

      this.figuresApiGeom[i] = new Figure({ xMin: -5.5, yMin: -5.5, width: 330, height: 330 })
      this.figuresApiGeom[i].create('Point', { x: 1, y: 1, shape: 'x', label: 'A', labelDxInPixels: -1.6, labelDyInPixels: 1.3 })

      this.figuresApiGeom[i].setToolbar({ tools: ['POINT', 'LINE', 'DRAG', 'REMOVE', 'CIRCLE_CENTER_POINT', 'CIRCLE_RADIUS'], position: 'top' })
      this.figuresApiGeom[i].create('Grid')
      this.figuresApiGeom[i].options.color = 'blue'
      texte = figureApigeom({ exercice: this, i, figure: this.figuresApiGeom[i], idAddendum: '6GXX' + i, defaultAction: 'POINT' })
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
    const divFeedback = document.querySelector(`#feedbackEx${this.numeroExercice}Q${i}`)

    // Toute la partie ci-dessous joue avec les tests propres à apiGeom (voir exercices pour exemple)
    // Il n'y a pas de méthode générique, chaque correction va dépendre de l'exercice....

    const isValid = choice([true, false]) // Ce isValid n'est que pour l'exemple ici, ce n'est pas à reproduire.

    if (divFeedback != null) {
      if (isValid) {
        divFeedback.innerHTML = 'Bravo !'
        return ['OK']
      }
      divFeedback.innerHTML = 'Non réussi. À adapter évidemment'
      return ['KO']
    }
    return ['EE : Je ne sais pas quoi mettre si le divFeedback est null, ni même d ailleurs pourquoi il le serait']
  }
}
