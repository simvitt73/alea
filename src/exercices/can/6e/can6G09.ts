import Exercice from '../../Exercice'
import { listeQuestionsToContenu } from '../../../modules/outils'
import { pacman } from '../../../lib/2d/figures2d/pacman'
import { fixeBordures, mathalea2d } from '../../../modules/2dGeneralites'
import { sensInterdit } from '../../../lib/2d/figures2d/sensInterdit'
import { arretInterdit } from '../../../lib/2d/figures2d/arretInterdit'
import { finDeRoutePrioritaire, routePrioritaire } from '../../../lib/2d/figures2d/routePrioritaire'
import { ovale } from '../../../lib/2d/figures2d/ovale'
import { stationnementInterdit } from '../../../lib/2d/figures2d/stationnementInterdit'
import { croisementPrioriteADroite, panneauCederLePassage, panneauDoubleSens } from '../../../lib/2d/figures2d/panneauDanger'
import { panneauStop } from '../../../lib/2d/figures2d/panneauStop'

export const titre = 'Identifier des figures symétriques'
export const dateDePublication = '10/05/2025'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcReady = true
export const amcType = 'AMCNum'

/**
 * symétrie ou pas ?
 * Ref can6G09
 * @author Jean-Claude Lhote
 * Publié le 18/12/2021
 */
export const uuid = '85dfd'

export const refs = {
  'fr-fr': [''],
  'fr-ch': []
}
export default class SymetriqueOuPas extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 1
  }

  nouvelleVersion () {
    for (let i = 0; i < this.nbQuestions;) {
      const pac = pacman({ fillStyle: 'red' })
      const sensI = sensInterdit()
      const arrInter = arretInterdit()
      const rp = routePrioritaire()
      const fdrp = finDeRoutePrioritaire()
      const ov = ovale({ fillStyle: 'blue' })
      const statInter = stationnementInterdit()
      const ps = panneauStop()
      const prioriteAD = croisementPrioriteADroite()
      prioriteAD.dilate(2).translate(6, -10)
      ps.dilate(2).translate(24, -5)
      fdrp.dilate(2).translate(18, -5)
      const danger = panneauCederLePassage()
      const doubleSens = panneauDoubleSens()
      doubleSens.dilate(2).translate(12, -10)
      danger.dilate(2).translate(12, -5)
      statInter.dilate(2).translate(6, -5)
      ov.dilate(2).translate(0, -5)
      pac.dilate(2)
      rp.dilate(2).translate(24, 0)
      sensI.dilate(2).translate(6, 0)
      arrInter.dilate(2).translate(12, 0)
      const objets = [pac, sensI, arrInter, rp, ov, statInter, danger, fdrp, ps, doubleSens, prioriteAD]
      const texte = `On considère les figures suivantes :<br>
  ${mathalea2d(Object.assign({ scale: 0.5 }, fixeBordures(objets)), objets)}

  On dit que deux figures sont symétriques si l'on peut les superposer par pliage.<br>
  Est-ce que les figures ci-dessus sont symétriques ?<br>`

      this.listeQuestions[i] = texte
      this.listeCorrections[i] = ''
      i++
    }
    listeQuestionsToContenu(this)
  }
  // this.besoinFormulaireNumerique = ['Type d\'axes', 4, '1 : Axe vertical\n2 : Axe horizontal\n3 : Axe oblique\n4 : Mélange']
  // this.besoinFormulaire2Numerique = ['Type de papier pointé', 4, '1 : Carrés\n2 : Hexagones\n3 : Triangles équilatéraux\n4 : Mélange']
}
