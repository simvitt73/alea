import { randint } from '../../../modules/outils'
import ExerciceSimple from '../../ExerciceSimple'
import { } from '../../../modules/2dGeneralites'
import { SceneViewer } from '../../../lib/3d/SceneViewer'
export const titre = 'Volume de pavé droit par dénombrement de cubes unités'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'
export const dateDePublication = '04/07/2022'

/**
 * @author Jean-Claude Lhote
 *

 */
export const uuid = 'e332d'

export const refs = {
  'fr-fr': ['can6M11'],
  'fr-ch': []
}
export default class VolumePaveCubes extends ExerciceSimple {
  constructor () {
    super()
    this.typeExercice = 'simple'
    this.nbQuestions = 1
    this.sup = 1
  }

  nouvelleVersion () {
    const sceneBuilder = new SceneViewer({ width: 400, height: 400 })
    sceneBuilder.addAmbientLight({
      color: '#ffffff',
      intensity: 0.8  // Augmenter l'intensité de la lumière ambiante
    })
    sceneBuilder.addDirectionnalLight({
      color: '#ffffff',
      intensity: 1.2,  // Lumière directionnelle plus forte
      position: [5, 5, 5]
    })
    sceneBuilder.setCamera({
      position: [0, 0, 0], // Position du rig (centre d'orbite)
      rotation: [0, 30, 0], // Rotation du rig
    })
    const l = randint(2, 5)
    const L = randint(2, 4)
    const h = randint(2, 6, [l, L])
    const dx = L * 0.5
    const dy = l * 0.5
    for (let x = 0; x < L; x++) {
      for (let y = 0; y < l; y++) {
        for (let z = 0; z < h; z++) {
          sceneBuilder.addCubeTroisCouleursABox({
            position: [x - dx, z, y - dy],
            size: 1,
            color1: 'red',
            color2: 'blue',
            color3: 'green'
          })
        }
      }
    }
    const vue = sceneBuilder.generateHTML({ withEarth: false, withSky: false })
    this.question = `${vue}<br>
    Ce pavé droit est composé de cubes identiques. En prenant comme unité l'un de ces cubes, quel est le volume de ce pavé droit ?<br>`
    this.reponse = L * l * h
    this.correction = `Le volume de ce pavé droit est : $${L}\\times ${l}\\times ${h}=${this.reponse}$`
    this.canEnonce = this.question
    this.canReponseACompleter = '$\\dots$ unités'
    document.addEventListener('exercicesAffiches', () => {
      SceneViewer.initializeScenes()
    }, { once: true })
  }
}
