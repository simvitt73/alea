import { Matrice } from '../../lib/mathFonctions/Matrice.js'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { ecritureAlgebrique, ecritureParentheseSiNegatif } from '../../lib/outils/ecritures'
import { lettreIndiceeDepuisChiffre, lettreMinusculeDepuisChiffre } from '../../lib/outils/outilString.js'
import { listeQuestionsToContenu } from '../../modules/outils.js'
import { ComputeEngine } from '@cortex-js/compute-engine'
import Exercice from '../Exercice'

export const titre = 'Matrice d\'une application linéaire'

// Les exports suivants sont optionnels mais au moins la date de publication semble essentielle
export const dateDePublication = '26/11/2024' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag
export const dateDeModifImportante = '26/11/2024' // Une date de modification importante au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

/**
 * Description didactique de l'exercice
 * @author Maxime Nguyen
 */
export const uuid = 'de526'
export const ref = 'HPC105'
export const refs = {
  'fr-fr': ['HPC105'],
  'fr-ch': []
}
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.titre = titre
    this.consigne = 'Trouver la matrice de l\'application linéaire définie ci-dessous dans la base canonique.'
    this.nbQuestions = 3

    this.besoinFormulaireNumerique = ['Difficulté', 2, '1 : Matrice 2x2\n2 : Matrice 3x3'] // le paramètre sera numérique de valeur max 3 (le 3 en vert)
    this.sup = 2 // Valeur du paramètre par défaut
    // Remarques : le paramètre peut aussi être un texte avec : this.besoinFormulaireTexte = [texte, tooltip]
    //              il peut aussi être une case à cocher avec : this.besoinFormulaireCaseACocher = [texte] (dans ce cas, this.sup = true ou this.sup = false)

    this.nbCols = 2
    this.nbColsCorr = 2
    this.tailleDiaporama = 3
    this.video = ''
  }

  nouvelleVersion () {
    const computeEngine = new ComputeEngine()
    this.listeQuestions = []
    this.listeCorrections = []
    this.autoCorrection = []
    let listeTypeDeQuestionsDisponibles
    if (this.sup === 1) { // On ajuste la difficulté selon le paramètre.
      listeTypeDeQuestionsDisponibles = ['type1']
    } else { // ne jamais laisser de cas où rien n'est assigné car si quelqu'un modifie le this.sup dans l'url, on se retrouve avec une erreur
      // Si c'est pas 1, c'est 2 !
      listeTypeDeQuestionsDisponibles = ['type2']
    }
    const listeTypeQuestions = combinaisonListes(listeTypeDeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, coefficients, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      coefficients = [-9, -8, -7, -6, -5, -4, -3, -3, -2, -2, -2, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9]
      switch (listeTypeQuestions[i]) {
        case 'type1': {
          let expression1
          let expression2
          const n = 2
          const m = 2
          const table = []
          const nommatrice = lettreIndiceeDepuisChiffre(i + 1)
          const nomfonction = lettreMinusculeDepuisChiffre(i + 6)
          let coef = 0
          for (let i = 0; i < n; i++) {
            const ligne = []
            for (let j = 0; j < m; j++) {
              coef = choice(coefficients)
              ligne.push(coef)
            }
            table.push(ligne)
          }
          const matrice = new Matrice(table)
          expression1 = computeEngine.parse(`${table[0][0]} x + ${table[0][1]} y`).simplify().latex // On calcule l'expression de la première ligne
          expression2 = computeEngine.parse(`${table[1][0]} x + ${table[1][1]} y`).simplify().latex // On calcule l'expression de la deuxième ligne
          texte = `On donne l'application linéaire : \\[ ${nomfonction} : \\begin{array}{rcl} \\mathbb{R}^2 & \\longrightarrow & \\mathbb{R}^2 \\\\ (x,y) & \\longmapsto & \\left( ${expression1} \\, , \\, ${expression2} \\right) \\end{array}.\\] <br> Trouver la matrice de l'application linéaire $f$ dans la base canonique.`
          texteCorr = ''
          texteCorr += `On trouve la matrice de l'application linéaire $${nomfonction}$ en écrivant les vecteurs de la base canonique de $\\mathbb{R}^2$ dans la base de $\\mathbb{R}^2$ donnée par les vecteurs colonnes de la matrice de $${nomfonction}$. 
          <br><br> On calcule : $${nomfonction}(1,0) = (${table[0][0]},${table[1][0]})$ et $${nomfonction}(0,1) = (${table[0][1]},${table[1][1]})$.
          <br><br> On en déduit que : $${nommatrice} = ${matrice.toTex()}$.`
          break
        }
        case 'type2': {
          const n = 3
          const m = 3
          const table = []
          const nommatrice = lettreIndiceeDepuisChiffre(i + 1)
          let coef = 0
          for (let i = 0; i < n; i++) {
            const ligne = []
            for (let j = 0; j < m; j++) {
              coef = choice(coefficients)
              ligne.push(coef)
            }
            table.push(ligne)
          }
          const matrice = new Matrice(table)
          texte = `Calculer le déterminant de la matrice $${nommatrice} = ${matrice.toTex()}$.` // Les questions sont modifiées en fonction de la difficulté
          texteCorr = ''
          const matRed = []
          const factor = []
          for (let i = 0; i < 3; i++) {
            factor.push(matrice.get([0, i]))
            matRed.push(matrice.reduite(0, i))
          }
          texteCorr += `$\\begin{aligned}\\text{On calcule : }${matrice.texDet()}&=`
          for (let i = 0; i < 3; i++) {
            texteCorr += `${i % 2 === 0 ? '+' : '-'}${ecritureParentheseSiNegatif(factor[i])}\\times ${matRed[i].texDet()}`
          }
          texteCorr += '\\\\\n&='
          let parcel = ''
          for (let i = 0; i < 3; i++) {
            parcel += `${ecritureAlgebrique((-1) ** i * factor[i])}\\times ${ecritureParentheseSiNegatif(matRed[i].determinant())}`
          }
          if (parcel.startsWith('+')) parcel = parcel.substring(1)
          texteCorr += parcel + '\\\\\n&='
          parcel = ''
          for (let i = 0; i < 3; i++) {
            parcel += `${ecritureAlgebrique((-1) ** i * factor[i] * matRed[i].determinant())}`
          }
          if (parcel.startsWith('+')) parcel = parcel.substring(1)
          texteCorr += parcel + '\\\\\n&='
          texteCorr += `${matrice.determinant()}`
          texteCorr += '\\end{aligned}$.'
          break
        }
      }
      // Si la question n'a jamais été posée, on l'enregistre
      if (this.questionJamaisPosee(i, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
