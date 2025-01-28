import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import { miseEnEvidence } from '../../../lib/outils/embellissements'
import { remplisLesBlancs } from '../../../lib/interactif/questionMathLive'
import { handleAnswers } from '../../../lib/interactif/gestionInteractif'
import Exercice from '../../Exercice'
import { ecritureAlgebriqueSauf1, rienSi1 } from '../../../lib/outils/ecritures'

export const titre = 'Déterminer un vecteur normal à un plan.'
export const dateDePublication = '05/10/2024'
export const interactifReady = true
export const interactifType = 'mathLive'

/**
 *
 * @author
*/

export const uuid = '0cd98'
export const refs = {
  'fr-fr': ['canTSpeE05'],
  'fr-ch': []
}

export default class MilieuSegment extends Exercice {
  constructor () {
    super()

    this.nbQuestions = 1
  }

  nouvelleVersion () {
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let texte = ''
      let texteCorr = ''
      const a = randint(-10, 10, 0)
      const b = randint(-10, 10, 0)
      const c = randint(-10, 10)
      const d = randint(-10, 10)
      texte = ` Dans un repère orthonormé de l'espace $\\big(O ; \\vec \\imath,\\vec \\jmath, \\vec k\\big)$, on donne une équation cartésienne d'un plan $\\mathcal{P}$ : <br> $\\mathcal{P}~:~${rienSi1(a)}x ${ecritureAlgebriqueSauf1(b)}y${ecritureAlgebriqueSauf1(c)}z${ecritureAlgebriqueSauf1(d)}=0$.<br>`
      texte += '<br>Donner les coordonnées d\'un vecteur normal à $\\mathcal{P}$'

      if (this.interactif) {
        texte += ': ' + remplisLesBlancs(this, i, '$\\vec{n}$(%{champ1};%{champ2};%{champ3}).')
      } else texte += '.'
      handleAnswers(this, i, { champ1: { value: a }, champ2: { value: b }, champ3: { value: c } })
      texteCorr = 'On sait qu\'un plan dont l\'équation cartésienne est donnée par $ax+by+cz+d=0$,<br> (avec $a,b,c,d$ des réels)  admet le vecteur $\\vec{n}\\begin{pmatrix}a\\\\b\\\\c\\end{pmatrix}$ comme vecteur normal.<br>'
      texteCorr += `Il vient : $\\vec{n}\\begin{pmatrix}${miseEnEvidence(a)}\\\\${miseEnEvidence(b)}\\\\${miseEnEvidence(c)}\\end{pmatrix}$`

      if (this.questionJamaisPosee(i, texte)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
