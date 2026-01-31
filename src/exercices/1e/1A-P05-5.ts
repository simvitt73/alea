import { tableauColonneLigne } from '../../lib/2d/tableau'
import { choice} from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import ExerciceQcmA from '../ExerciceQcmA'
export const dateDePublication = '30/01/2026'
export const uuid = 'b5817'

export const refs = {
  'fr-fr': ['1A-P05-5'],
  'fr-ch': [''],
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Calculer une probabilité dans un tableau'

interface TableauConfig {
  v11: number  // Ligne 1, Colonne 1 (Pratique sport)
  v12: number  // Ligne 1, Colonne 2 (Ne pratique pas sport)
  v21: number  // Ligne 2, Colonne 1
  v22: number  // Ligne 2, Colonne 2
  v31: number  // Ligne 3, Colonne 1
  v32: number  // Ligne 3, Colonne 2
}

export default class ProbabiliteTableau extends ExerciceQcmA {
  private genererTableauEtEnonce(config: TableauConfig): string {
    // Calcul des totaux
    const total1 = config.v11 + config.v12  // Total ligne 1
    const total2 = config.v21 + config.v22  // Total ligne 2
    const total3 = config.v31 + config.v32  // Total ligne 3
    const totalCol1 = config.v11 + config.v21 + config.v31  // Total colonne Pratique sport
    const totalCol2 = config.v12 + config.v22 + config.v32  // Total colonne Ne pratique pas
    const totalGeneral = total1 + total2 + total3

    const valeurs = [
      String(config.v11), String(config.v12), String(total1),
      String(config.v21), String(config.v22), String(total2),
      String(config.v31), String(config.v32), String(total3),
      String(totalCol1), String(totalCol2), String(totalGeneral)
    ]

    const enonceCommunDebut = 
      'On interroge un groupe de $400$ personnes sur leurs habitudes sportives. Les réponses sont consignées dans le tableau ci-dessous :<br><br>'
    
    const tableau = tableauColonneLigne(
      ['', '\\text{Pratique un sport}', '\\text{Ne pratique pas de sport}', '\\text{Total}'],
      ['\\text{Moins de 25 ans}', '\\text{Entre 25 et 45 ans}', '\\text{Plus de 45 ans}', '\\text{Total}'],
      valeurs
    )
    
    const enonceCommunFin = 
      '<br><br>On choisit une personne de ce groupe au hasard et on définit les événements suivants : ' +
      '$S$ « la personne pratique un sport », ' +
      '$A_1$ « la personne a moins de 25 ans », ' +
      '$A_2$ « la personne a entre 25 et 45 ans » et ' +
      '$A_3$ « la personne a plus de 45 ans ».<br><br>'
    
    return enonceCommunDebut + tableau + enonceCommunFin
  }

  private appliquerLesValeurs(
    config: TableauConfig,
    typeQuestion: number
  ): void {
    // Calcul des totaux
    const total1 = config.v11 + config.v12
    const total2 = config.v21 + config.v22
    const total3 = config.v31 + config.v32
    const totalGeneral = total1 + total2 + total3

    this.enonce = this.genererTableauEtEnonce(config)

    switch (typeQuestion) {
      case 1:
        // P(A_2)
        this.enonce += '$P(A_2)$ correspond à la valeur de :'
        this.correction = 
          `L'événement $A_2$ correspond à la ligne « Entre 25 et 45 ans ».<br>` +
          `Il y a $${total2}$ personnes dans cette catégorie sur un total de $${totalGeneral}$ personnes.<br>` +
          `Donc : $P(A_2)=\\dfrac{${total2}}{${totalGeneral}}=${miseEnEvidence('\\dfrac{3}{8}')}$`
        this.reponses = [
          '$\\dfrac{3}{8}$',
          '$\\dfrac{1}{5}$',
          '$\\dfrac{17}{40}$',
          '$\\dfrac{21}{40}$'
        ]
        break

      case 2:
        // P(A_3)
        this.enonce += '$P(A_3)$ correspond à la valeur de :'
        this.correction = 
          `L'événement $A_3$ correspond à la ligne « Plus de 45 ans ».<br>` +
          `Il y a $${total3}$ personnes dans cette catégorie sur un total de $${totalGeneral}$ personnes.<br>` +
          `Donc : $P(A_3)=\\dfrac{${total3}}{${totalGeneral}}=${miseEnEvidence('\\dfrac{17}{40}')}$`
        this.reponses = [
          '$\\dfrac{17}{40}$',
          '$\\dfrac{1}{5}$',
          '$\\dfrac{3}{8}$',
          '$\\dfrac{21}{40}$'
        ]
        break

      case 3:
        // P(S ∩ A_1)
        this.enonce += '$P(S \\cap A_1)$ correspond à la valeur de :'
        this.correction = 
          `L'événement $S \\cap A_1$ correspond à l'intersection de la colonne « Pratique un sport » et de la ligne « Moins de 25 ans ».<br>` +
          `Il y a $${config.v11}$ personnes dans cette catégorie sur un total de $${totalGeneral}$ personnes.<br>` +
          `Donc : $P(S \\cap A_1)=\\dfrac{${config.v11}}{${totalGeneral}}=${miseEnEvidence('\\dfrac{1}{8}')}$`
        this.reponses = [
          '$\\dfrac{1}{8}$',
          '$\\dfrac{1}{5}$',
          '$\\dfrac{3}{20}$',
          '$\\dfrac{7}{40}$'
        ]
        break

      case 4:
        // P(S ∩ A_2)
        this.enonce += '$P(S \\cap A_2)$ correspond à la valeur de :'
        this.correction = 
          `L'événement $S \\cap A_2$ correspond à l'intersection de la colonne « Pratique un sport » et de la ligne « Entre 25 et 45 ans ».<br>` +
          `Il y a $${config.v21}$ personnes dans cette catégorie sur un total de $${totalGeneral}$ personnes.<br>` +
          `Donc : $P(S \\cap A_2)=\\dfrac{${config.v21}}{${totalGeneral}}=${miseEnEvidence('\\dfrac{9}{40}')}$`
        this.reponses = [
          '$\\dfrac{9}{40}$',
          '$\\dfrac{1}{8}$',
          '$\\dfrac{1}{5}$',
          '$\\dfrac{3}{20}$'
        ]
        break

      case 5:
        // P_{A_1}(S)
        this.enonce += '$P_{A_1}(S)$ correspond à la valeur de :'
        this.correction = 
          `La probabilité conditionnelle $P_{A_1}(S)$ se calcule parmi les personnes de la catégorie « Moins de 25 ans ».<br>` +
          `Il y a $${config.v11}$ personnes répondant aux deux critères sur $${total1}$ personnes dans cette catégorie.<br>` +
          `Donc : $P_{A_1}(S)=\\dfrac{${config.v11}}{${total1}}=${miseEnEvidence('\\dfrac{5}{8}')}$`
        this.reponses = [
          '$\\dfrac{5}{8}$',
          '$\\dfrac{3}{8}$',
          '$\\dfrac{1}{8}$',
          '$\\dfrac{7}{8}$'
        ]
        break

      case 6:
        // P_{A_2}(S)
        this.enonce += '$P_{A_2}(S)$ correspond à la valeur de :'
        this.correction = 
          `La probabilité conditionnelle $P_{A_2}(S)$ se calcule parmi les personnes de la catégorie « Entre 25 et 45 ans ».<br>` +
          `Il y a $${config.v21}$ personnes répondant aux deux critères sur $${total2}$ personnes dans cette catégorie.<br>` +
          `Donc : $P_{A_2}(S)=\\dfrac{${config.v21}}{${total2}}=${miseEnEvidence('\\dfrac{3}{5}')}$`
        this.reponses = [
          '$\\dfrac{3}{5}$',
          '$\\dfrac{2}{5}$',
          '$\\dfrac{9}{40}$',
          '$\\dfrac{7}{10}$'
        ]
        break

      case 7:
        // P_{A_3}(S)
        this.enonce += '$P_{A_3}(S)$ correspond à la valeur de :'
        this.correction = 
          `La probabilité conditionnelle $P_{A_3}(S)$ se calcule parmi les personnes de la catégorie « Plus de 45 ans ».<br>` +
          `Il y a $${config.v31}$ personnes répondant aux deux critères sur $${total3}$ personnes dans cette catégorie.<br>` +
          `Donc : $P_{A_3}(S)=\\dfrac{${config.v31}}{${total3}}=${miseEnEvidence('\\dfrac{7}{17}')}$`
        this.reponses = [
          '$\\dfrac{7}{17}$',
          '$\\dfrac{7}{20}$',
          '$\\dfrac{10}{17}$',
          '$\\dfrac{7}{40}$'
        ]
        break

      case 8:
        // P_{A_2}(non S)
        this.enonce += '$P_{A_2}(\\overline{S})$ correspond à la valeur de :'
        this.correction = 
          `La probabilité conditionnelle $P_{A_2}(\\overline{S})$ se calcule parmi les personnes de la catégorie « Entre 25 et 45 ans ».<br>` +
          `Il y a $${config.v22}$ personnes ne pratiquant pas de sport sur $${total2}$ personnes dans cette catégorie.<br>` +
          `Donc : $P_{A_2}(\\overline{S})=\\dfrac{${config.v22}}{${total2}}=${miseEnEvidence('\\dfrac{2}{5}')}$`
        this.reponses = [
          '$\\dfrac{2}{5}$',
          '$\\dfrac{3}{5}$',
          '$\\dfrac{3}{20}$',
          '$\\dfrac{3}{10}$'
        ]
        break
    }
  }

  versionOriginale: () => void = () => {
    const config: TableauConfig = {
      v11: 50, v12: 30,
      v21: 90, v22: 60,
      v31: 70, v32: 100
    }
    
    this.enonce = this.genererTableauEtEnonce(config)
    
    // Version originale : P_{A_3}(S)
    this.enonce += '$P_{A_3}(S)$ correspond à la valeur de :'
    this.correction = 
      `La probabilité conditionnelle $P_{A_3}(S)$ se calcule parmi les personnes de la catégorie « Plus de 45 ans ».<br>` +
      `Il y a $70$ personnes répondant aux deux critères sur $170$ personnes dans cette catégorie.<br>` +
      `Donc : $P_{A_3}(S)=\\dfrac{70}{170}=${miseEnEvidence('\\dfrac{7}{17}')}$`
    this.reponses = [
      '$\\dfrac{7}{17}$',
      '$\\dfrac{7}{20}$',
      '$\\dfrac{10}{17}$',
      '$\\dfrac{7}{40}$'
    ]
  }

  versionAleatoire = () => {
    // Définir les deux tableaux possibles
    const tableaux: TableauConfig[] = [
      {
        v11: 50, v12: 30,
        v21: 90, v22: 60,
        v31: 70, v32: 100
      },
      {
        v11: 60, v12: 40,
        v21: 70, v22: 50,
        v31: 90, v32: 90
      }
    ]
    
    const config = choice(tableaux)
    
    // Pour le tableau 1 : 8 questions possibles
    // Pour le tableau 2 : 8 questions possibles
    const typeQuestion = choice([1, 2, 3, 4, 5, 6, 7, 8])
    
    if (config === tableaux[0]) {
      // Tableau 1
      this.appliquerLesValeurs(config, typeQuestion)
    } else {
      // Tableau 2
      const total1 = config.v11 + config.v12
      const total2 = config.v21 + config.v22
      const total3 = config.v31 + config.v32
      const totalGeneral = 400

      this.enonce = this.genererTableauEtEnonce(config)
      
      switch (typeQuestion) {
        case 1:
          // P(A_1)
          this.enonce += '$P(A_1)$ correspond à la valeur de :'
          this.correction = 
            `L'événement $A_1$ correspond à la ligne « Moins de 25 ans ».<br>` +
            `Il y a $${total1}$ personnes dans cette catégorie sur un total de $${totalGeneral}$ personnes.<br>` +
            `Donc : $P(A_1)=\\dfrac{${total1}}{${totalGeneral}}=${miseEnEvidence('\\dfrac{1}{4}')}$`
          this.reponses = [
            '$\\dfrac{1}{4}$',
            '$\\dfrac{3}{20}$',
            '$\\dfrac{3}{10}$',
            '$\\dfrac{11}{20}$'
          ]
          break

        case 2:
          // P(A_3)
          this.enonce += '$P(A_3)$ correspond à la valeur de :'
          this.correction = 
            `L'événement $A_3$ correspond à la ligne « Plus de 45 ans ».<br>` +
            `Il y a $${total3}$ personnes dans cette catégorie sur un total de $${totalGeneral}$ personnes.<br>` +
            `Donc : $P(A_3)=\\dfrac{${total3}}{${totalGeneral}}=${miseEnEvidence('\\dfrac{9}{20}')}$`
          this.reponses = [
            '$\\dfrac{9}{20}$',
            '$\\dfrac{1}{4}$',
            '$\\dfrac{3}{10}$',
            '$\\dfrac{11}{20}$'
          ]
          break

        case 3:
          // P(S ∩ A_1)
          this.enonce += '$P(S \\cap A_1)$ correspond à la valeur de :'
          this.correction = 
            `L'événement $S \\cap A_1$ correspond à l'intersection de la colonne « Pratique un sport » et de la ligne « Moins de 25 ans ».<br>` +
            `Il y a $${config.v11}$ personnes dans cette catégorie sur un total de $${totalGeneral}$ personnes.<br>` +
            `Donc : $P(S \\cap A_1)=\\dfrac{${config.v11}}{${totalGeneral}}=${miseEnEvidence('\\dfrac{3}{20}')}$`
          this.reponses = [
            '$\\dfrac{3}{20}$',
            '$\\dfrac{1}{4}$',
            '$\\dfrac{7}{40}$',
            '$\\dfrac{3}{10}$'
          ]
          break

        case 4:
          // P(S ∩ A_2)
          this.enonce += '$P(S \\cap A_2)$ correspond à la valeur de :'
          this.correction = 
            `L'événement $S \\cap A_2$ correspond à l'intersection de la colonne « Pratique un sport » et de la ligne « Entre 25 et 45 ans ».<br>` +
            `Il y a $${config.v21}$ personnes dans cette catégorie sur un total de $${totalGeneral}$ personnes.<br>` +
            `Donc : $P(S \\cap A_2)=\\dfrac{${config.v21}}{${totalGeneral}}=${miseEnEvidence('\\dfrac{7}{40}')}$`
          this.reponses = [
            '$\\dfrac{7}{40}$',
            '$\\dfrac{1}{4}$',
            '$\\dfrac{3}{20}$',
            '$\\dfrac{3}{10}$'
          ]
          break

        case 5:
          // P_{A_1}(S)
          this.enonce += '$P_{A_1}(S)$ correspond à la valeur de :'
          this.correction = 
            `La probabilité conditionnelle $P_{A_1}(S)$ se calcule parmi les personnes de la catégorie « Moins de 25 ans ».<br>` +
            `Il y a $${config.v11}$ personnes répondant aux deux critères sur $${total1}$ personnes dans cette catégorie.<br>` +
            `Donc : $P_{A_1}(S)=\\dfrac{${config.v11}}{${total1}}=${miseEnEvidence('\\dfrac{3}{5}')}$`
          this.reponses = [
            '$\\dfrac{3}{5}$',
            '$\\dfrac{2}{5}$',
            '$\\dfrac{3}{20}$',
            '$\\dfrac{3}{10}$'
          ]
          break

        case 6:
          // P_{A_2}(S)
          this.enonce += '$P_{A_2}(S)$ correspond à la valeur de :'
          this.correction = 
            `La probabilité conditionnelle $P_{A_2}(S)$ se calcule parmi les personnes de la catégorie « Entre 25 et 45 ans ».<br>` +
            `Il y a $${config.v21}$ personnes répondant aux deux critères sur $${total2}$ personnes dans cette catégorie.<br>` +
            `Donc : $P_{A_2}(S)=\\dfrac{${config.v21}}{${total2}}=${miseEnEvidence('\\dfrac{7}{12}')}$`
          this.reponses = [
            '$\\dfrac{7}{12}$',
            '$\\dfrac{7}{40}$',
            '$\\dfrac{5}{12}$',
            '$\\dfrac{3}{10}$'
          ]
          break

        case 7:
          // P_{A_3}(S)
          this.enonce += '$P_{A_3}(S)$ correspond à la valeur de :'
          this.correction = 
            `La probabilité conditionnelle $P_{A_3}(S)$ se calcule parmi les personnes de la catégorie « Plus de 45 ans ».<br>` +
            `Il y a $${config.v31}$ personnes répondant aux deux critères sur $${total3}$ personnes dans cette catégorie.<br>` +
            `Donc : $P_{A_3}(S)=\\dfrac{${config.v31}}{${total3}}=${miseEnEvidence('\\dfrac{1}{2}')}$`
          this.reponses = [
            '$\\dfrac{1}{2}$',
            '$\\dfrac{9}{40}$',
            '$\\dfrac{9}{20}$',
            '$\\dfrac{11}{40}$'
          ]
          break

        case 8:
          // P_{A_1}(non S)
          this.enonce += '$P_{A_1}(\\overline{S})$ correspond à la valeur de :'
          this.correction = 
            `La probabilité conditionnelle $P_{A_1}(\\overline{S})$ se calcule parmi les personnes de la catégorie « Moins de 25 ans ».<br>` +
            `Il y a $${config.v12}$ personnes ne pratiquant pas de sport sur $${total1}$ personnes dans cette catégorie.<br>` +
            `Donc : $P_{A_1}(\\overline{S})=\\dfrac{${config.v12}}{${total1}}=${miseEnEvidence('\\dfrac{2}{5}')}$`
          this.reponses = [
            '$\\dfrac{2}{5}$',
            '$\\dfrac{3}{5}$',
            '$\\dfrac{1}{10}$',
            '$\\dfrac{9}{20}$'
          ]
          break
      }
    }
  }

  constructor() {
    super()
    this.versionAleatoire()
  }
}