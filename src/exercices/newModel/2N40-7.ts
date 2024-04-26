import Exercice from '../Exercice.js'
import QuestionDeveloppement1 from './developpements/Developpements1.js'
import QuestionDeveloppement2 from './developpements/Developpements2.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { combinaisonListes } from '../../lib/outils/arrayOutils.js'
import { handleAnswers } from '../../lib/interactif/gestionInteractif.js'
import { context } from '../../modules/context.js'

export const titre = 'Développer des expressions complexes'
export const dateDePublication = '21/03/2024'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'a7f42'

/**
 * Description didactique de l'exercice
 * @author Rémi Angot
*/

export default class DevelopperExpressionComplexe extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 10
  }

  nouvelleVersion () {
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    this.consigne = this.nbQuestions > 1 ? 'Développer les expressions suivantes.' : 'Développer l\'expression suivante.'
    const questions = combinaisonListes([QuestionDeveloppement1, QuestionDeveloppement2, QuestionDeveloppement2], this.nbQuestions)

    this.consigne = this.nbQuestions > 1 ? 'Développer les expressions suivantes.' : 'Développer l\'expression suivante.'

    for (let i = 0; i < this.nbQuestions; i++) {
      const question = new questions[i]({ output: context.isHtml ? 'html' : 'latex', indiceQuestion: i, indiceExercice: this.numeroExercice, isInteractif: this.interactif, didacticParams: { hasRelativeNumbers: true } })
      this.listeQuestions.push(question.getText())
      this.listeCorrections.push(question.getCorrection())
      handleAnswers(this, i * 2, { reponse: question.answers[i * 2] })
      handleAnswers(this, i * 2 + 1, { reponse: question.answers[i * 2 + 1] })
    }

    listeQuestionsToContenu(this)
  }
}
