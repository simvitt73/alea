import { choice } from '../../../lib/outils/arrayOutils'
import { texNombre } from '../../../lib/outils/texNombre'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceSimple from '../../ExerciceSimple'
import { randint } from '../../../modules/outils'
export const titre = 'Déterminer une évolution globale'
export const interactifReady = true
export const interactifType = 'mathLive'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '16/07/2025' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

*/
export const uuid = '7d3d1'

export const refs = {
  'fr-fr': ['can2C30'],
  'fr-ch': []
}
export default class EvolSuccessives extends ExerciceSimple {
  constructor () {
    super()
    this.optionsChampTexte = { texteApres: '$\\%$' }
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.optionsDeComparaison = { nombreDecimalSeulement: true }
    this.versionQcmDisponible = true
  }

  nouvelleVersion () {
    let CM, taux

    switch (choice([1, 2, 2])) { //
      case 1:
        taux = choice([10, 20, 30])
        CM = 1 + taux / 100

        this.question = ` Le prix d’un article  connait deux augmentations successives de $${taux}\\,\\%$. <br>
         Le taux d'évolution global associé est :   `
        this.correction = `  Le coefficient multiplicateur associé à une augmentatioin de $${taux}\\,\\%$ est $${texNombre(CM, 2)}$.<br>
        Le coefficient multiplicateur associé à deux augmentations successives de $${taux}\\,\\%$ est donc $${texNombre(CM, 2)}\\times ${texNombre(CM, 2)}=${texNombre(CM * CM, 2)}$.<br>
        L'évolution globale est donnée par  $${texNombre(CM * CM, 2)}-1=${texNombre(CM * CM - 1, 2)}=${miseEnEvidence(texNombre((CM * CM - 1) * 100, 2))}\\,\\%$.
        `

        this.reponse = this.versionQcm ? `$${texNombre((CM * CM - 1) * 100, 2)}\\,\\%$` : `${texNombre((CM * CM - 1) * 100, 2)}`

        this.distracteurs = [`$${texNombre(2 * taux, 2)}\\,\\%$`, `$${texNombre(taux, 2)}\\,\\%$`, `$${texNombre((CM * CM - 1) * 100 + 5, 2)}\\,\\%$`]
        this.canEnonce = `Le prix d’un article  connait deux augmentations successives de $${taux}\\,\\%$.`
        this.canReponseACompleter = 'L\'évolution globale est :  $\\ldots\\,\\%$'
        break
      case 2:
      default:
        taux = randint(1, 9) * 10
        CM = 1 - taux / 100

        this.question = ` Le prix d’un article  connait deux baisses successives de $${taux}\\,\\%$. <br>
         Le taux d'évolution global associé est :   `
        this.correction = `  Le coefficient multiplicateur associé à une baisse de $${taux}\\,\\%$ est $${texNombre(CM, 2)}$.<br>
        Le coefficient multiplicateur associé à deux baisses successives de $${taux}\\,\\%$ est donc $${texNombre(CM, 2)}\\times ${texNombre(CM, 2)}=${texNombre(CM * CM, 2)}$.<br>
        L'évolution globale est donnée par  $${texNombre(CM * CM, 2)}-1=${texNombre(CM * CM - 1, 2)}=${miseEnEvidence(texNombre((CM * CM - 1) * 100, 2))}\\,\\%$.
        `

        this.reponse = this.versionQcm ? `$${texNombre((CM * CM - 1) * 100, 2)}\\,\\%$` : `${texNombre((CM * CM - 1) * 100, 2)}`

        this.distracteurs = [`$${texNombre(-2 * taux, 2)}\\,\\%$`, `$${texNombre(-taux, 2)}\\,\\%$`, `$${texNombre((CM * CM - 1) * 100 + 5, 2)}\\,\\%$`]
        this.canEnonce = `Le prix d’un article  connait deux augmentations successives de $${taux}\\,\\%$.`
        this.canReponseACompleter = 'L\'évolution globale est :  $\\ldots\\,\\%$'
        break
    }
    if (!this.interactif && !this.versionQcm) {
      this.question += ' $\\ldots\\,\\%$'
    }
  }
}
