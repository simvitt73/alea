import Exercice from '../Exercice'
import { randint } from '../../modules/outils'
import { listeQuestionsToContenu } from '../../modules/outils'

export const titre = 'QCM de cours : Suites numériques'
export const interactifReady = true
export const interactifType = 'qcm'
export const dateDePublication = '23/02/2025'

export const uuid = '19fc1'
export const refs = {
  'fr-fr': ['TSA1-QCM05'],
  'fr-ch': []
}

export default class SuitesNumeriquesQCM extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 1
    this.spacing = 1.5
    this.spacingCorr = 1.5
  }

  nouvelleVersion () {
    // Liste des affirmations et leurs réponses (true = vrai, false = faux)
    const affirmations: { texte: string, estVrai: boolean }[] = [
      { texte: 'Toute suite bornée est convergente.', estVrai: false },
      { texte: 'Toute suite minorée et croissante converge.', estVrai: true },
      { texte: 'Toute suite croissante est bornée.', estVrai: false },
      { texte: 'Toute suite qui n\'est pas bornée diverge vers $+\\infty$.', estVrai: false },
      { texte: 'Toute suite croissante majorée par L converge vers L.', estVrai: true },
      { texte: 'Toute suite croissante et majorée converge.', estVrai: true },
      { texte: 'Toute suite croissante est minorée.', estVrai: true },
      { texte: 'Toute suite minorée converge.', estVrai: false },
      { texte: 'Toute suite convergente est bornée.', estVrai: true }
    ]

    // Sélection aléatoire de 4 affirmations
    const selectionnerAffirmationsAleatoires = (): { texte: string, estVrai: boolean }[] => {
      const indicesAleatoires: number[] = []
      while (indicesAleatoires.length < 4) {
        const indice = randint(0, affirmations.length - 1)
        if (!indicesAleatoires.includes(indice)) {
          indicesAleatoires.push(indice)
        }
      }
      return indicesAleatoires.map(indice => affirmations[indice])
    }

    // Générer l'exercice
    const genererExercice = () => {
      const affirmationsSelectionnees = selectionnerAffirmationsAleatoires()

      // Enoncé de l'exercice avec cases "Vrai" ou "Faux"
      let enonce = 'Parmi les affirmations suivantes, cochez "Vrai" ou "Faux" :<br>'
      affirmationsSelectionnees.forEach((affirmation, index) => {
        enonce += `
          <div>
            ${index + 1}. ${affirmation.texte}
            <label>
              <input type="radio" name="affirmation${index}" value="true"> Vrai
            </label>
            <label>
              <input type="radio" name="affirmation${index}" value="false"> Faux
            </label>
          </div><br>
        `
      })

      // Enregistrer les réponses correctes
      const reponsesCorrectes = affirmationsSelectionnees.map(affirmation => affirmation.estVrai)

      // Correction détaillée (dans le même ordre que les propositions)
      let correction = 'Correction :<br>'
      affirmationsSelectionnees.forEach((affirmation, index) => {
        correction += `${index + 1}. ${affirmation.texte} : ${affirmation.estVrai ? 'Vrai' : 'Faux'}<br>`
      })

      return { enonce, correction, reponsesCorrectes }
    }

    // Appel de la fonction pour générer l'exercice
    const { enonce, correction, reponsesCorrectes } = genererExercice()

    // Affichage interactif
    this.listeQuestions[0] = enonce
    this.listeCorrections[0] = correction

    // Génération du contenu
    listeQuestionsToContenu(this)
  }
}