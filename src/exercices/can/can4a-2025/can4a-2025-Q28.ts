import { miseEnEvidence } from '../../../lib/outils/embellissements'
import ExerciceCan from '../../ExerciceCan'
import { randint } from '../../../modules/outils'
import { toutPourUnPoint } from '../../../lib/interactif/mathLive'

export const titre = 'Ratios'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '3422o'
export const refs = {
  'fr-fr': [],
  'fr-ch': []
}

/**
 * @author Jean-Claude Lhote

*/
export default class Can2025N4Q28 extends ExerciceCan {
  private enonce (a?:number, b?:number, c?:number) {
    if (a == null || b == null || c == null) {
      a = randint(2, 6)
      b = randint(2, 6, a)
      c = (a + b) * randint(2, 6)
    }
    this.formatInteractif = 'fillInTheBlank'
    const part = c / (a + b)
    const partA = part * a
    const partB = part * b
    this.reponse = { bareme: toutPourUnPoint, champ1: { value: [`${a}`, `${partA}`] }, champ2: { value: [`${b}`, `${partB}`] } }
    this.consigne = `Dans un club sportif de $${c}$ membres, il y a $${partA}$ minimes et $${partB}$ cadets.<br>
    Quel est le ratio entre le nombre de minimes et de cadets ?`
    if (this.interactif) { this.question = '%{champ1}:%{champ2}' }
    this.correction = `Le ratio entre le nombre de minimes et de cadets est de $${miseEnEvidence(`${partA}:${partB}`)}$ ou $${miseEnEvidence(`${a}:${b}`)}$`
    this.canEnonce = `Dans un club sportif de $${c}$ membres, il y a $${partA}$ minimes et $${partB}$ cadets.<br>
    Quel est le ratio entre le nombre de minimes et de cadets ?`
    this.canReponseACompleter = ''
  }

  nouvelleVersion () {
    this.canOfficielle ? this.enonce(4, 3, 28) : this.enonce()
  }
}
