type Mathfield = {
  id: string
  keyboard?: string
  answers: { id: string, value: string }[]
  compare?: (input: string, goodAnswer: string) => {isOk: boolean, feedback?: string}

}
export default abstract class QuestionMathalea {
  public correction!: string
  public indiceExercice: number
  public indiceQuestion: number
  public isInteractive = false
  private _output!: 'html' | 'latex'
  public text!: string
  public mathfields: Mathfield[]
  public didacticParams: unknown
  numberOfMathFieldsByQuestion = 1
  public answers: Array<{ value: string, compare?: (input: string, goodAnswer: string) => {isOk: boolean, feedback?: string}}> = []

  private numberOfTryForNewQuestion = 50

  public constructor ({ isInteractif = false, output = 'html', previousQuestions = [], indiceQuestion = 0, indiceExercice = 0, didacticParams }: { isInteractif?: boolean, indiceExercice?: number, indiceQuestion?: number, output?: 'html' | 'latex', previousQuestions?: QuestionMathalea[], didacticParams?: unknown } = {}) {
    this.indiceExercice = indiceExercice
    this.indiceQuestion = indiceQuestion
    this.isInteractive = isInteractif
    this.output = output
    this.mathfields = []
    this.didacticParams = didacticParams
    this.newData(previousQuestions)
  }

  newData (listOfPreviousQuestions?: QuestionMathalea[]): void {
    this.init()
    this.createQuestion()
    if (listOfPreviousQuestions !== undefined) this.checkQuestionIsUnique(listOfPreviousQuestions)
  }

  init () {
    this.text = ''
    this.correction = ''
  }

  abstract createQuestion (): void

  checkQuestionIsUnique (listOfPreviousQuestions: QuestionMathalea[], numberOfPreviousQuestionsToCheck?: number): void {
    console.log(numberOfPreviousQuestionsToCheck)
    let cpt = 0
    let previousTexts = listOfPreviousQuestions.map((q) => q.text)
    if (numberOfPreviousQuestionsToCheck !== undefined) {
      previousTexts = previousTexts.slice(-numberOfPreviousQuestionsToCheck)
    }
    while (cpt < this.numberOfTryForNewQuestion) {
      console.log(this.text)
      if (!previousTexts.includes(this.text)) {
        break
      }
      console.log('create new question')
      this.createQuestion()
      cpt++
    }
    if (cpt === this.numberOfTryForNewQuestion) {
      if (numberOfPreviousQuestionsToCheck === undefined) {
        this.checkQuestionIsUnique(listOfPreviousQuestions, 10)
      } else if (numberOfPreviousQuestionsToCheck === 10) {
        this.checkQuestionIsUnique(listOfPreviousQuestions, 2)
      }
    }
  }

  toHtml (container: HTMLElement) {
    const question = document.createElement('div')
    question.innerHTML = this.text
    container.appendChild(question)
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

  /** Aides pour la mise en page des exercices */
  get format () {
    return {
      /** Symbole € */
      euro: this.output === 'html' ? '&euro;' : '\\euro{}',
      /** Lettre majuscule correspondant à l'indice de la question  */
      letter: String.fromCharCode(65 + this.indiceQuestion % 26),
      /** Champ de texte pour les mathfields */
      mathField: (indiceMF = 0) => this.output === 'html' ? `<math-field id="champTexteEx${this.indiceExercice}Q${this.indiceQuestion * this.numberOfMathFieldsByQuestion + Number(indiceMF)}"></math-field><span id="resultatCheckEx${this.indiceExercice}Q${this.indiceQuestion * this.numberOfMathFieldsByQuestion + Number(indiceMF)}"></span>` : '',
      /** Nouvelle ligne */
      newLine: this.output === 'html' ? '<br>' : '\\\\\n'
    }
  }

  getText (output?: 'html' | 'latex') {
    return this.handleMathaleaMarkup(this.text, output || this.output)
  }

  getCorrection (output?: 'html' | 'latex') {
    return this.handleMathaleaMarkup(this.correction, output || this.output)
  }

  handleMathaleaMarkup (text: string, output: 'html' | 'latex') {
    return text.replace(/£newLine£/g, output === 'html' ? '<br>' : '\\\\')
      .replace(/£€£/g, output === 'html' ? '&euro;' : '\\euro{}')
      // Les mathfields doivent avoir un id au format prédéfini
      // mmais dans le nouveau modèle, ça pourrait être n'importe quelle clé
  }
}
