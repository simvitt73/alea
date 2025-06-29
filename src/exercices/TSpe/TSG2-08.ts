/* eslint-disable no-case-declarations */
import Exercice from '../Exercice'
import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import { ecritureAlgebriqueSauf1, reduireAxPlusB, rienSi0 } from '../../lib/outils/ecritures'
import { texteEnCouleurEtGras, texteItalique } from '../../lib/outils/embellissements'
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
      const xA = randint(-10, 10, 0)
      const yA = randint(-10, 10, 0)
      const zA = randint(-10, 10, 0)
      const ux = randint(-10, 10, 0)
      const uy = randint(-10, 10, [yA, 0])
      const uz = randint(-10, 10, [zA, 0])
      let xB = randint(-10, 10, [xA, 0])
      let yB = randint(-10, 10, 0)
      let zB = randint(-10, 10, [zA, 0])
      let vx = randint(-10, 10, [ux, xA, 0])
      let vy = randint(-10, 10, [uy, yA, 0])
      let vz = randint(-10, 10, [uz, zA, 0])
      const alpha = randint(-3, 3, 0) // Pour éviter les droites parallèles
      const beta = randint(-3, 3, 0) // Pour éviter les droites parallèles
      const affirmation = choice(['Les droites $(d)$ et $(d~\')$ sont parallèles.',
        'Les droites $(d)$ et $(d~\')$ sont sécantes.',
        'Les droites $(d)$ et $(d~\')$ sont non coplanaires.'])
      switch (listeTypeQuestions[i]) {
        case 'type2':// Droites non-coplanaires

          //  v = (vx, vy, vz) tel que u et v ne soient pas colinéaires
          // et que le
          vx = randint(-10, 10, [ux, xA, 0])
          vy = randint(-10, 10, [uy, yA, 0])
          vz = randint(-10, 10, [uz, zA, 0])
          if (vx / ux === vy / uy && vy / uy === vz / uz) { vz = vz + 1 } // On s'assure que les droites ne sont pas parallèles
          // vecteur AB = (xB-xA, yB-yA, zB-zA) ne soit pas coplanaire avec u et v
          xB = alpha * ux + beta * vx + xA
          yB = alpha * uy + beta * vy + yA
          zB = alpha * uz + beta * vz + zA - 1  // Choisir zB pour que AB non coplanaires avec u et v

          const uxvx = new FractionEtendue(ux, vx)

          const uyvy = new FractionEtendue(uy, vy)
          const uzvz = new FractionEtendue(uz, vz)

          texte += `$(d):\\begin{cases}x=${reduireAxPlusB(ux, xA, 't', { ordreInverse: true })} \\\\y= ${rienSi0(yA)}  ${ecritureAlgebriqueSauf1(uy)}t\\quad(t\\in\\mathbb{R})\\\\z= ${rienSi0(zA)} ${ecritureAlgebriqueSauf1(uz)}t\\end{cases}$`
          texte += `$\\quad\\quad(d'):\\begin{cases}x=${rienSi0(xB)}${ecritureAlgebriqueSauf1(vx)}s\\\\y= ${rienSi0(yB)}  ${ecritureAlgebriqueSauf1(vy)}s\\quad(s\\in\\mathbb{R})\\\\z= ${rienSi0(zB)} ${ecritureAlgebriqueSauf1(vz)}s\\end{cases}$`
          texte += `<br><br>${texteEnCouleurEtGras('Affirmation :')}  ${affirmation}`
          texteCorr = texteEnCouleurEtGras('Étape 1 : Colinéarité des vecteurs directeurs.')
          texteCorr += '<br>On sait que la représentation paramétrique d\'une droite est de la forme '
          texteCorr += '$(d):\\begin{cases}x=x_A+at \\\\y= y_A+bt\\quad(t\\in\\mathbb{R})\\\\z= z_A+ct\\end{cases}$'
          texteCorr += '<br>où le point $A(x_A, y_A, z_A)$ est un point de la droite et $\\vec u\\begin{pmatrix}a\\\\b\\\\c\\end{pmatrix}$ est un vecteur directeur de la droite.<br>'
          texteCorr += `<br>On en déduit que les coordonnées de $\\vec u$ vecteur directeur de (d) sont $\\vec u\\begin{pmatrix} ${ux}\\\\${uy}\\\\${uz}\\end{pmatrix}$`
          texteCorr += `et celles de $\\vec v$ vecteur directeur de (d') sont $\\vec v\\begin{pmatrix} ${vx}\\\\${vy}\\\\${vz}\\end{pmatrix}$<br>`
          texteCorr += 'On compare pour les quotients des composantes de même dimension : <br>'
          texteCorr += `$\\frac{${ux}}{${vx}} = ${uxvx}.texFraction$`
          texteCorr += ` \\frac{${uy}}{${vy}} = \\frac{${uz}}{${vz}}$`
          texteCorr += '<br>On trouve que les quotients ne sont pas égaux, donc les droites ne sont pas parallèles.<br>'
          texteCorr += 'On vérifie que les droites ne sont pas sécantes'
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
