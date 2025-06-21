import { polygone } from '../../lib/2d/polygones'
import { shuffle } from '../../lib/outils/arrayOutils'
import Exercice from '../Exercice'
import { fixeBordures, mathalea2d, type NestedObjetMathalea2dArray } from '../../modules/2dGeneralites'
import { ajouteQuestionMathlive } from '../../lib/interactif/questionMathLive'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import { gestionnaireFormulaireTexte } from '../../modules/outils'
import { carreDef, carreRondDef, chatDef, etoileDef, losangeDef, shapeCarre, shapeCarreArrondi, shapeChat, shapeEtoile4Branches, shapeLosange, shapeSoleil, soleilDef } from '../../lib/2d/figures2d/shapes2d'
import { listePatternsPreDef, type PatternRiche, type PatternRiche3D } from '../../lib/2d/patterns/patternsPreDef'
import { createList } from '../../lib/format/lists'
import { texNombre } from '../../lib/outils/texNombre'
import { texteParPosition } from '../../lib/2d/textes'
import { point } from '../../lib/2d/points'
import type { VisualPattern } from '../../lib/2d/patterns/VisualPattern'
import { cubeDef, project3dIso, Shape3D, shapeCubeIso, updateCubeIso } from '../../lib/2d/figures2d/Shape3d'
import { VisualPattern3D } from '../../lib/2d/patterns/VisualPattern3D'
import { context } from '../../modules/context'

export const titre = 'Comprendre un algorithme itératif'
export const interactifReady = true
export const interactifType = 'mathLive'

// Gestion de la date de publication initiale
export const dateDePublication = '10/06/2025'

/**
 * Étudier les premiers termes d'une série de motifs afin de donner le nombre de formes ${['e','a','é','i','o','u','y','è','ê'].includes(pattern.shape.name[0]) ? 'd\'':'de'}${pattern.shape.name} du motif suivant.
 * Les patterns sont des motifs numériques qui évoluent selon des règles définies.
 * Cet exercice contient des patterns issus de l'excellent site : https://www.visualpatterns.org/
 * @author Jean-Claude Lhote
 */
export const uuid = '328b3'

export const refs = {
  'fr-fr': ['6I13'],
  'fr-ch': []
}

export default class PaternNum0 extends Exercice {
  constructor () {
    super()
    this.nbQuestions = 3
    this.comment = `Étudier les premiers termes d'une série de motifs afin de donner le nombre de formes du motif suivant.\n
 Les patterns sont des motifs numériques qui évoluent selon des règles définies.\n
 Cet exercice contient des patterns issus de l'excellent site : https://www.visualpatterns.org/`
    this.besoinFormulaireNumerique = ['Nombre de figures par question', 4]
    this.sup = 3
    // this.besoinFormulaire2Texte = ['Types de motifs', 'Nombres séparés par des tirets\n1: Motifs prédéfinis (nombre limité de cas)\n2 : Motifs aléatoires (plus de variété)\n3 : Mélange (jusqu’à épuisement des motifs prédéfinis)']
    this.besoinFormulaire3Texte = ['formes', 'Nombres séparés par des tirets\n1: Carrés\n2 : Étoile\n3 : Carrés arrondis\n4: Chat\n5 : Soleil\n6 : losange\n 7 : Mélange']
    this.sup3 = '7'
    this.besoinFormulaire4Texte = ['Types de questions', 'Nombres séparés par des tirets\n1: Motif suivant à dessiner\n2 : Motif suivant (nombre)\n3 : Motif 10 (nombre)\n4 : Motif 42 (nombre)\n5 : Motif 100 (nombre)\n6 : Question au hasard parmi les 4 précédentes']
    this.sup4 = '6'
  }

  nouvelleVersion (): void {
    const listePreDef = shuffle(listePatternsPreDef.slice(0, this.sup2 ?? listePatternsPreDef.length))
    const nbFigures = Math.max(2, this.sup)
    // const typesMotifs = gestionnaireFormulaireTexte({ saisie: this.sup2, min: 1, max: 2, defaut: 3, melange: 3, nbQuestions: this.nbQuestions }).map(Number)
    const formes = gestionnaireFormulaireTexte({ saisie: this.sup3, min: 1, max: 6, defaut: 7, melange: 7, nbQuestions: this.nbQuestions }).map(Number)
    const patterns : (VisualPattern | VisualPattern3D)[] = []
    const typesQuestions = Array.from(new Set(gestionnaireFormulaireTexte({ saisie: this.sup4, min: 1, max: 5, defaut: 1, melange: 6, nbQuestions: 5, shuffle: false }).map(Number)))
    const pat: (PatternRiche | PatternRiche3D)[] = []
    for (let i = 0; i < this.nbQuestions; i++) {
      const popped = listePreDef.pop()
      if (!popped) {
        continue
      }
      pat[i] = popped
      const pattern = pat[i].pattern
      if (pattern instanceof VisualPattern3D) {
        pattern.shape = pat[i].shapeDefault as Shape3D ?? shapeCubeIso() as Shape3D
        pattern.iterate3d = (pat[i] as PatternRiche3D).iterate3d
      } else {
        pattern.iterate = (pat[i] as PatternRiche).iterate
      }

      patterns.push(pattern)

      if (pat[i].shapeDefault.name === 'cube') {
        patterns[i].shape = shapeCubeIso()
      } else {
        switch (formes[i]) {
          case 2:
            patterns[i].shape = shapeEtoile4Branches()
            break
          case 3:
            patterns[i].shape = shapeCarreArrondi()
            break
          case 4:
            patterns[i].shape = shapeChat()
            break
          case 5:
            patterns[i].shape = shapeSoleil()
            break
          case 6:
            patterns[i].shape = shapeLosange()
            break
          case 1:
          default:
            patterns[i].shape = shapeCarre()
            break
        }
      }
    }
    let indexInteractif = 0
    for (let i = 0; i < this.nbQuestions;) {
      const pattern = patterns[i]
      const objetsCorr: NestedObjetMathalea2dArray = pattern.shape.name === 'chat'
        ? [chatDef]
        : pattern.shape.name === 'soleil'
          ? [soleilDef]
          : pattern.shape.name === 'cube'
            ? [cubeDef('cubeIso')]
            : pattern.shape.name === 'étoile'
              ? [etoileDef]
              : pattern.shape.name === 'pastille'
                ? [carreRondDef]
                : pattern.shape.name === 'carré'
                  ? [carreDef]
                  : [losangeDef]

      const rendered = pattern.render(nbFigures + 1, 0, 0, Math.PI / 6)
      objetsCorr.push(...rendered)

      let yMax = 0
      let yMin = 0
      const angle = Math.PI / 6
      let texte = `Voici les ${nbFigures} premiers motifs d'une série de motifs numériques. Ils évoluent selon des règles définies.<br>`
      const figures: NestedObjetMathalea2dArray[] = []
      for (let j = 0; j <= nbFigures; j++) {
        figures[j] = []
        if (pattern.shape.name === 'chat') {
          figures[j].push(chatDef)
        } else if (pattern.shape.name === 'soleil') {
          figures[j].push(soleilDef)
        } else if (pattern.shape.name === 'étoile') {
          figures[j].push(etoileDef)
        } else if (pattern.shape.name === 'pastille') {
          figures[j].push(carreRondDef)
        } else if (pattern.shape.name === 'carré') {
          figures[j].push(carreDef)
        } else if (pattern.shape.name === 'losange') {
          figures[j].push(losangeDef)
        } else if (pattern.shape.name === 'cube') {
          figures[j].push(cubeDef(`cubeIsoQ${i}F${j}`))
        }
        let xmin = Infinity
        let ymin = Infinity
        let xmax = -Infinity
        let ymax = -Infinity
        if (pattern instanceof VisualPattern3D) {
          if (context.isHtml) {
            updateCubeIso(pattern, i, j, angle)
            pattern.shape.codeSvg = `<use href="#cubeIsoQ${i}F${j}"></use>`
            const cells = (pattern as VisualPattern3D).render3d(j + 1)
            // Ajouter les SVG générés par svg() de chaque objet
            cells.forEach(cell => {
              const [px, py] = project3dIso(cell[0], cell[1], cell[2], angle)
              const obj = shapeCubeIso(`cubeIsoQ${i}F${j}`, px, py)
              figures[j].push(obj)
              ymin = Math.min(ymin, -py / 20)
              ymax = Math.max(ymax, -py / 20)
              xmin = Math.min(xmin, px / 20)
              xmax = Math.max(xmax, px / 20)
            })
          } else {
            figures[j].push(...(pattern as VisualPattern3D).render(j + 1, 0, 0, Math.PI / 6))
            ;({ xmin, ymin, xmax, ymax } = fixeBordures(figures[j]))
          }
        } else {
          figures[j].push(...pattern.render(j + 1, 0, 0))
          ;({ xmin, ymin, xmax, ymax } = fixeBordures(figures[j]))
        }
        figures[j].push(texteParPosition(`Motif ${j + 1}`, (xmax + xmin + 1) / 2, -1.5, 0, 'black', 0.8, 'milieu'))
        const cadre = polygone(point(xmin - 1, -2), point(xmax + 2, -2), point(xmax + 2, ymax + 2), point(xmin - 1, ymax + 2))
        cadre.pointilles = 4
        figures[j].push(cadre)
        yMax = Math.max(yMax, ymax)
        yMin = Math.min(yMin, ymin)
      }
      texte += figures.map((fig, index) => mathalea2d(Object.assign(fixeBordures(fig, { rxmin: 0, rymin: -1, rxmax: 0, rymax: 1 }), { id: `Motif${i}F${index}`, pixelsParCm: 20, yMax, yMin, scale: 0.4, style: 'display: inline-block', optionsTikz: 'transform shape' }), fig)).join('\n')
      let texteCorr = ''
      const listeQuestions: string[] = []
      const listeCorrections: string[] = []
      for (const q of typesQuestions) {
        switch (q) {
          case 1:
            listeQuestions.push(`\nDessiner le motif $${nbFigures + 1}$.<br>`)
            listeCorrections.push(`Voici le motif $${nbFigures + 1}$ :<br>
              ${mathalea2d(Object.assign(fixeBordures(objetsCorr, { rxmin: 0, rymin: -1, rxmax: 0, rymax: 1 }), { scale: 0.4, optionsTikz: 'transform shape' }), objetsCorr)}`)
            break
          case 2:{
            const nbFormes = pat[i].fonction(nbFigures + 1)

            listeQuestions.push(`\nQuel sera le nombre ${['e', 'a', 'é', 'i', 'o', 'u', 'y', 'è', 'ê'].includes(pattern.shape.name[0]) ? 'd\'' : 'de '}${pattern.shape.name}s dans le motif $${nbFigures + 1}$ ?<br>${ajouteQuestionMathlive(
            {
exercice: this,
              question: indexInteractif++,
              objetReponse: { reponse: { value: nbFormes.toString() } },
              typeInteractivite: 'mathlive'
            }
          )}`)
            listeCorrections.push(`Le motif $${nbFigures + 1}$ contient $${miseEnEvidence(texNombre(nbFormes, 0))}$ formes ${['e', 'a', 'é', 'i', 'o', 'u', 'y', 'è', 'ê'].includes(pattern.shape.name[0]) ? 'd\'' : 'de '}${pattern.shape.name}s.<br>
          ${!typesQuestions.includes(1) ? mathalea2d(Object.assign(fixeBordures(objetsCorr, { rxmin: -1, rymin: 0, rxmax: 0, rymax: 1 }), { scale: 0.4, optionsTikz: 'transform shape' }), objetsCorr) : ''}`)
          }
            break
          case 3:{
            const nbFormes = pat[i].fonction(10)
            listeQuestions.push(`\nQuel sera le nombre ${['e', 'a', 'é', 'i', 'o', 'u', 'y', 'è', 'ê'].includes(pattern.shape.name[0]) ? 'd\'' : 'de '}${pattern.shape.name}s pour le motif $10$ ?<br>${ajouteQuestionMathlive(
            {
              exercice: this,
              question: indexInteractif++,
              objetReponse: { reponse: { value: nbFormes } },
              typeInteractivite: 'mathlive'
              }
            )}
            `)
            listeCorrections.push(`Le motif $10$ contient $${miseEnEvidence(nbFormes)}$ formes ${['e', 'a', 'é', 'i', 'o', 'u', 'y', 'è', 'ê'].includes(pattern.shape.name[0]) ? 'd\'' : 'de '}${pattern.shape.name}s.<br>
            En effet, la formule pour trouver le nombre ${['e', 'a', 'é', 'i', 'o', 'u', 'y', 'è', 'ê'].includes(pattern.shape.name[0]) ? 'd\'' : 'de '}${pattern.shape.name}s est : $${miseEnEvidence(pat[i].formule.replaceAll('n', '10'))}$.<br>`)
          }
            break
          case 4:{
            const nbFormes = pat[i].fonction(43)

            listeQuestions.push(`\nQuel sera le nombre ${['e', 'a', 'é', 'i', 'o', 'u', 'y', 'è', 'ê'].includes(pattern.shape.name[0]) ? 'd\'' : 'de '}${pattern.shape.name}s pour le motif $43$ ?<br>${ajouteQuestionMathlive(
            {
              exercice: this,
              question: indexInteractif++,
              objetReponse: { reponse: { value: nbFormes } },
              typeInteractivite: 'mathlive'
              }
            )}
            `)
            listeCorrections.push(`Le motif $43$ contient $${miseEnEvidence(nbFormes)}$ formes ${['e', 'a', 'é', 'i', 'o', 'u', 'y', 'è', 'ê'].includes(pattern.shape.name[0]) ? 'd\'' : 'de '}${pattern.shape.name}s.<br>
            En effet, la formule pour trouver le nombre ${['e', 'a', 'é', 'i', 'o', 'u', 'y', 'è', 'ê'].includes(pattern.shape.name[0]) ? 'd\'' : 'de '}${pattern.shape.name}s est : $${miseEnEvidence(pat[i].formule.replaceAll('n', '43'))}$.<br>`)
          }
            break
          case 5:{
            const nbFormes = pat[i].fonction(100)
            listeQuestions.push(`\nQuel sera le nombre ${['e', 'a', 'é', 'i', 'o', 'u', 'y', 'è', 'ê'].includes(pattern.shape.name[0]) ? 'd\'' : 'de '}${pattern.shape.name}s pour le motif $100$ ?<br>${ajouteQuestionMathlive(
            {
              exercice: this,
              question: indexInteractif++,
              objetReponse: { reponse: { value: nbFormes } },
              typeInteractivite: 'mathlive'
              }
            )}
            `)
            listeCorrections.push(`Le motif $100$ contient $${miseEnEvidence(nbFormes)}$ formes ${['e', 'a', 'é', 'i', 'o', 'u', 'y', 'è', 'ê'].includes(pattern.shape.name[0]) ? 'd\'' : 'de '}${pattern.shape.name}s.<br>
            En effet, la formule pour trouver le nombre ${['e', 'a', 'é', 'i', 'o', 'u', 'y', 'è', 'ê'].includes(pattern.shape.name[0]) ? 'd\'' : 'de '}${pattern.shape.name}s est : $${miseEnEvidence(pat[i].formule.replaceAll('n', '100'))}$.<br>`)
          }
            break
        }
      }
      texte += listeQuestions.length === 1
        ? listeQuestions[0]
        : createList({
          items: listeQuestions,
          style: 'alpha',
        })
      texteCorr += listeCorrections.length === 1
        ? listeCorrections[0]
        : createList({
          items: listeCorrections,
          style: 'alpha',
        })
      this.listeQuestions.push(texte)
      this.listeCorrections.push(texteCorr)
      i++
    }
  }
}
