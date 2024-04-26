import { get } from 'svelte/store'
import type QuestionMathalea from './QuestionMathalea'
import { globalOptions } from '../lib/stores/generalStore'
// @ts-expect-error typage de auto-render
import renderMathInElement from 'katex/dist/contrib/auto-render.js'

export default class ExerciceMathalea {
  protected _questions: QuestionMathalea[]
  protected typeExercice = 'html'
  protected container: HTMLDivElement
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
    this.container = document.createElement('div')
    const p = document.createElement('p')
    p.textContent = 'Hello world'
    this.container.append(p)
    if (get(globalOptions).v === 'eleve') {
      p.textContent = 'Hello world eleve'
    }
  }

  newDatas () {
    this._questions.forEach(question => question.newData())
    for (const question of this._questions) {
      question.checkQuestionIsUnique(this._questions)
      question.toHtml(this.container)
    }
    renderMathInElement(this.container, {
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
    })
  }

  set questions (questions: (new () => QuestionMathalea)[]) {
    for (const Question of questions) {
      this._questions.push(new Question())
    }
    this.newDatas()
  }

  get questions (): QuestionMathalea[] {
    return this._questions
  }

  get html () {
    return this.container
  }
}
