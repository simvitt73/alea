import Exercice from '../Exercice'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, ecritureParentheseSiNegatif } from '../../lib/outils/ecritures'
import FractionEtendue from '../../modules/FractionEtendue'
export const titre = 'Déterminer deux droites sont orthogonales.'

export const dateDePublication = '29/01/2025' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export const uuid = '34648'
export const refs = {
  'fr-fr': ['TSG2-04'],
  'fr-ch': []
}

/**
 *
 * @author Stéphane Guyon

*/
export default class nomExercice extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 2
    this.consigne = ''
  }

  nouvelleVersion () {
    const typeQuestionsDisponibles = ['type1'] // On créé 3 types de questions

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions) // Tous les types de questions sont posés mais l'ordre diffère à chaque "cycle"
    for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) { // Boucle principale où i+1 correspond au numéro de la question
      const xA = randint(-10, 10, 0)
      const yA = randint(-10, 10, 0)
      const zA = randint(-10, 10, 0)
      const xB = randint(-10, 10, [0, xA])
      const yB = randint(-10, 10, [0, yA])
      let zB = 0
      const x = randint(-10, 10, [0, xA, xB])
      const y = randint(-10, 10, [0, yA, yB])
      const z = randint(-10, 10, [0, zA])
      const a = randint(-10, 10, 0)
      const b = randint(-10, 10, 0)
      const c = randint(-10, 10, 0)
      const t = randint(-4, 4, [0, 1])
      const alea = randint(1, 3)// aléatoirisation pour non appartenance, déterminer quelle cooronnée est modifiée pour planter
      switch (listeTypeQuestions[i]) { // Suivant le type de question, le contenu sera différent
        case 'type1':// orthogonal
          zB = a * xA + b * yA + c * zA - b * yB - a * xA
          
          break
        case 'type2':// défavorable
        default :

          break
      }
      texte = 'Dans un repère orthonormé de l\'espace, on donne les coordonénes des points $A$ et $B$ et la représentation paramétrique d\'une droite $(\\Delta)$ :<br>'
      texte += `$ A(${xA}~;~${yA}~;~${zA})$ ; $B(${xB}~;~${yB}~;~${zB})$ et `
      texte += `$(\\Delta) : \\begin{cases}x=${x}${ecritureAlgebriqueSauf1(a)} t\\\\y=${y}${ecritureAlgebriqueSauf1(b)} t\\quad (t\\in\\mathbb{R})\\\\z=${z}${ecritureAlgebriqueSauf1(c)} t\\end{cases}$`
      texte += 'Déterminer si les doites $(AB)$ et $\\Delta)$ sont orthogonales.'
      texteCorr = 'Pour prouver l\'orthogonalité de deux droites, il suffit de vérifier si le produit scalaire de deux de leurs vecteurs directeurs respectifs est nul.<br>'
      texteCorr += 'Un vecteur directeur de la droite $(\\Delta)$ est, d\'après le cours, directement donné par sa représentation paramétrique :<br>'
      texteCorr += 'Si $(\\Delta) : \\begin{cases}x=x_A+at\\\\y=y_A+bt\\quad (t\\in\\mathbb{R})\\\\z=z_A+ct\\end{cases}$<br>'
      texteCorr += 'alors un vecteur directeur de la droite $(\\Delta)$ est $\\overrightarrow{u}\\begin{pmatrix} a\\\\b\\\\c\\end{pmatrix}$<br>'
      texteCorr += `On en déduit que dans notre situation, un vecteur directeur de la droite $(\\Delta)$ est $\\overrightarrow{u}\\begin{pmatrix} ${a}\\\\${b}\\\\${c}\\end{pmatrix}$<br>`
      texteCorr += 'On calcule les coordonnées du vecteur $\\overrightarrow{AB}$ vecteur directeur de la droite $(AB)$ :<br>'
      texteCorr += `$\\overrightarrow{AB}\\begin{pmatrix} ${xB}${ecritureAlgebrique(xA)}\\\\${yB}${ecritureAlgebrique(yA)}\\\\${zB}${ecritureAlgebrique(zA)}\\end{pmatrix}$<br>`
      texteCorr += `$\\iff\\overrightarrow{AB}\\begin{pmatrix} ${xB - xA}\\\\${yB - yA}\\\\${zB - zA}\\end{pmatrix}$<br>`
      texteCorr += 'On calcule le produit scalaire de ces deux vecteurs : <br>'
      texteCorr += `$\\overrightarrow{u}\\cdot\\overrightarrow{AB} = ${a}\\times ${ecritureParentheseSiNegatif(xB - xA)}+${ecritureParentheseSiNegatif(b)}\\times ${ecritureParentheseSiNegatif(yB - yA)}+${ecritureParentheseSiNegatif(c)}\\times ${ecritureParentheseSiNegatif(zB - zA)}=${a * (xB - xA) + b * (yB - yA) + c * (zB - zA)}$<br>`
      if (this.questionJamaisPosee(i, a, b, c, xA, yA, zA, xB, yB, zB, x, y, z, t, texte)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this) // On envoie l'exercice à la fonction de mise en page
  }
}
