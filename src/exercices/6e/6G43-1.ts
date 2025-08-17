import { ajouteCanvas3d, type Elements3DDescription } from '../../lib/3d/3d_dynamique/Canvas3DElement'
import { choice } from '../../lib/outils/arrayOutils'
import { listeDesDiviseurs } from '../../lib/outils/primalite'
import { mathalea2d } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'
import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'
import { createCubesProjections, cubesToSceneContent, cubesToSceneContentCorr, ProjectionCubesIso2d } from './6G43'

export const dateDePublication = '08/08/2025'
export const titre = 'Comparer les voulumes de deux empilements de cubes'
export const interactifReady = true
export const interactifType = 'mathLive'
export const amcType = 'AMCNum'
export const amcReady = true

/**
 * Comparer des volumes d'empilements de cubes
 * @author Jean-Claude Lhote
 */

export const uuid = '5f117'

export const refs = {
  'fr-fr': ['6G43-1'],
  'fr-ch': []
}
// fonction copiée de 6G43 pour ne pas importer Three.js 2 fois
function empilementCubes(long: number, larg: number, hmax: number) {
  const tabHauteurs = new Array(larg)
  for (let i = 0; i < larg; i++) {
    tabHauteurs[i] = new Array(long)
  }
  // premiere ligne
  for (let i = 0; i < larg; i++) {
    tabHauteurs[i][0] = randint(0, 1)
  }
  // deuxième ligne et suivantes
  for (let i = 0; i < larg; i++) {
    for (let j = 1; j < long; j++) {
      tabHauteurs[i][j] = Math.min(tabHauteurs[i][j - 1] + randint(1, 2), hmax)
    }
  }
  // Vérification Dernière Ligne : ne pas être vide.
  for (let i = 0; i < larg; i++) {
    tabHauteurs[i][long - 1] = Math.max(2, tabHauteurs[i][long - 1])
  }
  // Ajoute les cubes dans un tableau une dimension
  // il faut trier les cubes : x décroissant puis y décroissant, puis z croissant
  const lstCoordonneesCubes = []
  for (let i = larg - 1; i > -1; i--) {
    for (let j = long - 1; j > -1; j--) {
      for (let k = 0; k < tabHauteurs[i][j]; k++) {
        lstCoordonneesCubes.push([i, j, k])
      }
    }
  }
  return lstCoordonneesCubes
}

function trouvePave(volume: number): [number, number, number] {
  // Trouve un pavé dont le volume est proche de volume
  let divisors: number[] = []
  let volumeCible = 0
  let divisorsSurface: number[] = []
  let hauteur = 0
  let surface = 0
  do {
    // On choisit un volume aléatoire proche de volume
    volumeCible = randint(volume - 5, volume + 5, divisors)
    divisors = listeDesDiviseurs(volumeCible)
    divisors = divisors.filter(div => div > 1 && div < volumeCible) // On enlève 1 et le volume lui-même
    if (divisors.length < 3) continue
    hauteur = choice(divisors)
    surface = volumeCible / hauteur
    divisorsSurface = listeDesDiviseurs(surface).filter(div => div > 1 && div < surface) // On enlève 1 et la surface elle-même
  } while (divisorsSurface.length < 2)
  const larg = choice(divisorsSurface)
  const long = surface / larg
  return [larg, long, hauteur]
}

export default class DenombrerCubes extends Exercice {
  constructor() {
    super()
    this.besoinFormulaire2Numerique = ["Taille de l'empilement", 3, 'De taille 3\nDe taille 4\nDe taille 5']
    this.besoinFormulaire3CaseACocher = ['3D dynamique', false]
    this.sup3 = false
    this.nbQuestions = 3 // Ici le nombre de questions
    this.sup2 = 1 // A décommenter : valeur par défaut d'un deuxième paramètre
    // c'est ici que commence le code de l'exercice cette fonction crée une copie de l'exercice
  }

  nouvelleVersion() {
    const longueur = 2 + parseInt(this.sup2) // longueur de l'empilement
    const largeur = longueur // largeur de l'empilement
    const hauteur = Math.min(longueur, 4) // hauteur de l'empilement

    for (let q = 0, texte, texteCorr, cpt = 0; q < this.nbQuestions && cpt < 50;) {
      const L1 = empilementCubes(longueur, largeur, hauteur) as [number, number, number][]// crée un empilement aléatoire
      const volume1 = L1.length
      const [larg, long, haut] = trouvePave(volume1)
      const L2: [number, number, number][] = []
      texte = ''
      texteCorr = ''
      for (let i = larg - 1; i > -1; i--) {
        for (let j = long - 1; j > -1; j--) {
          for (let k = 0; k < haut; k++) {

            L2.push([i, j, k])
          }
        }
      }

      if (this.sup3 && context.isHtml) {
        texte += 'Un empilement de cubes et un pavé deoit sont représentés ci-dessous.<br>' // Nous utilisons souvent cette variable pour construire le texte de la question.
        const objects1 = cubesToSceneContent(L1)
        const objects1Corr = cubesToSceneContentCorr(L1)
        const objects2Corr = cubesToSceneContentCorr(L2)
        // const L2 = empilementCubes(longueur, largeur, hauteur) as [number, number, number][]// crée un autre empilement aléatoire

        const content1 = {
          objects: [
            ...objects1,
            { type: 'ambientLight' as const, color: 0xffffff, intensity: 0.8 },
            { type: 'directionalLight' as const, color: 0xffffff, intensity: 1.2, position: [5, 5, 5] }
          ] as Elements3DDescription[],
          autoCenterZoomMargin: 1.2
        }
        const content2 = {
          objects: [
            ...L2.map(cube => Object.assign({ type: 'cube' }, { pos: cube, size: 1, edges: true })),
            { type: 'ambientLight' as const, color: 0xffffff, intensity: 0.8 },
            { type: 'directionalLight' as const, color: 0xffffff, intensity: 1.2, position: [5, 5, 5] }
          ] as Elements3DDescription[],
          autoCenterZoomMargin: 1.2
        }
        const content1Corr = {
          objects: [
            ...objects1Corr,
            { type: 'ambientLight' as const, color: 0xffffff, intensity: 0.8 },
            { type: 'directionalLight' as const, color: 0xffffff, intensity: 1.2, position: [5, 5, 5] }
          ] as Elements3DDescription[],
          autoCenterZoomMargin: 1.2
        }
        const content2Corr = {
          objects: [
            ...objects2Corr,
            { type: 'ambientLight' as const, color: 0xffffff, intensity: 0.8 },
            { type: 'directionalLight' as const, color: 0xffffff, intensity: 1.2, position: [5, 5, 5] }
          ] as Elements3DDescription[],
          autoCenterZoomMargin: 1.2
        }

        texte += ajouteCanvas3d({ id: `tas1-Ex${this.numeroExercice}Q${q}-1`, content: content1, width: 200, height: 200 })
        texte += ajouteCanvas3d({ id: `tas2-Ex${this.numeroExercice}Q${q}-2`, content: content2, width: 200, height: 200 })

        texteCorr += ajouteCanvas3d({ id: `tas1-Ex${this.numeroExercice}Q${q}-1`, content: content1Corr, width: 200, height: 200 })
        texteCorr += ajouteCanvas3d({ id: `tas2-Ex${this.numeroExercice}Q${q}-2`, content: content2Corr, width: 200, height: 200 })

      } else {
        texte += 'Ci-dessous, un empilement de cubes est représenté sous deux angles différents et un pavé droit est représenté à côté.<br>'
        const { figure, figureCorrection } = createCubesProjections(L1, largeur, longueur, hauteur)
        const { objets: pave, params } = ProjectionCubesIso2d(L2, 35, -20, false)
        params.xmin -= 2
        texte += figure + mathalea2d(params, pave)
        texteCorr += figureCorrection
      }
      texte += '<br>Quel est celui qui a le plus petit volume (en nombre de cubes identiques) ?'
      if (context.isHtml && this.sup3) {
        texte += '<br>Les petits cubes sont tous identiques. Le zoom peut changer d\'un solide à l\'autre.'
      }
      texteCorr += `<br>Le premier solide est un empilement de ${volume1} cubes.<br>`
      texteCorr += `Le deuxième solide est un pavé droit de dimensions $${larg} \\times ${long} \\times ${haut}$, son volume est de $${larg * long * haut}$.<br>`


      if (this.questionJamaisPosee(q, JSON.stringify(L1) + JSON.stringify(L2))) {
        this.listeQuestions[q] = texte
        this.listeCorrections[q] = texteCorr
        q++
      }

      cpt++
    }

    listeQuestionsToContenu(this)
  }
}
