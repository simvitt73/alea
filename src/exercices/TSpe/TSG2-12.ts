import { createList } from '../../lib/format/lists'
import {
  ecritureAlgebrique,
  ecritureAlgebriqueSauf1,
  ecritureParentheseSiNegatif,
  rienSi1,
} from '../../lib/outils/ecritures'
import {
  miseEnEvidence,
  texteEnCouleurEtGras,
} from '../../lib/outils/embellissements'
import FractionEtendue from '../../modules/FractionEtendue'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = "Calculer la distance d'un point à un plan."

export const dateDePublication = '26/01/2025' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export const uuid = '3c811'

export const refs = {
  'fr-fr': ['TSG2-12'],
  'fr-ch': [],
}

/**
 *
 * @author Stéphane Guyon
 */
export default class NomExercice extends Exercice {
  constructor() {
    super()
    this.nbQuestions = 1
  }

  nouvelleVersion() {
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50; ) {
      let texte = ''
      let texteCorr = ''

      const xA = randint(-6, 6, 0)
      const yA = randint(-6, 6, 0)
      const zA = randint(-6, 6, 0)

      const a = randint(-5, 5, 0)
      const b = randint(-5, 5, 0)
      const c = randint(-5, 5, 0)

      let d = randint(-8, 8)
      const valeurPlanEnA = () => a * xA + b * yA + c * zA + d
      if (valeurPlanEnA() === 0) {
        d += randint(-4, 4, 0)
      }

      const denom = a * a + b * b + c * c
      const tIntersection = new FractionEtendue(-valeurPlanEnA(), denom)
      const xH = new FractionEtendue(xA * denom - a * valeurPlanEnA(), denom)
      const yH = new FractionEtendue(yA * denom - b * valeurPlanEnA(), denom)
      const zH = new FractionEtendue(zA * denom - c * valeurPlanEnA(), denom)
      const distanceAH = Math.abs(valeurPlanEnA()) / Math.sqrt(denom)

      texte =
        "Dans un repère orthonormé de l'espace, on considère le point $A$ de coordonnées "
      texte += `$A(${xA} ; ${yA} ; ${zA})$ et le plan $(P)$ d'équation cartésienne`
      texte += `$${rienSi1(a)}x ${ecritureAlgebriqueSauf1(b)} y ${ecritureAlgebriqueSauf1(c)} z ${ecritureAlgebrique(d)} = 0$.<br>`
      texte += `Déterminer la distance du point $A$ au plan $(P)$.<br>`

      const normal = `${texteEnCouleurEtGras('Vecteur normal au plan :', 'blue')}<br>A partir de l'équation cartésienne du plan $\\mathcal{P}$, on en déduit que le vecteur $\\vec{n}\\begin{pmatrix}${a}\\\\${b}\\\\${c}\\end{pmatrix}$ est un vecteur normal du plan $\\mathcal{P}$.<br>`

      const droiteNormale = `${texteEnCouleurEtGras('Représentation paramétrique de la droite orthogonale au plan $\\mathcal{P}$ passant par le point $A$ :', 'blue')}<br>La représentation paramétrique de cette droite se définit à partir des coordonnées du point $A(${xA} ; ${yA} ; ${zA})$ et des coordonénes de son vecteur directeur vecteur $\\vec{n}\\begin{pmatrix}${a}\\\\${b}\\\\${c}\\end{pmatrix}$: $\\left\\{ \\begin{array}{l} x = ${xA} ${ecritureAlgebriqueSauf1(a)} t \\\\ y = ${yA} ${ecritureAlgebriqueSauf1(b)} t \\quad (t\\in\\mathbb{R}) \\\\ z = ${zA} ${ecritureAlgebriqueSauf1(c)} t \\end{array} \\right.$<br>`

      let intersection = `${texteEnCouleurEtGras("Coordonnées du point d'intersection $H$ entre la droite et $(P)$ :", 'blue')}<br>`
      intersection += `En remplaçant dans l'équation de $(P)$, on obtient :<br>`
      intersection += `$${rienSi1(a)}(${xA} ${ecritureAlgebriqueSauf1(a)} t) ${ecritureAlgebriqueSauf1(b)}(${yA} ${ecritureAlgebriqueSauf1(b)} t) ${ecritureAlgebriqueSauf1(c)}(${zA} ${ecritureAlgebriqueSauf1(c)} t) ${ecritureAlgebrique(d)} = 0$<br>`
      intersection += `$\\iff (${a * a}+${b * b}+${c * c})t ${ecritureAlgebrique(valeurPlanEnA())} = 0 \\iff t=${tIntersection.texFractionSimplifiee}$<br>`
      intersection += `En remplaçant ce $t$ dans les équations paramétriques, on obtient : `
      intersection += `$H\\begin{cases} x_H = ${xH.texFractionSimplifiee} \\\\ y_H = ${yH.texFractionSimplifiee} \\\\ z_H = ${zH.texFractionSimplifiee} \\end{cases}$<br>`

      let distance = `${texteEnCouleurEtGras('Distance $AH$ :', 'blue')}<br>`
      const valeurAbsolue = Math.abs(valeurPlanEnA())
      distance += `$AH = \\left|t\\right|\\times \\|\\vec{n}\\| = \\left|${tIntersection.texFractionSimplifiee}\\right| \\times \\sqrt{${denom}} = \\dfrac{${valeurAbsolue}}{\\sqrt{${denom}}} ${miseEnEvidence(
        `\\approx ${distanceAH.toFixed(2)}`,
      )}$`
      let appartient = `${texteEnCouleurEtGras("Vérification que $A$ n'appartient pas au plan $(P)$ :", 'blue')}<br>`
      appartient += `On remplace les coordonénes du point $A$ dans l'équation du plan et on calcule $${a} \\times ${ecritureParentheseSiNegatif(xA)}  ${ecritureAlgebrique(b)} \\times ${ecritureParentheseSiNegatif(yA)}  ${ecritureAlgebrique(c)} \\times ${ecritureParentheseSiNegatif(zA)}  ${ecritureAlgebrique(d)} = ${valeurPlanEnA()} \\neq 0$.<br>`
      appartient += `Donc le point $A$ n'appartient pas au plan $(P)$.<br>`
      texteCorr =
        "Pour calculer la distance du point $A$ au plan $(P)$, nous allons d'abord vérifier si le point $A$ appartient au plan.<br> S'il n'appartient pas, on cherche la représentation paramétrique de la droite orthogonale au plan $\\mathcal{P}$ passant par le point $A$. <br>On pourra alors calculer les coordonénes du point $H$ projeté orthogonal du point $A$ sur le plan $\\mathcal{P}$.  Enfin, on calculera la distance $AH$.<br>"
      texteCorr += createList({
        items: [appartient, normal, droiteNormale, intersection, distance],
        style: 'fleches',
      })
      texteCorr += `<br>La distance cherchée est donc $${miseEnEvidence(
        `AH = \\dfrac{${valeurAbsolue}}{\\sqrt{${denom}}} \\approx ${distanceAH.toFixed(
          2,
        )}`,
      )}$.`

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
