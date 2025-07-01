import Exercice from '../Exercice'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, reduireAxPlusB, rienSi0, rienSi1 } from '../../lib/outils/ecritures'
import { miseEnEvidence, texteEnCouleurEtGras, texteGras, texteItalique } from '../../lib/outils/embellissements'
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
    this.correctionDetaillee = false
    this.correctionDetailleeDisponible = true
  }

  nouvelleVersion () {
    const typeQuestionsDisponibles = ['nonCoplanaires', 'secantes']

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
      let u4 = new FractionEtendue(vz, uz)  // On crée les fractions étendues pour les vecteurs directeurs
      let u5 = new FractionEtendue(vy, uy)  // On crée les fractions étendues pour les vecteurs directeurs
      let u6 = new FractionEtendue(vz, uz)  // On crée les fractions étendues pour les vecteurs directeurs
      let resultat1 = new FractionEtendue(ux * (yB - yA) - ux * (xB - xA), uy * vx - ux * vy)
      let resultat2 = new FractionEtendue(ux * (zB - zA) - uz * (xB - xA), uz * vx - ux * vz)
      let quotient1 = new FractionEtendue(uy * uy, vx * uy - vy * ux)
      let quotient2 = new FractionEtendue(uz * uz, vx * uz - vz * ux)
      // // On s'assure que les vecteurs directeurs ne sont pas colinéaires
      const alpha = randint(-3, 3, 0) // Pour éviter les droites parallèles
      const beta = randint(-3, 3, 0) // Pour éviter les droites parallèles
      const affirmation = choice(['Les droites $(d)$ et $(d~\')$ sont parallèles.',
        'Les droites $(d)$ et $(d~\')$ sont sécantes.',
        'Les droites $(d)$ et $(d~\')$ sont non coplanaires.']) // On choisit une affirmation aléatoire parmi les trois possibles
      switch (listeTypeQuestions[i]) {
        case 'nonCoplanaires':// Droites non-coplanaires

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
          u4 = new FractionEtendue(xB - xA, ux)  // On crée les fractions étendues pour le vecteur AB
          u5 = new FractionEtendue(yB - yA, uy)  // On crée les fractions étendues pour le vecteur AB
          u6 = new FractionEtendue(zB - zA, uz)  // On crée les fractions étendues pour le vecteur AB
          resultat1 = new FractionEtendue(ux * (yB - yA) - uy * (xB - xA), uy * vx - ux * vy) // Pour le calcul de colinéarité
          resultat2 = new FractionEtendue(ux * (zB - zA) - uz * (xB - xA), uz * vx - ux * vz) // Pour le calcul de colinéarité
          quotient1 = new FractionEtendue(ux * uy, (vx * uy) - (vy * ux)) // Pour la dernière ligne de calcul du quotient de la colinéarité
          quotient2 = new FractionEtendue(ux * uz, (vx * uz) - (vz * ux)) // Pour la dernière ligne de calcul du quotient de la colinéarité
          texte += `$(d):\\begin{cases}x=${reduireAxPlusB(ux, xA, 't', { ordreInverse: true })} \\\\y= ${rienSi0(yA)}  ${ecritureAlgebriqueSauf1(uy)}t\\quad(t\\in\\mathbb{R})\\\\z= ${rienSi0(zA)} ${ecritureAlgebriqueSauf1(uz)}t\\end{cases}$`
          texte += `$\\quad\\quad(d'):\\begin{cases}x=${rienSi0(xB)}${ecritureAlgebriqueSauf1(vx)}s\\\\y= ${rienSi0(yB)}  ${ecritureAlgebriqueSauf1(vy)}s\\quad(s\\in\\mathbb{R})\\\\z= ${rienSi0(zB)} ${ecritureAlgebriqueSauf1(vz)}s\\end{cases}$`
          // On écrit les représentations paramétriques des droites (d) et (d')
          texte += `<br><br>${texteEnCouleurEtGras('Affirmation :')}  ${affirmation}`

          texteCorr = texteEnCouleurEtGras('Étape 1 : Droites parallèles ?')
          if (this.correctionDetaillee) {
            texteCorr += '<br>On sait que la représentation paramétrique d\'une droite est de la forme '
            texteCorr += '$(d):\\begin{cases}x=x_A+at \\\\y= y_A+bt\\quad(t\\in\\mathbb{R})\\\\z= z_A+ct\\end{cases}$'
            texteCorr += '<br>où le point $A(x_A, y_A, z_A)$ est un point de la droite et $\\vec u\\begin{pmatrix}a\\\\b\\\\c\\end{pmatrix}$ est un vecteur directeur de la droite.<br>'
          }
          texteCorr += `<br>On déduit de l'énoncé que le vecteur $\\vec u$ de coordonnées $\\vec u\\begin{pmatrix} ${ux}\\\\${uy}\\\\${uz}\\end{pmatrix}$ est un vecteur directeur de (d) `
          texteCorr += `et que $\\vec v$ de coordonnées $\\vec v\\begin{pmatrix} ${vx}\\\\${vy}\\\\${vz}\\end{pmatrix}$ est un vecteur directeur de (d'). <br>`
          // On teste la colinéarité des vecteurs directeurs
          texteCorr += 'On cherche si les coordonnées des vecteurs sont proportionnelles  c\'est à dire s\'il existe un réel $\\lambda$ tel que $\\vec u=\\lambda \\vec v$.<br>'
          texteCorr += '$\\phantom{\\iff}\\vec u=\\lambda \\vec v$'
          texteCorr += `$\\quad\\iff \\begin{cases}${ux}= ${rienSi1(vx)}\\lambda\\\\${uy}= ${rienSi1(vy)}\\lambda\\\\${uz}=${rienSi1(vz)}\\lambda\\end{cases}$`
          texteCorr += `$\\quad\\iff \\begin{cases}\\lambda =${u1.simplifie().toLatex}\\\\\\lambda =${u2.texFractionSimplifiee}\\\\
           \\lambda =${u3.texFractionSimplifiee}\\end{cases}$`
          texteCorr += '<br>Le système n\'admet pas de solutions donc les vecteurs ne sont donc pas colinéaires. <br>'
          texteCorr += `<br>${texteGras('Les droites $(d)$ et $(d~\')$ ne sont pas parallèles.')}`
          // On teste si les droites sont sécantes ou non-coplanaires
          texteCorr += texteEnCouleurEtGras('<br>Étape 2 : Droites sécantes ou non-coplanaires ?')
          texteCorr += '<br>Les droites $(d)$ et $(d\')$ sont sécantes, si et seulement s\'il existe un point d\'intersection $M(x;y;z)$ tel que $M\\in(d)\\cap (d\')$.'
          texteCorr += '<br>Les coordonnées du point $M$ vérifient donc les deux représentations paramétriques. <br>Ce qui est équivalent à résoudre le système suivant :'
          texteCorr += `<br>$\\begin{cases}
            ${reduireAxPlusB(ux, xA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vx, xB, 's', { ordreInverse: true })} \\\\
            ${reduireAxPlusB(uy, yA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vy, yB, 's', { ordreInverse: true })} \\\\
            ${reduireAxPlusB(uz, zA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vz, zB, 's', { ordreInverse: true })}
            \\end{cases}$`
          /** texteCorr += `$\\iff\\begin{cases}
            ${rienSi1(ux)}t = ${rienSi1(vx)}s ${ecritureAlgebrique(xB - xA)} \\\\
 ${//reduireAxPlusB(uy, yA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vy, yB, 's', { ordreInverse: true })} \\\\
            ${reduireAxPlusB(uz, zA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vz, zB, 's', { ordreInverse: true })}
            \\end{cases}$`
          texteCorr += `$\\iff\\begin{cases}
            t = ${u1.texFractionSimplifiee} s ${u4.simplifie().ecritureAlgebrique} \\\\
 ${reduireAxPlusB(uy, yA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vy, yB, 's', { ordreInverse: true })} \\\\
            ${reduireAxPlusB(uz, zA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vz, zB, 's', { ordreInverse: true })}
            \\end{cases}$`
          texteCorr += `$\\iff\\begin{cases}
            t = ${u1.texFractionSimplifiee} s ${u4.simplifie().ecritureAlgebrique} \\\\
 ${(yA)}${ecritureAlgebrique(uy)}\\times \\left(${u1.texFractionSimplifiee} s ${u4.simplifie().ecritureAlgebrique}\\right) = ${reduireAxPlusB(vy, yB, 's', { ordreInverse: true })} \\\\
          ${(zA)}${ecritureAlgebrique(uz)}\\times \\left(${u1.texFractionSimplifiee} s ${u4.simplifie().ecritureAlgebrique}\\right) = ${reduireAxPlusB(vz, zB, 's', { ordreInverse: true })}
            \\end{cases}$`
          // space
*/

          texteCorr += `$\\quad \\iff \\begin{cases}
            ${rienSi1(ux)}t = ${rienSi1(vx)}s ${ecritureAlgebrique(xB - xA)} \\\\
            ${rienSi1(uy)}t = ${rienSi1(vy)}s ${ecritureAlgebrique(yB - yA)} \\\\
            ${rienSi1(uz)}t = ${rienSi1(vz)}s ${ecritureAlgebrique(zB - zA)}
            \\end{cases}$`
          texteCorr += `$\\quad\\iff\\begin{cases}
            t = ${u1.texFractionSimplifiee}s ${u4.texFractionSimplifiee} \\\\
            t= ${u2.texFractionSimplifiee}s ${u5.texFractionSimplifiee} \\\\
            t = ${u3.texFractionSimplifiee}s ${u6.texFractionSimplifiee}
            \\end{cases}$`
          texteCorr += `<br>En égalisant les lignes 1 et 2, et les lignes 1 et 3, cela ${texteGras('implique')} que $s$ doit vérifier le système :<br>`
          texteCorr += `<br>$\\begin{cases}
            ${u1.texFractionSimplifiee}s ${u4.texFractionSimplifiee}=${new FractionEtendue(vy, uy).texFractionSimplifiee}s ${u5.texFractionSimplifiee} \\\\\\\\
            ${u1.texFractionSimplifiee}s ${u4.texFractionSimplifiee} = ${new FractionEtendue(vz, uz).texFractionSimplifiee}s ${u6.texFractionSimplifiee}
            \\end{cases}$`
          texteCorr += `$\\quad\\quad\\begin{cases}
            \\left(${u1.texFractionSimplifiee}+${u2.oppose().texFractionSimplifiee}\\right)s =${u5.texFractionSimplifiee}${u4.oppose().simplifie().ecritureAlgebrique} \\\\\\\\
            \\left(${u1.texFractionSimplifiee}+${u3.oppose().texFractionSimplifiee}\\right)s = ${u6.texFractionSimplifiee}${u4.oppose().simplifie().ecritureAlgebrique}
            \\end{cases}$`

          texteCorr += `$\\quad\\quad\\begin{cases}
            ${u1.differenceFraction(u2).simplifie().texFraction}s =${u5.differenceFraction(u4).simplifie().texFraction} \\\\\\\\
            ${u1.differenceFraction(u3).simplifie().texFraction}s = ${u6.differenceFraction(u4).simplifie().texFraction}
            \\end{cases}$`
          texteCorr += `<br><br>$\\begin{cases}
           s =${u5.differenceFraction(u4).simplifie().texFraction} \\times ${quotient1.simplifie().texFraction} \\\\\\\\
          s = ${u6.differenceFraction(u4).simplifie().texFraction} \\times ${quotient2.simplifie().texFraction} \\\\\\\\
            \\end{cases}$`

          texteCorr += `$\\quad\\quad\\begin{cases}
          s =${resultat1.simplifie().texFraction} \\\\\\\\
          s = ${resultat2.simplifie().texFraction}
            \\end{cases}$`

          texteCorr += '<br>Les deux équations sont incompatibles donc le système n\'admet pas de solution.<br>'
          texteCorr += texteEnCouleurEtGras('Conclusion :<br>')
          texteCorr += 'Donc les droites $(d)$ et $(d\')$ ne sont pas sécantes, elles sont donc non-coplanaires.<br>'
          if (affirmation === 'Les droites $(d)$ et $(d~\')$ sont non coplanaires.') { texteCorr += texteEnCouleurEtGras('L\'affirmation est donc vraie.') } else { texteCorr += texteEnCouleurEtGras('L\'affirmation est donc fausse.') }
          break
        case 'secantes':// Droites non-coplanaires

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
          u4 = new FractionEtendue(xB - xA, ux)  // On crée les fractions étendues pour le vecteur AB
          u5 = new FractionEtendue(yB - yA, uy)  // On crée les fractions étendues pour le vecteur AB
          u6 = new FractionEtendue(zB - zA, uz)  // On crée les fractions étendues pour le vecteur AB
          resultat1 = new FractionEtendue(ux * (yB - yA) - uy * (xB - xA), uy * vx - ux * vy) // Pour le calcul de colinéarité
          resultat2 = new FractionEtendue(ux * (zB - zA) - uz * (xB - xA), uz * vx - ux * vz) // Pour le calcul de colinéarité
          quotient1 = new FractionEtendue(ux * uy, (vx * uy) - (vy * ux)) // Pour la dernière ligne de calcul du quotient de la colinéarité
          quotient2 = new FractionEtendue(ux * uz, (vx * uz) - (vz * ux)) // Pour la dernière ligne de calcul du quotient de la colinéarité
          texte += `$(d):\\begin{cases}x=${reduireAxPlusB(ux, xA, 't', { ordreInverse: true })} \\\\y= ${rienSi0(yA)}  ${ecritureAlgebriqueSauf1(uy)}t\\quad(t\\in\\mathbb{R})\\\\z= ${rienSi0(zA)} ${ecritureAlgebriqueSauf1(uz)}t\\end{cases}$`
          texte += `$\\quad\\quad(d'):\\begin{cases}x=${rienSi0(xB)}${ecritureAlgebriqueSauf1(vx)}s\\\\y= ${rienSi0(yB)}  ${ecritureAlgebriqueSauf1(vy)}s\\quad(s\\in\\mathbb{R})\\\\z= ${rienSi0(zB)} ${ecritureAlgebriqueSauf1(vz)}s\\end{cases}$`
          // On écrit les représentations paramétriques des droites (d) et (d')
          texte += `<br><br>${texteEnCouleurEtGras('Affirmation :')}  ${affirmation}`

          texteCorr = texteEnCouleurEtGras('Étape 1 : Droites parallèles ?')
          if (this.correctionDetaillee) {
            texteCorr += '<br>On sait que la représentation paramétrique d\'une droite est de la forme '
            texteCorr += '$(d):\\begin{cases}x=x_A+at \\\\y= y_A+bt\\quad(t\\in\\mathbb{R})\\\\z= z_A+ct\\end{cases}$'
            texteCorr += '<br>où le point $A(x_A, y_A, z_A)$ est un point de la droite et $\\vec u\\begin{pmatrix}a\\\\b\\\\c\\end{pmatrix}$ est un vecteur directeur de la droite.<br>'
          }
          texteCorr += `<br>On déduit de l'énoncé que le vecteur $\\vec u$ de coordonnées $\\vec u\\begin{pmatrix} ${ux}\\\\${uy}\\\\${uz}\\end{pmatrix}$ est un vecteur directeur de (d) `
          texteCorr += `et que $\\vec v$ de coordonnées $\\vec v\\begin{pmatrix} ${vx}\\\\${vy}\\\\${vz}\\end{pmatrix}$ est un vecteur directeur de (d'). <br>`
          // On teste la colinéarité des vecteurs directeurs
          texteCorr += 'On cherche si les coordonnées des vecteurs sont proportionnelles  c\'est à dire s\'il existe un réel $\\lambda$ tel que $\\vec u=\\lambda \\vec v$.<br>'
          texteCorr += '$\\phantom{\\iff}\\vec u=\\lambda \\vec v$'
          texteCorr += `<br>$\\iff \\begin{cases}${ux}= ${rienSi1(vx)}\\lambda\\\\${uy}= ${rienSi1(vy)}\\lambda\\\\${uz}=${rienSi1(vz)}\\lambda\\end{cases}$`
          texteCorr += `<br>$\\iff \\begin{cases}\\lambda =${u1.texFractionSimplifiee}\\\\\\lambda =${u2.texFractionSimplifiee}\\\\
           \\lambda =${u3.texFractionSimplifiee}\\end{cases}$`
          texteCorr += '<br>Le système n\'admet pas de solutions donc les vecteurs ne sont donc pas colinéaires. <br>'
          texteCorr += `<br>${texteGras('Les droites $(d)$ et $(d~\')$ ne sont pas parallèles.')}`
          // On teste si les droites sont sécantes ou non-coplanaires
          texteCorr += texteEnCouleurEtGras('<br>Étape 2 : Droites sécantes ou non-coplanaires ?')
          texteCorr += '<br>Les droites $(d)$ et $(d\')$ sont sécantes, si et seulement s\'il existe un point d\'intersection $M(x;y;z)$ tel que $M\\in(d)\\cap (d\')$.'
          texteCorr += '<br>Les coordonnées du point $M$ vérifient donc les deux représentations paramétriques. <br>Ce qui est équivalent à résoudre le système suivant :'
          texteCorr += `<br>$\\begin{cases}
            ${reduireAxPlusB(ux, xA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vx, xB, 's', { ordreInverse: true })} \\\\
            ${reduireAxPlusB(uy, yA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vy, yB, 's', { ordreInverse: true })} \\\\
            ${reduireAxPlusB(uz, zA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vz, zB, 's', { ordreInverse: true })}
            \\end{cases}$`
          /** texteCorr += `$\\iff\\begin{cases}
            ${rienSi1(ux)}t = ${rienSi1(vx)}s ${ecritureAlgebrique(xB - xA)} \\\\
 ${//reduireAxPlusB(uy, yA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vy, yB, 's', { ordreInverse: true })} \\\\
            ${reduireAxPlusB(uz, zA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vz, zB, 's', { ordreInverse: true })}
            \\end{cases}$`
          texteCorr += `$\\iff\\begin{cases}
            t = ${u1.texFractionSimplifiee} s ${u4.simplifie().ecritureAlgebrique} \\\\
 ${reduireAxPlusB(uy, yA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vy, yB, 's', { ordreInverse: true })} \\\\
            ${reduireAxPlusB(uz, zA, 't', { ordreInverse: true })} = ${reduireAxPlusB(vz, zB, 's', { ordreInverse: true })}
            \\end{cases}$`
          texteCorr += `$\\iff\\begin{cases}
            t = ${u1.texFractionSimplifiee} s ${u4.simplifie().ecritureAlgebrique} \\\\
 ${(yA)}${ecritureAlgebrique(uy)}\\times \\left(${u1.texFractionSimplifiee} s ${u4.simplifie().ecritureAlgebrique}\\right) = ${reduireAxPlusB(vy, yB, 's', { ordreInverse: true })} \\\\
          ${(zA)}${ecritureAlgebrique(uz)}\\times \\left(${u1.texFractionSimplifiee} s ${u4.simplifie().ecritureAlgebrique}\\right) = ${reduireAxPlusB(vz, zB, 's', { ordreInverse: true })}
            \\end{cases}$`
          // space
*/

          texteCorr += `$\\quad \\iff \\begin{cases}
            ${rienSi1(ux)}t = ${rienSi1(vx)}s ${ecritureAlgebrique(xB - xA)} \\\\
            ${rienSi1(uy)}t = ${rienSi1(vy)}s ${ecritureAlgebrique(yB - yA)} \\\\
            ${rienSi1(uz)}t = ${rienSi1(vz)}s ${ecritureAlgebrique(zB - zA)}
            \\end{cases}$`
          texteCorr += `$\\quad\\iff\\begin{cases}
            t = ${u1.texFractionSimplifiee}s ${u4.texFractionSimplifiee} \\\\
            t= ${u2.texFractionSimplifiee}s ${u5.texFractionSimplifiee} \\\\
            t = ${u3.texFractionSimplifiee}s ${u6.texFractionSimplifiee}
            \\end{cases}$`
          texteCorr += `<br>En égalisant les lignes 1 et 2, et les lignes 1 et 3, cela ${texteGras('implique')} que $s$ doit vérifier le système :<br>`
          texteCorr += `<br>$\\begin{cases}
            ${u1.texFractionSimplifiee}s ${u4.texFractionSimplifiee}=${new FractionEtendue(vy, uy).texFractionSimplifiee}s ${u5.texFractionSimplifiee} \\\\\\\\
            ${u1.texFractionSimplifiee}s ${u4.texFractionSimplifiee} = ${new FractionEtendue(vz, uz).texFractionSimplifiee}s ${u6.texFractionSimplifiee}
            \\end{cases}$`
          texteCorr += `$\\quad\\quad\\begin{cases}
            \\left(${u1.texFractionSimplifiee}+${u2.oppose().texFractionSimplifiee}\\right)s =${u5.texFractionSimplifiee}${u4.oppose().simplifie().ecritureAlgebrique} \\\\\\\\
            \\left(${u1.texFractionSimplifiee}+${u3.oppose().texFractionSimplifiee}\\right)s = ${u6.texFractionSimplifiee}${u4.oppose().simplifie().ecritureAlgebrique}
            \\end{cases}$`

          texteCorr += `$\\quad\\quad\\begin{cases}
            ${u1.differenceFraction(u2).simplifie().texFraction}s =${u5.differenceFraction(u4).simplifie().texFraction} \\\\\\\\
            ${u1.differenceFraction(u3).simplifie().texFraction}s = ${u6.differenceFraction(u4).simplifie().texFraction}
            \\end{cases}$`
          texteCorr += `<br><br>$\\begin{cases}
           s =${u5.differenceFraction(u4).simplifie().texFraction} \\times ${quotient1.simplifie().texFraction} \\\\\\\\
          s = ${u6.differenceFraction(u4).simplifie().texFraction} \\times ${quotient2.simplifie().texFraction} \\\\\\\\
            \\end{cases}$`

          texteCorr += `$\\quad\\quad\\begin{cases}
          s =${resultat1.simplifie().texFraction} \\\\\\\\
          s = ${resultat2.simplifie().texFraction}
            \\end{cases}$`

          texteCorr += '<br>Les deux équations sont incompatibles donc le système n\'admet pas de solution.<br>'
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
