import { SceneManager } from '../../lib/3d/SceneManager'
import { Solide } from '../../lib/3d/Solide'
import { listeQuestionsToContenu } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Solides en 3D avec Three.js'
export const dateDePublication = '2/06/2025'

export const uuid = 'threejs1'
export const refs = {
  'fr-fr': [],
  'fr-ch': []
}

export default class BetaThreeJs extends Exercice {
  sceneManager!: SceneManager
  constructor () {
    super()
    this.nbQuestions = 1
  }

  nouvelleVersion (): void {
    // Création de solides

    this.listeQuestions = ['Affichez les solides en 3D dans la scène.']
    this.listeCorrections = ['Les solides doivent être affichés correctement dans la scène.']
    listeQuestionsToContenu(this)

    document.addEventListener('exercicesAffiches', () => {
      const container = document.getElementById('exercice0Q0')
      if (container !== null) {
        container.style.width = '100%'
        container.style.height = '400px'
        this.sceneManager = new SceneManager(container)
        const solide = new Solide('tetraedre', 0xff8800 + 2000)
        solide.setPosition(0, 2.2, 0)
        this.sceneManager.add(solide.mesh)
        // Ajout des solides à la scène

        // Rendu de la scène
        this.sceneManager.render()
      }
    })
  }
}
