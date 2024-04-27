import { randint } from '../../../modules/outils'
import QuestionMathalea from '../../QuestionMathalea'

export default class QuestionAdditionnerMinutes extends QuestionMathalea {
  createQuestion (): void {
    const a = randint(0, 59)
    const b = randint(0, 59)
    this.text = `$${a}~\\text{min} + ${b}~\\text{min} = $` + this.add.mathField()
    this.setMathfield({ keyboard: 'clavierHms', answers: [`${a + b}\\min`, a + b] })
    this.correction = `$${a} + ${b} = ${a + b}$`
  }
}
