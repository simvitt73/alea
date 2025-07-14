import { listeQuestionsToContenu, randint } from '../../modules/outils'
import Exercice from '../Exercice'
import { SceneViewer } from '../../lib/3d/SceneViewer'
import { rangeMinMax } from '../../lib/outils/nombres'
import { arcenciel } from '../../lib/outils/embellissements'

export const uuid = 'threejs'
export const titre = 'La Terre vue du ciel !'
export const refs = {
  'fr-fr': [],
  'fr-ch': []
}

export default class BetaThreeJs extends Exercice {
  version: 'menger' | 'huit-coins'
  level: number

  constructor () {
    super()
    this.version = 'huit-coins' // 'menger' | 'huit-coins'
    this.level = 1
    this.listeQuestions = []
    this.listeCorrections = []
  }

  nouvelleVersion () {
    this.listeQuestions = []
    this.listeCorrections = []

    const sceneBuilder = new SceneViewer({ width: 400, height: 400 })

    sceneBuilder.addAmbientLight({
      color: '#ffffff',
      intensity: 0.8  // Augmenter l'intensité de la lumière ambiante
    })

    sceneBuilder.addDirectionnalLight({
      color: '#ffffff',
      intensity: 1.2,  // Lumière directionnelle plus forte
      position: [5, 5, 5]
    })

    // Lumière supplémentaire du côté opposé
    sceneBuilder.addDirectionnalLight({
      color: '#ffffff',
      intensity: 0.6,
      position: [-5, 5, -5]
    })

    // Sphère avec beaucoup de détails
    // Sphère détaillée pour cours de géographie
    sceneBuilder.addCustomWireSphere({
      position: [0, 3, 0],
      radius: 4.02,
      parallels: 18,
      meridians: 72,
      /* parallelColor: 'black', // Parallèles bleu ciel
      meridianColor: 'purple', // Méridiens gris-ble */
      showEquator: true,
      equatorColor: '#DC143C',
      equatorThickness: 0.01,       // Équateur plus épais
      showGreenwich: true,
      greenwichColor: '#008000',
      greenwichThickness: 0.01     // Greenwich épais

    })
    sceneBuilder.addRealisticEarthSphere({
      position: [0, 3, 0],
      radius: 4,
      greenwichAlignment: -90,
    })

    // Les longitudes
    const points = rangeMinMax(-17, 17, [0]).map(el => Object.assign({
      latitude: 0,
      longitude: el * 10,
      label: `${el >= 0 ? `${el * 10}°E` : `${-el * 10}°O`}`,
      pointColor: '#FF0000'
    }, {
      pointColor: '#FF0000',
      pointRadius: 0.02,
      font: 'images/Arial Bold-msdf.json',
      labelColor: '#FFFFFF',
      transparent: true  // NOUVEAU : Forcer la transparence
    }))

    sceneBuilder.addGeographicPoints({
      spherePosition: [0, 3, 0],
      sphereRadius: 4,
      defaultLabelSize: 0.3,
      points,
      transparent: true  // NOUVEAU : Transparence globale
    })

    // Les latitudes
    const points2 = rangeMinMax(-8, 8, [0]).map(el => Object.assign({
      latitude: el * 10,
      longitude: 0,
      label: `${el >= 0 ? `${el * 10}°N` : `${-el * 10}°S`}`
    }, {
      pointColor: '#FF0000',
      pointRadius: 0.02,
      labelColor: '#FFFFFF',
      labelSize: 0.3,
      font: 'images/Arial Bold-msdf.json',
      transparent: true  // NOUVEAU : Transparence pour chaque point
    }))

    sceneBuilder.addGeographicPoints({
      spherePosition: [0, 3, 0],
      sphereRadius: 4,
      points: points2,
      defaultLabelSize: 0.3,
      transparent: true  // NOUVEAU : Transparence globale
    })

    // Villes avec transparence
    const villes = [
      {
        latitude: 48.8566, // Paris
        longitude: 2.3522,
        label: 'Paris',
        pointColor: '#FF0000',
        pointRadius: 0.02,
        labelColor: arcenciel(randint(0, 10)),
        labelSize: 0.3,
        font: 'images/Arial Bold-msdf.json',
        transparent: true  // NOUVEAU : Transparence
      },
      {
        latitude: 40.7128, // New York
        longitude: -74.0060,
        label: 'New York',
        pointColor: '#FF0000',
        pointRadius: 0.02,
        labelColor: arcenciel(randint(0, 10)),
        labelSize: 0.3,
        font: 'images/Arial Bold-msdf.json',
        transparent: true  // NOUVEAU : Transparence
      },
      {
        latitude: 35.6895, // Tokyo
        longitude: 139.6917,
        label: 'Tokyo',
        pointColor: '#FF0000',
        pointRadius: 0.02,
        labelColor: arcenciel(randint(0, 10)),
        labelSize: 0.3,
        font: 'images/Arial Bold-msdf.json',
        transparent: true  // NOUVEAU : Transparence
      },
      {
        latitude: -33.8688, // Sydney
        longitude: 151.2093,
        label: 'Sydney',
        pointColor: '#FF0000',
        pointRadius: 0.02,
        labelColor: arcenciel(randint(0, 10)),
        labelSize: 0.3,
        font: 'images/Arial Bold-msdf.json',
        transparent: true  // NOUVEAU : Transparence
      },
      {
        latitude: 51.5074, // Londres
        longitude: -0.1278,
        label: 'Londres',
        pointColor: '#FF0000',
        pointRadius: 0.02,
        labelColor: arcenciel(randint(0, 10)),
        labelSize: 0.3,
        font: 'images/Arial Bold-msdf.json',
        transparent: true  // NOUVEAU : Transparence
      },
      {
        latitude: 55.7558, // Moscou
        longitude: 37.6173,
        label: 'Moscou',
        pointColor: '#FF0000',
        pointRadius: 0.02,
        labelColor: arcenciel(randint(0, 10)),
        labelSize: 0.3,
        font: 'images/Arial Bold-msdf.json',
        transparent: true  // NOUVEAU : Transparence
      }
    ]

    sceneBuilder.addGeographicPoints({
      spherePosition: [0, 3, 0],
      sphereRadius: 4,
      points: villes,
      defaultLabelSize: 0.3,
      transparent: true  // NOUVEAU : Transparence globale
    })

    const vue = sceneBuilder.generateHTML({ withEarth: true, withSky: true })

    this.listeQuestions.push(vue)
    this.listeCorrections.push('Explorez la fractale avec la souris (glisser pour tourner, molette pour zoomer).')

    listeQuestionsToContenu(this)

    // AJOUTER CET ÉVÉNEMENT for initialiser A-Frame après l'affichage
    document.addEventListener('exercicesAffiches', () => {
      SceneViewer.initializeScenes()
    }, { once: true })
  }
}
