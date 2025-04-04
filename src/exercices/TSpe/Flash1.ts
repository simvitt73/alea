import MetaExercice from '../MetaExerciceCan'
import Question1 from './Flash1_Q1'

export const titre = 'Questions flashs de cours Terminale'
export const interactifReady = true
export const interactifType = 'mathLive'
export const uuid = '635d4'
export const refs = {
  'fr-fr': ['Flash1-Tspe'],
  'fr-ch': []
}
export const dateDePublication = '14/04/2024'
/**
 * Annales CAN 2024
 * @author Gilles Mora
*/

const questions = [
  Question1,
]

export default class Flash1 extends MetaExercice {
  constructor () {
    super(questions)
  }
}
