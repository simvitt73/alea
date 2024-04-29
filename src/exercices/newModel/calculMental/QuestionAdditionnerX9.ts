import { randint } from '../../../modules/outils'
import QuestionMathfield from '../../QuestionMathfield'

export default class QuestionAdditionnerX9 extends QuestionMathfield {
  createQuestion (): void {
    const a = randint(2, 9) * 10 + 9
    const b = randint(11, 89)
    // this.interactivity = interactivityBuilder({type: 'mathfield')
    //   .setKeyboard('clavierDeBase')
    //   .setAnswers(a + b)
    //   .setCompare(compareNumber)
    //   .build() ???
    this.text = `$${this.add.letter} = ${a} + ${b} = $` + this.add.mathFieldPlaceholder()
    // this.add.qcmPlaceHolder
    // this.text = `$${a} + ${b} = $` + interactivity.markup()
    this.setMathfield({ keyboard: 'clavierDeBase', answers: a + b })
    this.correction = `Ajouter $${a}$ revient à ajouter $${a + 1}$ puis enlever 1.`
    this.correction += `<br>$${a} + ${b} = ${a + b + 1} - 1 = ${a + b}$`
  }
}
