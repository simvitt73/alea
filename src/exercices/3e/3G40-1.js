import { SceneViewer } from '../../lib/3d/SceneViewer'
import { ajouteQuestionMathlive } from '../../lib/interactif/questionMathLive'
import { choice, shuffle } from '../../lib/outils/arrayOutils'
import { arcenciel } from '../../lib/outils/embellissements'
import { rangeMinMax } from '../../lib/outils/nombres'
import { randint } from '../../modules/outils'
import Exercice from '../Exercice'

export const dateDeModifImportante = '13/07/2025'
export const titre = 'Repérage géodésique sur la Terre'
export const interactifReady = true
export const interactifType = 'mathLive'

export const uuid = '75ea3'

export const refs = {
  'fr-fr': ['3G40-1'],
  'fr-ch': []
}

const listeVilles = [
  { latitude: 40.7128, longitude: -74.0060, label: 'New York' },
  { latitude: -33.8688, longitude: 151.2093, label: 'Sydney' },
  { latitude: 39.9042, longitude: 116.4074, label: 'Pékin' },
  { latitude: -23.5505, longitude: -46.6333, label: 'São Paulo' },
  { latitude: 19.4326, longitude: -99.1332, label: 'Mexico City' },
  { latitude: 37.7749, longitude: -122.4194, label: 'San Francisco' },
  { latitude: 1.3521, longitude: 103.8198, label: 'Singapour' },
  { latitude: 34.0522, longitude: -118.2437, label: 'Los Angeles' },
  { latitude: 55.7558, longitude: 13.4050, label: 'Berlin' },
  { latitude: 37.5665, longitude: 126.9780, label: 'Séoul' },
  { latitude: 28.6139, longitude: 77.2090, label: 'New Delhi' },
  { latitude: -37.8136, longitude: 144.9631, label: 'Melbourne' },
  { latitude: 55.9533, longitude: -3.1883, label: 'Édimbourg' },
  { latitude: -22.9068, longitude: -43.1729, label: 'Rio de Janeiro' },
  { latitude: 37.3382, longitude: -121.8863, label: 'San José' },
  { latitude: 47.6062, longitude: -122.3321, label: 'Seattle' },
  { latitude: 39.7392, longitude: -104.9903, label: 'Denver' },
  { latitude: 43.6532, longitude: -79.3832, label: 'Toronto' },
  { latitude: 41.3275, longitude: 19.8187, label: 'Tirana' },
  { latitude: 48.2082, longitude: 16.3738, label: 'Vienne' },
  { latitude: 53.9, longitude: 27.5667, label: 'Minsk' },
  { latitude: 50.8466, longitude: 4.3528, label: 'Bruxelles' },
  { latitude: 43.8563, longitude: 18.4131, label: 'Sarajevo' },
  { latitude: 42.6977, longitude: 23.3219, label: 'Sofia' },
  { latitude: 45.8131, longitude: 15.9770, label: 'Zagreb' },
  { latitude: 35.1856, longitude: 33.3823, label: 'Nicosie' },
  { latitude: 50.0755, longitude: 14.4378, label: 'Prague' },
  { latitude: 55.6761, longitude: 12.5683, label: 'Copenhague' },
  { latitude: 59.4370, longitude: 24.7536, label: 'Tallinn' },
  { latitude: 60.1699, longitude: 24.9384, label: 'Helsinki' },
  { latitude: 48.8566, longitude: 2.3522, label: 'Paris' },
  { latitude: 37.9838, longitude: 23.7275, label: 'Athènes' },
  { latitude: 47.4979, longitude: 19.0402, label: 'Budapest' },
  { latitude: 64.1466, longitude: -21.9426, label: 'Reykjavik' },
  { latitude: 53.3498, longitude: -6.2603, label: 'Dublin' },
  { latitude: 41.9028, longitude: 12.4964, label: 'Rome' },
  { latitude: 56.9496, longitude: 24.1052, label: 'Riga' },
  { latitude: 54.6872, longitude: 25.2797, label: 'Vilnius' },
  { latitude: 49.6116, longitude: 6.1319, label: 'Luxembourg' },
  { latitude: 35.8997, longitude: 14.5147, label: 'La Valette' },
  { latitude: 47.0105, longitude: 28.8638, label: 'Chisinau' },
  { latitude: 42.5063, longitude: 1.5218, label: 'Andorre-la-Vieille' },
  { latitude: 59.9139, longitude: 10.7522, label: 'Oslo' },
  { latitude: 52.2297, longitude: 21.0122, label: 'Varsovie' },
  { latitude: 38.7223, longitude: -9.1393, label: 'Lisbonne' },
  { latitude: 44.4268, longitude: 26.1025, label: 'Bucarest' },
  { latitude: 55.7558, longitude: 37.6173, label: 'Moscou' },
  { latitude: 44.7866, longitude: 20.4489, label: 'Belgrade' },
  { latitude: 48.1486, longitude: 17.1077, label: 'Bratislava' },
  { latitude: 46.0569, longitude: 14.5058, label: 'Ljubljana' },
  { latitude: 40.4168, longitude: -3.7038, label: 'Madrid' },
  { latitude: 59.3293, longitude: 18.0686, label: 'Stockholm' },
  { latitude: 46.9480, longitude: 7.4474, label: 'Berne' },
  { latitude: 50.4501, longitude: 30.5234, label: 'Kiev' },
  { latitude: 51.5074, longitude: -0.1278, label: 'Londres' },
  { latitude: 42.4410, longitude: 19.2620, label: 'Podgorica' },
  { latitude: 41.7151, longitude: 44.8271, label: 'Tbilissi' },
  { latitude: 35.6895, longitude: 139.6917, label: 'Tokyo' },
  { latitude: -26.2041, longitude: 28.0473, label: 'Johannesburg' },
  { latitude: 36.8065, longitude: 10.1815, label: 'Tunis' },
  { latitude: 33.5731, longitude: -7.5898, label: 'Casablanca' },
  { latitude: 31.7917, longitude: -7.0926, label: 'Marrakech' },
  { latitude: 36.7529, longitude: 3.0420, label: 'Alger' },
  { latitude: 35.6895, longitude: -0.6332, label: 'Oran' },
  { latitude: 14.7167, longitude: -17.4677, label: 'Dakar' },
  { latitude: 6.5244, longitude: 3.3792, label: 'Lagos' },
  { latitude: 9.0579, longitude: 7.4951, label: 'Abuja' },
  { latitude: -1.2921, longitude: 36.8219, label: 'Nairobi' },
  { latitude: 30.0444, longitude: 31.2357, label: 'Le Caire' },
  { latitude: -4.4419, longitude: 15.2663, label: 'Kinshasa' },
  { latitude: 12.6392, longitude: -8.0029, label: 'Bamako' },
  { latitude: 5.6037, longitude: -0.1870, label: 'Accra' },
  { latitude: 15.5007, longitude: 32.5599, label: 'Khartoum' },
  { latitude: -18.8792, longitude: 47.5079, label: 'Antananarivo' },
  { latitude: -33.9249, longitude: 18.4241, label: 'Le Cap' },
  { latitude: -17.8252, longitude: 31.0335, label: 'Harare' },
  { latitude: 7.3775, longitude: 3.9470, label: 'Ibadan' },
  { latitude: 4.8156, longitude: 7.0498, label: 'Port Harcourt' },
  { latitude: 13.5137, longitude: 2.1098, label: 'Niamey' },
  { latitude: 11.5564, longitude: 104.9282, label: 'Kampala' },
  { latitude: 12.3686, longitude: -1.5271, label: 'Ouagadougou' },
  { latitude: 36.3650, longitude: 6.6147, label: 'Constantine' },
  { latitude: 35.6971, longitude: -0.6308, label: 'Oran' },
  { latitude: 14.6928, longitude: -17.4467, label: 'Thiès' },
  { latitude: 6.3156, longitude: -10.8074, label: 'Monrovia' },
  { latitude: 9.1450, longitude: 40.4897, label: 'Addis-Abeba' }, { latitude: -33.8688, longitude: 151.2093, label: 'Sydney' },
  { latitude: -27.4698, longitude: 153.0251, label: 'Brisbane' },
  { latitude: -31.9505, longitude: 115.8605, label: 'Perth' },
  { latitude: -34.9285, longitude: 138.6007, label: 'Adélaïde' },
  { latitude: -35.2809, longitude: 149.1300, label: 'Canberra' },
  { latitude: -12.4634, longitude: 130.8456, label: 'Darwin' },
  { latitude: -42.8821, longitude: 147.3272, label: 'Hobart' },
  { latitude: -16.9186, longitude: 145.7781, label: 'Cairns' },
  { latitude: -23.6980, longitude: 133.8807, label: 'Alice Springs' },
  { latitude: 31.2304, longitude: 121.4737, label: 'Shanghai' },
  { latitude: 19.0760, longitude: 72.8777, label: 'Mumbai' },
  { latitude: 23.1291, longitude: 113.2644, label: 'Canton' },
  { latitude: 13.7563, longitude: 100.5018, label: 'Bangkok' },
  { latitude: 14.5995, longitude: 120.9842, label: 'Manille' },
  { latitude: 24.8607, longitude: 67.0011, label: 'Karachi' },
  { latitude: 35.6892, longitude: 51.3890, label: 'Téhéran' },
  { latitude: 41.0082, longitude: 28.9784, label: 'Istanbul' },
  { latitude: 25.276987, longitude: 55.296249, label: 'Dubaï' },
  { latitude: 31.5497, longitude: 74.3436, label: 'Lahore' },
  { latitude: 22.3964, longitude: 114.1095, label: 'Hong Kong' },
  { latitude: 34.6937, longitude: 135.5023, label: 'Osaka' },
  { latitude: 23.8103, longitude: 90.4125, label: 'Dacca' },
  { latitude: 21.0285, longitude: 105.8542, label: 'Hanoï' },
  { latitude: 10.762622, longitude: 106.660172, label: 'Hô Chi Minh-Ville' },
  { latitude: 24.7136, longitude: 46.6753, label: 'Riyad' },
  { latitude: 29.3759, longitude: 47.9774, label: 'Koweït City' },
  { latitude: 39.9334, longitude: 32.8597, label: 'Ankara' },
  { latitude: 33.6844, longitude: 73.0479, label: 'Islamabad' },
]

// Ajout des propriétés communes à toutes les villes
listeVilles.forEach(ville => {
  ville.pointColor = '#FF0000'
  ville.pointRadius = 0.02
  ville.labelColor = arcenciel(randint(0, 10))
  ville.labelSize = 0.5
  ville.font = 'images/Arial Bold-msdf.json'
  ville.transparent = true
})

export default class ReperageSurLaTerre extends Exercice {
  constructor () {
    super()

    this.nbQuestions = 4
  }

  nouvelleVersion () {
    const villes = shuffle(listeVilles).slice(0, this.nbQuestions)
    const sceneBuilder = new SceneViewer({ width: 400, height: 400 })
    // Création de la scène 3D
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
    // Les longitudes
    const points = rangeMinMax(-17, 18, [0]).map(el => Object.assign({
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
    const points2 = rangeMinMax(-8, 8, [0]).map(el => [Object.assign({
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
    }),
    Object.assign({
      latitude: el * 10,
      longitude: 180,
      label: `${el >= 0 ? `${el * 10}°N` : `${-el * 10}°S`}`
    }, {
      pointColor: '#FF0000',
      pointRadius: 0.02,
      labelColor: '#FFFFFF',
      labelSize: 0.3,
      font: 'images/Arial Bold-msdf.json',
      transparent: true  // NOUVEAU : Transparence pour chaque point
    })]
    ).flat(1)

    sceneBuilder.addGeographicPoints({
      spherePosition: [0, 3, 0],
      sphereRadius: 4,
      points: points2,
      defaultLabelSize: 0.3,
      transparent: true  // NOUVEAU : Transparence globale
    })

    // Villes avec transparence

    sceneBuilder.addGeographicPoints({
      spherePosition: [0, 3, 0],
      sphereRadius: 4,
      points: villes,
      defaultLabelSize: 0.3,
      transparent: true  // NOUVEAU : Transparence globale
    })

    sceneBuilder.addRealisticEarthSphere({
      position: [0, 3, 0],
      radius: 4,
      greenwichAlignment: -90,
    })

    const vue = sceneBuilder.generateHTML({ withEarth: true, withSky: true })
    this.consigne = vue

    for (let i = 0; i < this.nbQuestions; i++) {
      const ville = villes[i]
      const choix = choice(['latitude', 'longitude'])
      const question = `Quelle est la ${choix} de ${ville.label} ?` + ajouteQuestionMathlive({
        exercice: this,
        question: i,
        typeInteractivite: 'mathlive',
        objetReponse: {
          reponse: { value: `${choix === 'latitude' ? Math.round(Math.abs(ville.latitude)) : Math.round(Math.abs(ville.longitude))}°${choix === 'latitude' ? (ville.latitude >= 0 ? 'N' : 'S') : (ville.longitude >= 0 ? 'E' : 'O')}` },
        }
      })
      const correction = `La ${choix} de ${ville.label} est d'environ ${choix === 'latitude'
       ? `${Math.round(Math.abs(ville.latitude))}°${ville.latitude >= 0 ? 'N' : 'S'}`
       : `${Math.round(Math.abs(ville.longitude))}°${ville.longitude >= 0 ? 'E' : 'O'
      }`}.`
      this.listeQuestions.push(question)
      this.listeCorrections.push(correction)
    }
    document.addEventListener('exercicesAffiches', () => {
      SceneViewer.initializeScenes()
    }, { once: true })
  }
}
