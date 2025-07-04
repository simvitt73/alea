import ExerciceQcm from './ExerciceQcm'
import { choice } from '../lib/outils/arrayOutils'

// Type pour définir la structure d'une question QCM dans le JSON
export interface QuestionQcm {
  enonce: string
  reponses: string[]
  corrections?: string[]
  bonnesReponses?: boolean[]
}

// Type pour la structure complète du JSON
export interface QcmJsonData {
  titre: string
  consigne?: string
  questions: QuestionQcm[]
  options?: {
    vertical?: boolean
    ordered?: boolean
    lastChoice?: number
  }
}

export const uuid = 'QcmGen'
export const refs = {
  'fr-fr': [],
  'fr-ch': []
}

/**
 * Générateur d'exercices QCM basé sur des données JSON
 * Cette classe permet de créer des exercices QCM à partir d'un fichier JSON
 * contenant une liste de questions avec leurs réponses et corrections
 */
export default class QcmJsonGenerator extends ExerciceQcm {
  private jsonData: QcmJsonData
  private questionsDisponibles: QuestionQcm[]

  constructor (jsonData: QcmJsonData) {
    super()
    this.jsonData = jsonData
    this.questionsDisponibles = [...jsonData.questions]

    // Configuration des options si fournies dans le JSON
    if (jsonData.options) {
      this.options = { ...this.options, ...jsonData.options }
    }

    // Permettre plusieurs questions si le JSON en contient plusieurs
    this.nbQuestions = Math.min(jsonData.questions.length, 10) // Limiter à 10 questions max
    this.nbQuestionsModifiable = jsonData.questions.length > 1

    // Titre de l'exercice
    if (jsonData.titre) {
      this.titre = jsonData.titre
    }

    // Consigne personnalisée si fournie
    if (jsonData.consigne) {
      this.consigne = jsonData.consigne
    }
  }

  /**
   * Version originale qui prend la première question du JSON
   */
  versionOriginale = () => {
    if (this.questionsDisponibles.length === 0) {
      throw new Error('Aucune question disponible dans les données JSON')
    }

    const question = this.questionsDisponibles[0]
    this.enonce = question.enonce
    this.reponses = [...question.reponses]

    // Gérer les corrections si présentes
    if (question.corrections) {
      this.corrections = [...question.corrections]
    }

    // Gérer les bonnes réponses si présentes (pour QCM à réponses multiples)
    if (question.bonnesReponses) {
      this.bonnesReponses = [...question.bonnesReponses]
    }

    // Correction par défaut si pas de corrections spécifiques
    if (!this.corrections || this.corrections.length === 0) {
      this.correction = 'La bonne réponse est la première de la liste.'
    }
  }

  /**
   * Version aléatoire qui choisit une question au hasard
   */
  versionAleatoire = () => {
    if (this.questionsDisponibles.length === 0) {
      throw new Error('Aucune question disponible dans les données JSON')
    }

    const question = choice(this.questionsDisponibles)
    this.enonce = question.enonce
    this.reponses = [...question.reponses]

    // Gérer les corrections si présentes
    if (question.corrections) {
      this.corrections = [...question.corrections]
    }

    // Gérer les bonnes réponses si présentes (pour QCM à réponses multiples)
    if (question.bonnesReponses) {
      this.bonnesReponses = [...question.bonnesReponses]
    }

    // Correction par défaut si pas de corrections spécifiques
    if (!this.corrections || this.corrections.length === 0) {
      this.correction = 'La bonne réponse est la première de la liste.'
    }
  }

  /**
   * Méthode pour charger des données JSON depuis un objet
   * @param jsonData - Les données JSON à charger
   */
  static fromJson (jsonData: QcmJsonData): QcmJsonGenerator {
    return new QcmJsonGenerator(jsonData)
  }

  /**
   * Méthode pour valider la structure des données JSON
   * @param data - Les données à valider
   * @returns true si les données sont valides
   */
  static validateJsonData (data: any): data is QcmJsonData {
    if (!data || typeof data !== 'object') return false
    if (!data.titre || typeof data.titre !== 'string') return false
    if (!Array.isArray(data.questions) || data.questions.length === 0) return false

    // Vérifier chaque question
    for (const question of data.questions) {
      if (!question.enonce || typeof question.enonce !== 'string') return false
      if (!Array.isArray(question.reponses) || question.reponses.length < 2) return false

      // Vérifier que toutes les réponses sont des strings
      for (const reponse of question.reponses) {
        if (typeof reponse !== 'string') return false
      }

      // Vérifier les corrections si présentes
      if (question.corrections) {
        if (!Array.isArray(question.corrections)) return false
        for (const correction of question.corrections) {
          if (typeof correction !== 'string') return false
        }
      }

      // Vérifier les bonnes réponses si présentes
      if (question.bonnesReponses) {
        if (!Array.isArray(question.bonnesReponses)) return false
        if (question.bonnesReponses.length !== question.reponses.length) return false
        for (const statut of question.bonnesReponses) {
          if (typeof statut !== 'boolean') return false
        }
      }
    }

    return true
  }

  /**
   * Méthode pour obtenir une question aléatoire différente des précédentes
   * @param questionsDejaUtilisees - Liste des questions déjà utilisées
   * @returns Une nouvelle question ou null si toutes ont été utilisées
   */
  private getQuestionAleatoire (questionsDejaUtilisees: QuestionQcm[]): QuestionQcm | null {
    const questionsRestantes = this.questionsDisponibles.filter(
      q => !questionsDejaUtilisees.includes(q)
    )

    if (questionsRestantes.length === 0) {
      return null
    }

    return choice(questionsRestantes)
  }

  /**
   * Redéfinition pour gérer les questions multiples de façon aléatoire
   */
  nouvelleVersion () {
    // Utiliser la version originale par défaut
    this.versionOriginale()
    super.nouvelleVersion()
  }
}
