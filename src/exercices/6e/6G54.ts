import { angleOriente } from '../../lib/2d/angles'
import { arc, cercle } from '../../lib/2d/cercle'
import { afficheCoteSegment, placeLatexSurSegment } from '../../lib/2d/codages'
import { droite } from '../../lib/2d/droites'
import { Point, point, pointIntersectionLC, pointSurSegment, tracePoint } from '../../lib/2d/points'
import { BoiteBuilder, polygone } from '../../lib/2d/polygones'
import { cordelette, segment } from '../../lib/2d/segmentsVecteurs'
import { labelPoint, latex2d } from '../../lib/2d/textes'
import { homothetie, rotation } from '../../lib/2d/transformations'
import { combinaisonListes } from '../../lib/outils/arrayOutils'
import { numAlpha } from '../../lib/outils/outilString'
import { colorToLatexOrHTML, fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import { gestionnaireFormulaireTexte, randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const titre = 'Problème de la chèvre dans son enclos'

export const dateDePublication = '03/08/2025'

/**
 * Exercice tiré des documents officiels : un classique de la géométrie plane
 * @author Jean-Claude Lhote

*/
export const uuid = '29c3c'

export const refs = {
  'fr-fr': [],
  'fr-ch': []
}
export default class ProblemeDeLaChevreDansSonEnclos extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 1
    // this.besoinFormulaireTexte = ['Types de question', 'Nombres séparés par des tirets\n1 : Cabane au coin de l\'enclos\n2 : Cabane sur un côté de l\'enclos\n3 : Cabane au milieu de l\'enclos\n4 : Mélange']
    // this.sup = '1'
  }

  nouvelleVersion () {
    const listeTypesDeQuestions = combinaisonListes(['1'], this.nbQuestions)// gestionnaireFormulaireTexte({ saisie: this.sup, nbQuestions: this.nbQuestions, min: 1, max: 3, defaut: 1, melange: 4 }).map(Number)
    for (let i = 0, cpt = 0; i < this.nbQuestions && cpt < 50;) {
      const longueurEnclos = randint(12, 16)
      const largeurEnclos = randint(10, longueurEnclos - 1)
      const longueurCabane = randint(4, Math.ceil(longueurEnclos / 3))
      const largeurCabane = randint(3, Math.min(Math.ceil(largeurEnclos / 3), longueurCabane - 1))
      const offsetPointP = randint(1, longueurCabane - 1)
      const longueurCordelette = randint(Math.max(offsetPointP, longueurCabane - offsetPointP + 1), largeurEnclos - largeurCabane)

      const objetsEnonce = []
      const objetsCorrection = []
      let texte = ''
      let texteCorr = ''

      switch (listeTypesDeQuestions[i]) {
        case 2 : {

        }
          break
        case 3:
          {

          }
          break
        case 1 :
        default:{
          // éléments communs énoncé et correction
          const A = point(0, 0)
          const B = point(longueurEnclos, 0)
          const C = point(longueurEnclos, largeurEnclos)
          const D = point(0, largeurEnclos)
          const cabA = point(longueurEnclos, largeurEnclos - largeurCabane)
          const cabB = C
          const cabC = point(longueurEnclos - longueurCabane, largeurEnclos)
          const cabD = point(longueurEnclos - longueurCabane, largeurEnclos - largeurCabane)
          const enclos = polygone(A, B, C, D)
          const cabane = polygone(cabA, cabB, cabC, cabD)
          const P = point(longueurEnclos - offsetPointP, largeurEnclos - largeurCabane, 'P', 'above')
          const longCab = afficheCoteSegment(segment(cabC, cabB), `${longueurCabane}\\text{ m}`, 0.5)
          const largCab = afficheCoteSegment(segment(cabB, cabA), `${largeurCabane}\\text{ m}`, 0.5, 'black', 1, 1, 'black', true)
          const distP = afficheCoteSegment(segment(cabA, P), `${offsetPointP}\\text{ m}`, 0.5, 'black', 1, 1, 'black', true)
          const longEnclos = afficheCoteSegment(segment(B, A), `${longueurEnclos}\\text{ m}`, 0.5)
          const largEnclos = afficheCoteSegment(segment(A, D), `${largeurEnclos}\\text{ m}`, 0.5, 'black', 1, 1, 'black', true)
          const indicCabane = new BoiteBuilder({ xMin: longueurEnclos - (longueurCabane / 2 + 1.5), xMax: longueurEnclos - (longueurCabane / 2 - 1.5), yMin: largeurEnclos - (largeurCabane / 2 + 0.6), yMax: largeurEnclos - (largeurCabane / 2 - 0.6) })
          indicCabane.addTextIn({ textIn: 'Cabane', color: 'black', opacity: 0.8, size: 1 })
          indicCabane.addColor({ colorBackground: 'gray', color: 'none' })
          const indicEnclos = new BoiteBuilder({ xMin: 1, xMax: 4, yMin: largeurEnclos / 2 - 0.6, yMax: largeurEnclos / 2 + 0.6 })
          indicEnclos.addColor({ colorBackground: 'gray', color: 'none' })
          indicEnclos.addTextIn({ textIn: 'Enclos', color: 'black', opacity: 0.8, size: 1 })

          // éléments énoncé
          const ch = pointSurSegment(P, A, longueurCordelette * 0.9, 'chèvre', 'below')
          const longe = cordelette(P, ch)
          const longCord = latex2d(`\\text{Corde de }${longueurCordelette}\\text{ m}`, (P.x + ch.x) / 2 + 1, (P.y + ch.y) / 2 - 1, { color: 'gray', letterSize: 'scriptsize' })
          const PetCh = tracePoint(P, ch)
          PetCh.style = 'o'

          // éléments correction
          const c1 = cercle(P, longueurCordelette)
          const I = pointIntersectionLC(droite(B, C), c1, '', 2) as Point
          const r1Mes = placeLatexSurSegment(`${longueurCordelette}\\text{ m}`, P, I, { distance: -0.7, horizontal: true, letterSize: 'normalsize' })
          const J = homothetie(P, cabA, (offsetPointP + longueurCordelette) / offsetPointP)
          const t1 = polygone(I, cabA, P)
          t1.couleurDeRemplissage = colorToLatexOrHTML('pink')
          t1.opaciteDeRemplissage = 0.4
          t1.couleurDesHachures = colorToLatexOrHTML('black')
          t1.hachures = 'north east lines'
          const a1 = arc(I, P, -Math.abs(angleOriente(I, P, J)), true, 'pink')
          a1.couleurDesHachures = colorToLatexOrHTML('black')
          a1.hachures = 'north east lines'
          const r1 = segment(P, J)

          const diff = afficheCoteSegment(segment(P, cabD), `${longueurCabane - offsetPointP}\\,\\text{m}`, 0.5, 'black', 1, 0.5, 'black')
          const longRestante = longueurCordelette - (longueurCabane - offsetPointP)
          if (longRestante < largeurCabane) {
            const quartDeC2 = arc(J, cabD, -90, true, 'pink', 'black', 0.1)
            quartDeC2.hachures = 'north east lines'
            quartDeC2.couleurDesHachures = colorToLatexOrHTML('black')
            const r2 = placeLatexSurSegment(`${longRestante}\\,\\text{m}`, cabD, rotation(J, cabD, -90), { distance: 0.7, horizontal: true, letterSize: 'normalsize' })
            objetsCorrection.push(quartDeC2, r2, diff)
          } else {
            const c2 = cercle(cabD, longRestante)
            const K = pointIntersectionLC(droite(C, D), c2, '', 1) as Point
            const a2 = arc(J, cabD, -Math.abs(angleOriente(J, cabD, K)), true, 'pink', 'black', 0.1)
            a2.couleurDesHachures = colorToLatexOrHTML('black')
            a2.hachures = 'north east lines'
            const t2 = polygone(cabD, cabC, K)
            t2.couleurDeRemplissage = colorToLatexOrHTML('pink')
            t2.opaciteDeRemplissage = 0.1
            t2.couleurDesHachures = colorToLatexOrHTML('black')
            t2.hachures = 'north east lines'
            const r2 = placeLatexSurSegment(`${longRestante}\\,\\text{m}`, cabD, K, { distance: 0.7, horizontal: true, letterSize: 'normalsize' })

            objetsCorrection.push(a2, t2, r2, diff)
          }

          objetsEnonce.push(enclos, cabane, indicCabane.render(), indicEnclos.render(), PetCh, labelPoint(P, ch), longe, longCab, largCab, distP, longCord, longEnclos, largEnclos)
          objetsCorrection.push(enclos, cabane, indicCabane.render(), indicEnclos.render(), tracePoint(P), labelPoint(P), a1, r1, r1Mes, t1)
        }
          break
      }
      texte = 'Dans l\'enclos rectangulaire représenté ci-dessous, on a attaché une chèvre à un piquet $(P)$ situé sur le mur d\'une cabane rectangulaire, elle aussi.<br>'
      texte += `La corde qui limite les déplacements de la chèvre mesure $${longueurCordelette}\\,\\text{m}$.<br>`
      texte += `${numAlpha(0)} Réprésenter le schéma de l'enclos en utilisant comme échelle : $1\\,\\text{cm}$ pour $1\\,\\text{m}$.<br>`
      texte += `${numAlpha(1)} Délimiter et hachurer la zone de l'enclos dans laquelle peut brouter la chèvre.<br><br>`

      texte += mathalea2d(Object.assign({ scale: 0.5 }, fixeBordures(objetsEnonce)), objetsEnonce)
      texteCorr += mathalea2d(Object.assign({}, fixeBordures(objetsCorrection)), objetsCorrection)
      if (this.questionJamaisPosee(i, longueurEnclos, largeurEnclos, longueurCabane, largeurCabane, longueurCordelette, offsetPointP)) {
        this.listeQuestions.push(texte)
        this.listeCorrections.push(texteCorr)
        i++
      }
      cpt++
    }
  }
}
