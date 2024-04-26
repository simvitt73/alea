import { randint } from '../../../modules/outils'
import QuestionMathalea from '../../QuestionMathalea'

export default class QuestionAdditionnerX9 extends QuestionMathalea {
  createQuestion (): void {
    const a = randint(2, 9) * 10 + 9
    const b = randint(11, 89)
    // this.text = `$${a} + ${b} = $`
    this.text = `${randint(1, 3)}`
    this.correction = `Ajouter $${a}$ revient à ajouter $${a + 1} puis enlever 1.`
    this.correction += `<br>$${a} + ${b} = ${a + b + 1} - 1 = ${a + b}$`
  }
}
