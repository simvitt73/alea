import Exercice from '../Exercice'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
export const titre = 'Nom de l\'exercice'

export const dateDePublication = '4/5/2024' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export const uuid = '55a4e' // Quand on exécute pnpm start la première fois, le terminal renvoie une référence d'uuid, à copier-coller ici
export const refs = {
  'fr-fr': [],
  'fr-ch': []
}

/**
 *
 * @author Stéphane Guyon

*/
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.consigne = ''
  }

  nouvelleVersion () {
    const typeQuestionsDisponibles = ['type1', 'type2', 'type3'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const xA = randint(-10, 10, 0)
      const yA = randint(-10, 10, 0)
      const zA = randint(-10, 10, 0)
      const a = randint(-10, 10, 0)
      const b = randint(-10, 10, 0)
      const c = randint(-10, 10, 0)
      const t = randint(-4, 4, 0) // coeff de proportionnalité en cas d'appartennance
      let xM = 0
      let yM = 0
      let zM = 0
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':
          xM = xA + t * a
          yM = yA + t * b
          zM = zA + t * c
          texte = `Déterminer si le point $M(${xM};${yM};${zM}) appartient à la droite $(\\Delta)$$ dont on donne la représentation paramétrique ci-dessous :<br>` // Le LateX entre deux symboles $, les variables dans des ${ }
          texteCorr = `Correction ${i + 1} de type 1`
          break
        case 'type2':
          texte = `Question ${i + 1} de type 2`
          texteCorr = `Correction ${i + 1} de type 2`
          break
        case 'type3':
        default :
          texte = `Question ${i + 1} de type 3`
          texteCorr = `Correction ${i + 1} de type 3`
          break
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, a, b, c, xA, yA, zA, t, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
