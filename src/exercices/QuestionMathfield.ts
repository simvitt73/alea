import type { MathfieldElement } from 'mathlive'
import { convertKeyboardTypeToBlocks, type KeyboardCategory } from '../lib/interactif/claviers/keyboard'
import QuestionMathalea from './QuestionMathalea'
import { handleFocusMathField, handleFocusOutMathField } from '../modules/loaders'

type Mathfield = {
  mathfieldElement?: MathfieldElement
  keyboard?: KeyboardCategory
  answers: string[]
  compare?: (input: string, goodAnswer: string) => {isOk: boolean, feedback?: string}

}

export default abstract class QuestionMathfield extends QuestionMathalea {
  protected mathfields!: Map<string, Mathfield>

  init () {
    super.init()
    this.mathfields = new Map()
  }

  public checkAnswer () {
    for (const mathfield of this.mathfields.values()) {
      if (mathfield.mathfieldElement === undefined) {
        continue
      }
      const studentAnswer = mathfield.mathfieldElement.getValue()
      let studentAnswerIsOk = false
      for (const goodAnswer of mathfield.answers) {
        if (mathfield.compare) {
          if (mathfield.compare(studentAnswer, goodAnswer).isOk) {
            studentAnswerIsOk = true
            break
          }
        } else {
          if (studentAnswer === goodAnswer) {
            studentAnswerIsOk = true
            break
          }
        }
      }
      this.spanSmiley.textContent = studentAnswerIsOk ? '😎' : '☹️'
      this.state = studentAnswerIsOk ? 'correct' : 'incorrect'
    }
  }

  protected setMathfield ({ id = '0', keyboard, answers, compare }: { id?: string, keyboard?: KeyboardCategory, answers: number | string | (number | string)[], compare?: (input: string, goodAnswer: string) => {isOk: boolean, feedback?: string} }) {
    if (!this.mathfields.has(id)) {
      console.log('ok')
      const answersArray = Array.isArray(answers) ? answers : [answers]
      const answersArrayOfStrings = answersArray.map(answer => String(answer))
      this.mathfields.set(id, { mathfieldElement: undefined, keyboard, answers: answersArrayOfStrings, compare })
    }
  }

  public updateStatementContainer () {
    console.log(this)
    const regex = /£mathfield:(.*?)£/g
    let currentIndex = 0
    let match
    while ((match = regex.exec(this.text)) !== null) {
      this.container.innerHTML += this.text.substring(currentIndex, match.index)
      const mathfieldElement = document.createElement('math-field') as MathfieldElement
      const id = match[1]
      mathfieldElement.id = `mathfieldEx${this.indiceExercice}Q${this.indiceQuestion}MF${id}`
      mathfieldElement.addEventListener('focus', handleFocusMathField)
      mathfieldElement.addEventListener('focusout', handleFocusOutMathField)
      this.container.appendChild(mathfieldElement)
      this.container.appendChild(this.buttonCheckAnswers)
      currentIndex = match.index + match[0].length
      if (this.mathfields.has(id)) {
        this.mathfields.get(id)!.mathfieldElement = mathfieldElement
        const { keyboard } = this.mathfields.get(id)!
        if (keyboard !== undefined) {
          const keyboardBlocks = convertKeyboardTypeToBlocks(keyboard).join(' ')
          mathfieldElement.dataset.keyboard = keyboardBlocks
        }
      }
    }
    if (currentIndex < this.text.length) {
      this.container.innerHTML += this.text.substring(currentIndex)
    }
    this.container.appendChild(this.spanSmiley)
  }
}
