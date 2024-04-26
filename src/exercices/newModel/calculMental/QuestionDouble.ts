import { randint } from '../../../modules/outils'
import QuestionMathalea from '../../QuestionMathalea'

export default class QuestionDouble extends QuestionMathalea {
  createQuestion (): void {
    const a = randint(11, 99)
    this.text = `$${a} \\times 2 = $`
    this.correction = `$${a} \\times 2 = ${a * 2}$`
  }
}
