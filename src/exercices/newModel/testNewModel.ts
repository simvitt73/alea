import ExerciceMathalea from '../ExerciceMathalea'
import QuestionAdditionnerMinutes from './calculMental/QuestionAdditionnerMinutes'
import QuestionAdditionnerX9 from './calculMental/QuestionAdditionnerX9'
import QuestionDouble from './calculMental/QuestionDouble'

export const uuid = 'testModel'
export const titre = 'Calcul mental'
class ExerciceTestNewModel extends ExerciceMathalea {
  constructor () {
    super()
    this.questions = [QuestionAdditionnerMinutes, QuestionAdditionnerX9, QuestionAdditionnerX9, QuestionAdditionnerX9, QuestionAdditionnerX9, QuestionAdditionnerX9, QuestionDouble, QuestionDouble]
  }

  // Faire un builder
  // Quelles sont mes questions
  // Combien de questions
  // Comment les mélanger
  // Paramétrer les questions
}

export default ExerciceTestNewModel
