import { fixeBordures } from '../../../lib/2d/fixeBordures'
import { MetaInteractif2d } from '../../../lib/2d/interactif2d'
import { KeyboardType } from '../../../lib/interactif/claviers/keyboard'
import { handleAnswers } from '../../../lib/interactif/gestionInteractif'
import { ajouteFeedback } from '../../../lib/interactif/questionMathLive'
import {
  creerTableauHtml,
  tableauDeVariation,
} from '../../../lib/mathFonctions/etudeFonction'
import { choice } from '../../../lib/outils/arrayOutils'
import { texFractionReduite } from '../../../lib/outils/deprecatedFractions'
import { reduireAxPlusB } from '../../../lib/outils/ecritures'
import { mathalea2d } from '../../../modules/mathalea2d'
import { listeQuestionsToContenu, randint } from '../../../modules/outils'
import Exercice from '../../Exercice'

export const titre = 'Dresser le tableau de signes d’une fonction affine'
export const interactifReady = true
export const interactifType = 'MetaInteractif2d'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '28/01/2026' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Modèle d'exercice très simple pour la course aux nombres
 * @author Gilles Mora

 */
export const uuid = '6e8cc'

export const refs = {
  'fr-fr': ['can2F25'],
  'fr-ch': [],
}
export default class TableauSignes extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      const a = randint(1, 6) * choice([-1, 1]) // coefficient a de la fonction affine
      const b = randint(1, 6) * choice([-1, 1]) // coefficient b de la fonction affine
      const zero = texFractionReduite(-b, a)

      let texte = `Compléter le tableau de signes de la fonction $f$ définie sur $\\mathbb{R}$ par $f(x)=${reduireAxPlusB(a, b)}$.`

      let texteCorr = `$f$ est une fonction affine. Elle s'annule en $x_0=${zero}$. `

      if (a > 0) {
        texteCorr += `<br>Comme $${a}>0~$, $~f(x)$ est positif pour $~x>${zero} ~$ et négatif pour $~x<${zero} $.<br>`
      } else {
        texteCorr += `<br>Comme $${a}<0$,  $f(x)~$ est négatif pour $~x>${zero} ~$ et positif pour $~x<${zero} $.<br>`
      }

      let ligne1
      if (a > 0) {
        ligne1 = ['Line', 25, '', 0, '-', 20, 'z', 20, '+']
      } else {
        ligne1 = ['Line', 25, '', 0, '+', 20, 'z', 20, '-']
      }

      texteCorr += " D'où le tableau de signes suivant :<br>"
      texteCorr += tableauDeVariation({
        tabInit: [
          [
            ['$x$', 3, 25],
            [`$f(x)=${reduireAxPlusB(a, b)}$`, 2, 50],
          ],
          [
            '$-\\infty$',
            20,
            `$${zero}$`,
            20,
            '$+\\infty$',
            30,
          ],
        ],
        tabLines: [ligne1],
        colorBackground: '',
        espcl: 3.5,
        deltacl: 0.8,
        lgt: 8,
        hauteurLignes: [15, 15],
      })

      // Création du tableau interactif à compléter
      const objetsTableau = creerTableauHtml({
        tabInit: [
          [
            ['$x$', 3, 25],
            [`$f(x)=${reduireAxPlusB(a, b)}$`, 2, 50],
          ],
          [
            '$-\\infty$',
            20,
            '',
            20,
            '$+\\infty$',
            30,
          ],
        ],
        tabLines: [['Line', 25, '', 0, '', 20, 'z', 20, '']],
        colorBackground: '',
        espcl: 3.5,
        deltacl: 0.8,
        lgt: 8,
      })

      // Création des champs interactifs
      const input = new MetaInteractif2d(
        [
          {
            x: 12.2,
            y: -1.5,
            content: '%{champ1}',
            classe: '',
            blanc: '\\ldots',
            opacity: 1,
            index: 0,
          },
          {
            x: 10,
            y: -4,
            content: '%{champ1}',
            classe: '',
            blanc: '\\ldots',
            opacity: 1,
            index: 1,
          },
          {
            x: 14.4,
            y: -4,
            content: '%{champ1}',
            classe: '',
            blanc: '\\ldots',
            opacity: 1,
            index: 2,
          },
        ],
        {
          exercice: this,
          question: i,
        },
      )
      objetsTableau.push(input)

      // Gestion des réponses
      handleAnswers(
        this,
        i,
        {
          field0: { value: zero },
          field1: { value: a > 0 ? '-' : '+' },
          field2: { value: a > 0 ? '+' : '-' },
        },
        { formatInteractif: 'MetaInteractif2d' },
      )

      // Ajout du tableau avec interactivité
      texte +=
        mathalea2d(
          Object.assign({}, fixeBordures(objetsTableau)),
          objetsTableau,
        ) +
        (this.interactif
          ? `<span id="resultatCheckEx${this.numeroExercice}Q${i}"></span>` +
            ajouteFeedback(this, i)
          : '')

      if (this.questionJamaisPosee(i, a, b)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr

        this.canEnonce = `Dresser le tableau de signes de la fonction $f$ définie sur  $\\mathbb{R}$ par $f(x)=${reduireAxPlusB(a, b)}$. `
        this.canReponseACompleter = `$\\begin{array}{|c|ccc|}
\\hline
x & \\scriptstyle{-\\infty} & \\ldots\\ldots & \\scriptstyle{+\\infty} \\\\
\\hline
f(x) & \\ldots\\ldots & \\scriptstyle{0} & \\ldots\\ldots \\\\
\\hline
\\end{array}$`
        this.listeCanEnonces.push(this.canEnonce)
        this.listeCanReponsesACompleter.push(this.canReponseACompleter)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
