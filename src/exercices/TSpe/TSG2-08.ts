import Exercice from '../Exercice'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, reduireAxPlusB, rienSi0, rienSi1 } from '../../lib/outils/ecritures'
import { miseEnEvidence, texteEnCouleurEtGras, texteItalique } from '../../lib/outils/embellissements'
import FractionEtendue from '../../modules/FractionEtendue'

export const titre = 'Position relative de deux droites'

export const dateDePublication = '28/06/2025' // La date de publication initiale au format 'jj/mm/aaaa' pour affichage temporaire d'un tag

export const uuid = '36144'
export const refs = {
  'fr-fr': ['TSG2-08'],
  'fr-ch': []
}

/**
 * Stéphane Guyon
 * @author

*/
export default class NomExercice extends Exercice {
  constructor () {
    super()
    this.consigne = texteItalique('Préciser si l\'affirmation suivante est vraie ou fausse, puis justifier la réponse donnée.<br> Une réponse non argumentée ne sera pas prise en compte.')
    this.consigne += '<br> Dans un repère orthonormé de l\'espace, on considère les représentations paramétriques des droites $(d)$ et $(d~\')$'
    this.nbQuestions = 1 // Nombre de questions à générer
  }

  nouvelleVersion () {
    const typeQuestionsDisponibles = ['type2', 'type3']

    const listeTypeQuestions = combinaisonListes(typeQuestionsDisponibles, this.nbQuestions)
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      let texte = ''
      let texteCorr = ''
      const xA = randint(-10, 10, 0)// abscisse du point A
      const yA = randint(-10, 10, 0)  // ordonnée du point A
      const zA = randint(-10, 10, 0)  // cote du point A
      // On choisit un vecteur directeur u de la droite (d)
      const ux = randint(-10, 10, 0)  // composante x du vecteur directeur u
      const uy = randint(-10, 10, [yA, 0])  // composante y du vecteur directeur u
      const uz = randint(-10, 10, [zA, 0])  // composante z du vecteur directeur u
      // On choisit un vecteur directeur v de la droite (d')
      let xB = randint(-10, 10, [xA, 0])  // abscisse du point B
      // On s'assure que le point B n'est pas confondu avec le point
      let yB = randint(-10, 10, 0)  // ordonnée du point B
      let zB = randint(-10, 10, [zA, 0])
      let vx = randint(-10, 10, [ux, xA, 0])  // composante x du vecteur directeur v
      let vy = randint(-10, 10, [uy, yA, 0])  // composante y du vecteur directeur v
      let vz = randint(-10, 10, [uz, zA, 0])  // composante z du vecteur directeur v
      let u1 = new FractionEtendue(vx, ux)  // On crée les fractions étendues pour les vecteurs directeurs
      let u2 = new FractionEtendue(vy, uy)  // On crée les fractions étendues pour les vecteurs directeurs
      let u3 = new FractionEtendue(vz, uz)  // On crée les fractions étendues pour les vecteurs directeurs
      // On s'assure que les vecteurs directeurs ne sont pas colinéaires
      const alpha = randint(-3, 3, 0) // Pour éviter les droites parallèles
      const beta = randint(-3, 3, 0) // Pour éviter les droites parallèles
      const affirmation = choice(['Les droites $(d)$ et $(d~\')$ sont parallèles.',
        'Les droites $(d)$ et $(d~\')$ sont sécantes.',
        'Les droites $(d)$ et $(d~\')$ sont non coplanaires.']) // On choisit une affirmation aléatoire parmi les trois possibles
      switch (listeTypeQuestions[i]) {
        case 'type2':// Droites non-coplanaires

          //  v = (vx, vy, vz) tel que u et v ne soient pas colinéaires
          // et que le
          vx = randint(-10, 10, [ux, xA, 0])
          vy = randint(-10, 10, [uy, yA, 0])
          vz = randint(-10, 10, [uz, zA, 0])
          if (vx / ux === vy / uy && vy / uy === vz / uz) { vz = vz + 1 } // On s'assure que les droites ne sont pas parallèles
          // vecteur AB = (xB-xA, yB-yA, zB-zA) ne soit pas coplanaire avec u et v
          xB = alpha * ux + beta * vx + xA  // Choisir xB pour que AB non coplanaire avec u et v
          yB = alpha * uy + beta * vy + yA  // Choisir yB pour que AB non coplanaire avec u et v
          zB = alpha * uz + beta * vz + zA - 1  // Choisir zB pour que AB non coplanaires avec u et v
          u1 = new FractionEtendue(vx, ux)  // On crée les fractions étendues pour les vecteurs directeurs
          u2 = new FractionEtendue(vy, uy)  // On crée les fractions étendues pour les vecteurs directeurs
          u3 = new FractionEtendue(vz, uz)  // On crée les fractions étendues pour les vecteurs directeurs
          texte += `$(d):\\begin{cases}x=${reduireAxPlusB(ux, xA, 't', { ordreInverse: true })} \\\\y= ${rienSi0(yA)}  ${ecritureAlgebriqueSauf1(uy)}t\\quad(t\\in\\mathbb{R})\\\\z= ${rienSi0(zA)} ${ecritureAlgebriqueSauf1(uz)}t\\end{cases}$`
          texte += `$\\quad\\quad(d'):\\begin{cases}x=${rienSi0(xB)}${ecritureAlgebriqueSauf1(vx)}s\\\\y= ${rienSi0(yB)}  ${ecritureAlgebriqueSauf1(vy)}s\\quad(s\\in\\mathbb{R})\\\\z= ${rienSi0(zB)} ${ecritureAlgebriqueSauf1(vz)}s\\end{cases}$`
          // On écrit les représentations paramétriques des droites (d) et (d')
          texte += `<br><br>${texteEnCouleurEtGras('Affirmation :')}  ${affirmation}`
          texteCorr = texteEnCouleurEtGras('Étape 1 : Droites parallèles ?')
          texteCorr += '<br>On sait que la représentation paramétrique d\'une droite est de la forme '
          texteCorr += '$(d):\\begin{cases}x=x_A+at \\\\y= y_A+bt\\quad(t\\in\\mathbb{R})\\\\z= z_A+ct\\end{cases}$'
          texteCorr += '<br>où le point $A(x_A, y_A, z_A)$ est un point de la droite et $\\vec u\\begin{pmatrix}a\\\\b\\\\c\\end{pmatrix}$ est un vecteur directeur de la droite.<br>'
          texteCorr += `<br>On en déduit que le vecteur $\\vec u$ de coordonnées $\\vec u\\begin{pmatrix} ${ux}\\\\${uy}\\\\${uz}\\end{pmatrix}$ est un vecteur directeur de (d) `
          texteCorr += `et que $\\vec v$ de coordonnées $\\vec v\\begin{pmatrix} ${vx}\\\\${vy}\\\\${vz}\\end{pmatrix}$ est un vecteur directeur de (d'). <br>`
          // On teste la colinéarité des vecteurs directeurs
          texteCorr += 'On compare pour les quotients des composantes de même dimension : <br>'
          texteCorr += `$\\frac{${ux}}{${vx}} = ${new FractionEtendue(ux, vx).texFractionSimplifiee}\\quad$`
          texteCorr += `;$\\quad\\frac{${uy}}{${vy}} = ${new FractionEtendue(uy, vy).texFractionSimplifiee}\\quad$`
          texteCorr += `;$\\quad\\frac{${uz}}{${vz}} = ${new FractionEtendue(uz, vz).texFractionSimplifiee}$`
          texteCorr += '<br>On constate que les quotients ne sont pas égaux, donc les vecteurs ne sont donc pas colinéaires et les droites ne sont pas parallèles.<br><br>'
          // On teste si les droites sont sécantes ou non-coplanaires
          texteCorr += texteEnCouleurEtGras('Étape 2 : Droites sécantes ou non-coplanaires ?')
          texteCorr += '<br>Si les droites $(d)$ et $(d\')$ sont sécantes, il existe un point d\'intersection $M(x;y;z)$ tel que $M\\in(d)\\cap (d\')$.'
          texteCorr += '<br>Les coordonnées du point $M$ vérifient donc les deux représentations paramétriques. <br>Ce qui est équivalent à résoudre le système suivant :'
          texteCorr += `<br>$\\begin{cases}
            ${reduireAxPlusB(ux, xA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vx, xB, 's', { ordreInverse: true })} \\\\
            ${reduireAxPlusB(uy, yA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vy, yB, 's', { ordreInverse: true })} \\\\
            ${reduireAxPlusB(uz, zA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vz, zB, 's', { ordreInverse: true })}
            \\end{cases}$`
          texteCorr += '<br>On peut réécrire ce système sous la forme :'
          texteCorr += `<br>$\\begin{cases}
            ${rienSi1(ux)}t = ${rienSi1(vx)}s ${ecritureAlgebrique(xB - xA)} \\\\
            ${rienSi1(uy)}t = ${rienSi1(vy)}s ${ecritureAlgebrique(yB - yA)} \\\\
            ${rienSi1(uz)}t = ${rienSi1(vz)}s ${ecritureAlgebrique(zB - zA)}
            \\end{cases}$`
          texteCorr += `<br><br>$\\begin{cases}
            t = ${new FractionEtendue(vx, ux).texFractionSimplifiee}s ${new FractionEtendue(xB - xA, ux).texFractionSignee} \\\\\\\\
            t= ${new FractionEtendue(vy, uy).texFractionSimplifiee}s ${new FractionEtendue(yB - yA, uy).texFractionSignee} \\\\\\\\
            t = ${new FractionEtendue(vz, uz).texFractionSimplifiee}s ${new FractionEtendue(zB - zA, uz).texFractionSignee}
            \\end{cases}$`
          texteCorr += '<br>En égalisant les lignes 1 et 2, et les lignes 1 et 3, cela implique que $s$ doit vérifier le système :<br>'
          texteCorr += `<br>$\\begin{cases}
            ${new FractionEtendue(vx, ux).texFractionSimplifiee}s ${new FractionEtendue(xB - xA, ux).texFractionSignee}=${new FractionEtendue(vy, uy).texFractionSimplifiee}s ${new FractionEtendue(yB - yA, uy).texFractionSimplifiee} \\\\\\\\
            ${new FractionEtendue(vx, ux).texFractionSimplifiee}s ${new FractionEtendue(xB - xA, ux).texFractionSignee} = ${new FractionEtendue(vz, uz).texFractionSimplifiee}s ${new FractionEtendue(zB - zA, uz).texFractionSignee}
            \\end{cases}$`
          texteCorr += `<br><br>$\\begin{cases}
            \\left(${u1.texFractionSimplifiee}+${u2.oppose().texFractionSimplifiee}\\right)s =${new FractionEtendue(yB - yA, uy).texFractionSimplifiee}${new FractionEtendue(xB - xA, ux).oppose().ecritureAlgebrique} \\\\\\\\
            \\left(${u1.texFractionSimplifiee}+${u3.oppose().texFractionSimplifiee}\\right)s = ${new FractionEtendue(zB - zA, uz).texFractionSimplifiee}${new FractionEtendue(xB - xA, ux).oppose().ecritureAlgebrique}
            \\end{cases}$`

          texteCorr += `<br><br>$\\begin{cases}
            ${u1.differenceFraction(u2).texFraction}s =${new FractionEtendue(yB - yA, uy).texFractionSignee} \\\\\\\\
            ${u1.differenceFraction(u3).texFraction}s = ${new FractionEtendue(zB - zA, uz).texFractionSignee}
            \\end{cases}$`
          texteCorr += 'Les deux équations sont incompatibles donc le système n\'admet pas de solution.<br>'
          texteCorr += texteEnCouleurEtGras('Conclusion :<br>')
          texteCorr += texteEnCouleurEtGras('Donc les droites $(d)$ et $(d\')$ ne sont pas sécantes, elles sont donc non-coplanaires.')
          break
        default: // On termine toujours par default qui ici correspond à 'type3':
          texte = `Question ${i + 1} de type 3`
          texteCorr = `Correction ${i + 1} de type 3`
          break
      }
      if (this.questionJamaisPosee(i)) { // <- laisser le i et ajouter toutes les variables qui rendent les exercices différents (par exemple a, b, c et d)
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenu(this)
  }
}
