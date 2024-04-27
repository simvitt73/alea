import type { MathfieldElement } from 'mathlive'

type Mathfield = {
  mathfieldElement?: MathfieldElement
  buttonCheckElement?: HTMLButtonElement
  keyboard?: string
  answers: string[]
  compare?: (input: string, goodAnswer: string) => {isOk: boolean, feedback?: string}

}
export default abstract class QuestionMathalea {
  public answers: Array<{ value: string, compare?: (input: string, goodAnswer: string) => {isOk: boolean, feedback?: string}}> = []
  public container: HTMLElement
  public correction!: string
  public didacticParams: unknown
  public indiceExercice: number
  public indiceQuestion: number
  public isInteractive = false
  public mathfields: Map<string, Mathfield>
  public text!: string

  private _output!: 'html' | 'latex'
  private numberOfTryForNewQuestion = 50

  public constructor ({ isInteractif = false, output = 'html', previousQuestions = [], indiceQuestion = 0, indiceExercice = 0, didacticParams }: { isInteractif?: boolean, indiceExercice?: number, indiceQuestion?: number, output?: 'html' | 'latex', previousQuestions?: QuestionMathalea[], didacticParams?: unknown } = {}) {
    this.container = document.createElement('div')
    this.indiceExercice = indiceExercice
    this.indiceQuestion = indiceQuestion
    this.isInteractive = isInteractif
    this.output = output
    this.mathfields = new Map()
    this.didacticParams = didacticParams
    this.getANewVersion(previousQuestions)
  }

  abstract createQuestion (): void

  checkAnswer () {
    for (const mathfield of this.mathfields.values()) {
      if (mathfield.mathfieldElement === undefined || mathfield.buttonCheckElement === undefined) {
        continue
      }
      const studentAnswer = mathfield.mathfieldElement.getValue()
      const goodAnswer = mathfield.answers[0]
      if (mathfield.compare) {
        const { isOk, feedback } = mathfield.compare(studentAnswer, goodAnswer)
        if (isOk) {
          mathfield.buttonCheckElement.style.backgroundColor = 'green'
        } else {
          mathfield.buttonCheckElement.style.backgroundColor = 'red'
        }
        if (feedback) {
          const p = document.createElement('p')
          p.textContent = feedback
          this.container.appendChild(p)
        }
      } else {
        if (studentAnswer === goodAnswer) {
          mathfield.buttonCheckElement.style.backgroundColor = 'green'
        } else {
          mathfield.buttonCheckElement.style.backgroundColor = 'red'
        }
      }
    }
  }

  checkQuestionIsUnique (listOfPreviousQuestions: QuestionMathalea[], numberofLastQuestionsToCompare?: number): void {
    let cpt = 0
    let previousTexts = listOfPreviousQuestions.map((q) => q.text)
    if (numberofLastQuestionsToCompare !== undefined) {
      previousTexts = previousTexts.slice(-numberofLastQuestionsToCompare)
    }
    while (cpt < this.numberOfTryForNewQuestion) {
      if (!previousTexts.includes(this.text)) {
        break
      }
      this.createQuestion()
      cpt++
    }
    if (cpt === this.numberOfTryForNewQuestion) {
      if (numberofLastQuestionsToCompare === undefined) {
        this.checkQuestionIsUnique(listOfPreviousQuestions, 10)
      } else if (numberofLastQuestionsToCompare === 10) {
        this.checkQuestionIsUnique(listOfPreviousQuestions, 2)
      }
    }
  }

  getANewVersion (listOfPreviousQuestions?: QuestionMathalea[]): void {
    this.init()
    this.createQuestion()
    if (listOfPreviousQuestions !== undefined) this.checkQuestionIsUnique(listOfPreviousQuestions)
  }

  getContainer () {
    const regex = /£mathfield:(.*?)£/g
    let currentIndex = 0
    let match
    while ((match = regex.exec(this.text)) !== null) {
      this.container.innerHTML += this.text.substring(currentIndex, match.index)
      const mathfieldElement = document.createElement('math-field') as MathfieldElement
      const buttonCheckMathfieldElement = document.createElement('button')
      const id = match[1]
      buttonCheckMathfieldElement.textContent = 'Vérifier'
      buttonCheckMathfieldElement.onclick = this.checkAnswer.bind(this)
      this.container.appendChild(mathfieldElement)
      this.container.appendChild(buttonCheckMathfieldElement)
      currentIndex = match.index + match[0].length
      if (this.mathfields.has(id)) {
        this.mathfields.get(id)!.mathfieldElement = mathfieldElement
        this.mathfields.get(id)!.buttonCheckElement = buttonCheckMathfieldElement
      }
    }
    if (currentIndex < this.text.length) {
      this.container.innerHTML += this.text.substring(currentIndex)
    }
    return this.container
  }

  init () {
    this.text = ''
    this.correction = ''
  }

  setMathfield ({ id = '0', keyboard, answers, compare }: { id?: string, keyboard?: string, answers: number | number[] | string | string[], compare?: (input: string, goodAnswer: string) => {isOk: boolean, feedback?: string} }) {
    if (!this.mathfields.has(id)) {
      const answersArray = Array.isArray(answers) ? answers : [answers]
      const answersArrayOfStrings = answersArray.map(answer => String(answer))
      this.mathfields.set(id, { mathfieldElement: undefined, keyboard, answers: answersArrayOfStrings, compare })
    }
  }

  /** Aides pour la mise en page des exercices */
  get add () {
    return {
      /** Symbole € */
      euro: this.output === 'html' ? '&euro;' : '\\euro{}',
      /** Lettre majuscule correspondant à l'indice de la question  */
      letter: String.fromCharCode(65 + this.indiceQuestion % 26),
      /** Champ de texte pour les mathfields */
      mathField: (indiceMF = 0) => {
        return this.output === 'html' ? `£mathfield:${indiceMF}£` : ''
      },
      /** Nouvelle ligne */
      newLine: this.output === 'html' ? '<br>' : '\\\\\n'
    }
  }

  get output () {
    return this._output
  }

  set output (output: 'html' | 'latex') {
    this._output = output
    if (output === 'latex') {
      this.isInteractive = false
    }
  }
}
