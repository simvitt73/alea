import { calculCompare } from '../../../lib/interactif/comparisonFunctions'
import { randint } from '../../../modules/outils'
import QuestionMathfield from '../../QuestionMathfield'

export default class QuestionDouble extends QuestionMathfield {
  createQuestion (): void {
    const a = randint(11, 99)
    this.text = `$${a} \\times 2 = $` + this.add.mathFieldPlaceholder()
    this.correction = `$${a} \\times 2 = ${a * 2}$`
    this.setMathfield({ keyboard: 'clavierNumbers', answers: a * 2, compare: calculCompare })
  }
}
