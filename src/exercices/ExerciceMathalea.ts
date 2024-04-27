import type QuestionMathalea from './QuestionMathalea'
// @ts-expect-error typage de auto-render
import renderMathInElement from 'katex/dist/contrib/auto-render.js'

export default class ExerciceMathalea {
  protected _questions: QuestionMathalea[]
  protected buttonCheckAnswers: HTMLButtonElement
  protected container: HTMLDivElement
  protected typeExercice = 'html'
  public meta: {
    about: string
    author: string
    dateFirstRelease?: Date
    dateLastUpdate?: Date
    isMathalea?: boolean
  }

  public constructor () {
    this._questions = []
    this.container = document.createElement('div')
    this.meta = {
      about: '',
      author: '',
      isMathalea: true
    }
    this.buttonCheckAnswers = document.createElement('button')
  }

  checkAnswers () {
    for (const question of this._questions) {
      question.checkAnswer()
      if (question.state !== 'correct') {
        question.container.appendChild(question.divCorrection)
      }
      question.buttonCheckAnswers.remove()
    }
    renderMathInElement(this.container, optionsKatex)
  }

  getANewVersion () {
    let indiceQuestion = 0
    for (const question of this._questions) {
      question.indiceQuestion = indiceQuestion
      question.checkQuestionIsUnique(this._questions.slice(0, indiceQuestion))
      const questionContainer = question.getContainer()
      this.container.appendChild(questionContainer)
      indiceQuestion++
    }
    renderMathInElement(this.container, optionsKatex)
  }

  get html () {
    this.buttonCheckAnswers.textContent = 'Vérifier les réponses'
    this.buttonCheckAnswers.addEventListener('click', this.checkAnswers.bind(this))
    this.container.appendChild(this.buttonCheckAnswers)
    return this.container
  }

  set questions (questions: (new () => QuestionMathalea)[]) {
    for (const Question of questions) {
      this._questions.push(new Question())
    }
    this.getANewVersion()
    if (window.location.hostname === 'localhost') console.info(this._questions)
  }

  get questions (): QuestionMathalea[] {
    return this._questions
  }
}

const optionsKatex = {
  delimiters: [
    { left: '\\[', right: '\\]', display: true },
    { left: '$', right: '$', display: false }
  ],
  // Les accolades permettent d'avoir une formule non coupée
  preProcess: (chaine: string) => '{' + chaine.replaceAll(String.fromCharCode(160), '\\,') + '}',
  throwOnError: true,
  errorColor: '#CC0000',
  strict: 'warn',
  trust: false
}
