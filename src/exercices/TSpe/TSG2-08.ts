import Exercice from '../Exercice'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
export const titre = 'Position relative de deux droites'

export const dateDePublication = '28/06/2025' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export const uuid = '36144'
export const refs = {
  'fr-fr': ['TSG2-08'],
  'fr-ch': []
}

/**
 * Stéphane Guyon
 * @author

*/
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.consigne = 'Dans un repère orthonormé de l\'espace, on considère les représentations paramétriques des droites $(d)$ et $(d\')$ :'
  }

  nouvelleVersion () {
    const typeQuestionsDisponibles = ['type1', 'type2', 'type3']

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let texte = ''
      let texteCorr = ''
      const xA = randint(-10, 10, 0)
      const yA = randint(-10, 10)
      const zA = randint(-10, 10, 0)
      const ux = randint(-10, 10, 0)
      const uy = randint(-10, 10, yA)
      const uz = randint(-10, 10, 0)
      let xB = randint(-10, 10, xA)
      let yB = randint(-10, 10, 0)
      let zB = randint(-10, 10, zA)
      const vx = randint(-10, 10, ux)
      const vy = randint(-10, 10, 0)
      const vz = randint(-10, 10, uz)
      switch (listeTypeQuestions[i]) {
        case 'type1':// Droites parallèles
          texte = `Question ${i + 1} de type 1 avec `
          texteCorr = `Correction ${i + 1} de type 1`
          break
        case 'type2':
          texte = 'Déterminer la position relative de ces deux droites : parallèles, sécantes ou non coplanaires.'
          xB = randint(-10, 10, xA)
          yB = randint(-10, 10, yB)
          zB = randint(-10, 10, zA)
          texte = ''
          texte += `$(d):\\begin{cases}x=${xA} + ${ux}t\\\\y= ${yA} + ${uy}t\\\\z= ${zA} + ${uz}t\\end{cases}$`
          texte += `$\\quad\\quad(d'):\\begin{cases}x=${xB} + ${vx}s\\\\y= ${yB} + ${vy}s\\\\z= ${zB} + ${vz}s\\end{cases}$`
          texteCorr = `Correction ${i + 1} de type 2`
          break
        default: // On termine toujours par default qui ici correspond à 'type3':
          texte = `Question ${i + 1} de type 3`
          texteCorr = `Correction ${i + 1} de type 3`
          break
      }
      if (this.questionJamaisPosee(i)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
