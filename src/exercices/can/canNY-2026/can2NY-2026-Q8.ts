import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { texNombre } from '../../../lib/outils/texNombre'
import ExerciceSimple from '../../ExerciceSimple'

import { handleAnswers } from '../../../lib/interactif/gestionInteractif'
import { randint } from '../../../modules/outils'
export const titre = 'Compléter une égalité'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = 'ru8u5'
export const refs = {
  'fr-fr': [],
  'fr-ch': ['NR'],
}
/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Eric Elter - Gilles Mora

*/
export default class EgaliteCompleter2026 extends ExerciceSimple {
  constructor() {
    super()
    this.typeExercice = 'simple' // Cette ligne est très importante pour faire un exercice simple !
    this.nbQuestions = 1
    this.nbQuestionsModifiable = false
    this.formatInteractif = 'fillInTheBlank'
    this.formatChampTexte = KeyboardType.clavierFullOperations
  }

  nouvelleVersion() {
    const annee = 2026
    switch (this.canOfficielle ? 1 : randint(1, 3)) {
      case 1:
        this.optionsDeComparaison = { texteAvecCasse: true }
        this.reponse = `\\sqrt{${annee}}`
        this.consigne = `Compléter :`
        this.question = `\\sqrt{${texNombre(annee, 0)}}\\times ~%{champ1}=${annee} `
        this.correction = `On utilise la propriété $\\sqrt{a}\\times \\sqrt{a} =a$ valable pour $a$  positif.<br>
        Ainsi, $\\sqrt{${texNombre(annee, 0)}}\\times${miseEnEvidence(this.reponse)}=${annee}$`
        handleAnswers(this, 0, { champ1: { value: this.reponse } })
        this.canReponseACompleter = `$\\sqrt{${texNombre(annee, 0)}}\\times \\ldots =${annee}$`
        break
      case 2:
        this.optionsDeComparaison = { texteAvecCasse: true }
        this.reponse = `2\\times\\sqrt{${annee}}` // A cause de remplisLesBlancs, les 3 bonnes réponses sont écrites en dur dans handleAnswers alors qu'elles devraient écrites ici.
        /*this.reponse = [
          `2\\times\\sqrt{${annee}}`,
          `2\\sqrt{${annee}}`,
          `\\sqrt{${annee}}\\times2`,
        ]*/
        this.consigne = `Compléter :`
        this.question = `\\sqrt{${texNombre(annee, 0)}}+\\sqrt{${texNombre(annee, 0)}}= ~%{champ1} `
        this.correction = `
        $\\sqrt{${texNombre(annee, 0)}}+\\sqrt{${texNombre(annee, 0)}}=${miseEnEvidence(this.reponse)}$`
        handleAnswers(this, 0, {
          champ1: {
            value: [
              `2\\times\\sqrt{${annee}}`,
              `2\\sqrt{${annee}}`,
              `\\sqrt{${annee}}\\times2`,
            ],
          },
        })
        this.canReponseACompleter = `$\\sqrt{${texNombre(annee, 0)}}+\\sqrt{${texNombre(annee, 0)}}= \\ldots$`
        break
      case 3:
        this.optionsDeComparaison = { nombreDecimalSeulement: true }
        this.reponse = `${annee}`
        this.consigne = `Compléter :`
        this.question = `\\sqrt{${texNombre(annee, 0)}}\\times \\sqrt{${texNombre(annee, 0)}}=~%{champ1} `
        this.correction = `On utilise la propriété $\\sqrt{a}\\times \\sqrt{a} =a$ valable pour $a$  positif.<br>
        $\\sqrt{${texNombre(annee, 0)}}\\times \\sqrt{${texNombre(annee, 0)}}=${miseEnEvidence(this.reponse)}$`
        handleAnswers(this, 0, { champ1: { value: this.reponse } })
        this.canReponseACompleter = `$\\sqrt{${texNombre(annee, 0)}}\\times \\sqrt{${texNombre(annee, 0)}} =\\ldots$`
        break
    }
    this.canEnonce = this.consigne
  }
}
