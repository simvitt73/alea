import Exercice from '../Exercice'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'

export const titre = 'Algorithme d\'Euclide pour calculer le PGCD'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '21/02/2025'

export const uuid = 'f68cc'

export const refs = {
  'fr-fr': ['TEA2-01'],
  'fr-ch': []
}

export default class ExerciceEuclide extends Exercice {
  constructor () {
    super()
    this.consigne = ''
  }

  // Fonction pour calculer le PGCD avec l'algorithme d'Euclide
  euclide (a: number, b: number): number {
    while (b !== 0) {
      const temp = b
      b = a % b
      a = temp
    }
    return a
  }

  // Fonction pour générer des nombres aléatoires
  genererNombres (min: number, max: number): { a: number, b: number } {
    const a = Math.floor(Math.random() * (max - min + 1)) + min
    const b = Math.floor(Math.random() * (max - min + 1)) + min
    return { a, b }
  }

  // Fonction pour générer une nouvelle version des questions
  nouvelleVersion () {
    const typeQuestionsDisponibles = ['type1']
    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)

    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let texte = ''
      let texteCorr = ''
      // Générer les nombres aléatoires pour l'algorithme d'Euclide
      const a = randint(25, 100)
      const b = randint(18, a - 1)

      // Calcul du PGCD
      const pgcd = this.euclide(a, b)

      // Création des étapes de l'algorithme sous la forme "a = bq + r"
      const etapes = []
      let tempA = a; let tempB = b
      switch (listeTypeQuestions[i]) {
        case 'type1':

          while (tempB !== 0) {
            const quotient = Math.floor(tempA / tempB)
            const reste = tempA % tempB
            etapes.push(`<br>$${tempA} = ${tempB} \\times ${quotient} + ${reste}$`)
            tempA = tempB
            tempB = reste
          }
          etapes.push(`<br>Le dernier reste non-nul est ${tempA}.<br>`)

          // Texte de la question et correction
          texte = `Calculer, en utilisant l'algorithme d'Euclide, $PGCD (${a} ; ${b})$.`
          texteCorr = ' On effectue successivement les divisions euclidiennes de l\'algorithme, jusqu\'à obtenir un reste-nul :'
          texteCorr += '<br>' + etapes.join('\n')
          texteCorr += `<br> $PGCD (${a} ; ${b})=${miseEnEvidence(pgcd)}$.`
          break
      }

      // Vérification si la question n'a jamais été posée
      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions[i] =
                texte +
                  ajouteChampTexteMathLive(
                    this,
                    i,
                    `  ${KeyboardType.lycee}`,
                    { texteAvant: `<br>$PGCD(${a}~;~${b})=~~$` }
                  )

        this.listeCorrections[i] = texteCorr
        handleAnswers(this, i, { reponse: { value: `${pgcd}` } })
        i++
      }
      cpt++
    }

    // Génération finale du contenu de la liste de questions
    listeQuestionsToContenu(this)
  }
}
