import QuestionMathalea from '../../QuestionMathalea'
import { randint } from '../../../modules/outils'
import { canonicalAddCompare, developmentCompare } from '../../../lib/interactif/comparisonFunctions'

export default class QuestionDeveloppement2 extends QuestionMathalea {
  didacticParams = {
    hasRelativeNumbers: false
  }

  createQuestion () {
    const a = randint(2, 5)
    const b = randint(2, 5)
    const c = randint(2, 5)
    const d = randint(2, 5)
    this.numberOfMathFieldsByQuestion = 2
    const expression = `(${a}x + ${b})^2 - (${c}x + ${d})`
    const expressionDeveloped = `${a ** 2}x^2 + ${2 * a * b - c}x + ${b ** 2 - d}`
    this.text = `$${this.add.letter} = ${expression} $`
    this.correction = 'Correction à venir'
    if (this.isInteractive) {
      this.text += `<br>$${this.add.letter}=$` + this.add.mathFieldPlaceholder(0) + '(forme développée)'
      this.text += `<br>$${this.add.letter}=$` + this.add.mathFieldPlaceholder(1) + '(forme développée et réduite)'
      this.answers[this.indiceQuestion * 2] = { value: expressionDeveloped, compare: developmentCompare }
      this.answers[this.indiceQuestion * 2 + 1] = { value: expressionDeveloped, compare: canonicalAddCompare }
    }
  }
}
