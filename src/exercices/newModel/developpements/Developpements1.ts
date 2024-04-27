import QuestionMathalea from '../../QuestionMathalea'
import { randint } from '../../../modules/outils'
import engine, { calculCompare, developmentCompare } from '../../../lib/interactif/comparisonFunctions'

export default class QuestionDeveloppement1 extends QuestionMathalea {
  didacticParams = {
    hasRelativeNumbers: false
  }

  createQuestion () {
    let a = randint(1, 1)
    let b = randint(2, 5)
    let c = randint(1, 1)
    let d = randint(2, 5)
    let e = randint(2, 5)
    let f = randint(2, 5)
    let g = randint(2, 5)
    let k = randint(2, 5)
    let h = randint(2, 5)
    if (this.didacticParams.hasRelativeNumbers) {
      a *= Math.round(Math.random()) * 2 - 1
      b *= Math.round(Math.random()) * 2 - 1
      c *= Math.round(Math.random()) * 2 - 1
      d *= Math.round(Math.random()) * 2 - 1
      e *= Math.round(Math.random()) * 2 - 1
      f *= Math.round(Math.random()) * 2 - 1
      g *= Math.round(Math.random()) * 2 - 1
      h *= Math.round(Math.random()) * 2 - 1
      k *= Math.round(Math.random()) * 2 - 1
    }
    this.numberOfMathFieldsByQuestion = 2
    const expression = `${k}(${a}x + ${b})(${c}x + ${d}) + (${e}x + ${f})(${g}x + ${h})`
    this.text = `$${this.add.letter} = ${expression}$`
    this.correction = 'Correction à venir'
    if (this.isInteractive) {
      this.text += `<br>$${this.add.letter}=$` + this.add.mathField(0) + '(forme développée)'
      this.text += `<br>$${this.add.letter}=$` + this.add.mathField(1) + '(forme développée et réduite)'
      this.answers[this.indiceQuestion * 2] = { value: expression, compare: developmentCompare }
      this.answers[this.indiceQuestion * 2 + 1] = { value: engine.parse(expression).simplify().latex, compare: calculCompare }
    }
  }
}

function printSimplifyLatex (expression: string) {
  return (engine.parse(expression).simplify().latex)
}
