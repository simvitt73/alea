import Decimal from 'decimal.js'
import { createList } from '../../lib/format/lists'
import { choice } from '../../lib/outils/arrayOutils'
import ExerciceBrevetA from '../ExerciceBrevetA'
import { randint } from '../../modules/outils'
import { texNombre } from '../../lib/outils/texNombre'
import Operation from '../../modules/operations'

export const uuid = '559fc'
export const refs = {
  'fr-fr': ['c3C19-0'],
  'fr-ch': []
}
export const titre = 'A la pêche aux coquillages'
export const dateDePublication = '15/11/2024'
/**
 * @Author Jean-Claude Lhote
 * Cet exerice exploite la nouvelle classe d'exercice que j'ai conçue pour les sujets de brevet
 * Il s'agit cependant d'un problème simple de niveau CM2-6e
 * L'idée est de se servir de la classe ExerciceBrevet pour faciliter le codage de ce genre d'exercices
 * Ce genre d'exercice n'a pas pour l'instant à être interactif, mais à créer des sujets papier.
 * La méthode privée appliquerLesValeurs permet de générer les valeurs aléatoires et de construire l'énoncé et la correction
 * La méthode versionOriginale permet de générer les valeurs de l'exercice telles qu'elles sont dans le sujet original
 * La méthode versionAleatoire permet de générer des valeurs aléatoires pour l'exercice
 */
export default class ExerciceProbleme001 extends ExerciceBrevetA {
  constructor () {
    super()
    this.besoinFormulaireCaseACocher = ['Sujet original', false]
    this.sup = false
    this.besoinFormulaire2Numerique = ['niveau de difficulté', 3, '1 : élèves à besoin\n2 : standard\n3 : niveau avancé']
    this.sup2 = 2
    this.besoinFormulaire3CaseACocher = ['Opération posée dans la correction', false]
    this.nbQuestionsModifiable = true
    this.versionAleatoire()
  }

  private appliquerLesValeurs (nbBigorneaux: number, masseBigorneaux: Decimal, niveau: number, nombre2?: number|undefined) {
    let listePrincipale: string
    if (niveau !== 1) { // Niveau 2 et 3
      listePrincipale = `Aujourd'hui, j'ai trouvé $${nbBigorneaux}$ bigorneaux. Ils pèsent ensemble $${niveau === 2 ? `${texNombre(masseBigorneaux, 2)}` : `${texNombre(masseBigorneaux, 0)}`}$ g.<br>En supposant qu'ils aient tous la même masse, trouve combien pèse un bigorneau.
    ${niveau === 3 ? '<br>Donner une valeur approchée au gramme près.' : ''}`
      if (niveau === 2) {
        this.correction = `Pour trouver la masse moyenne d'un bigorneau, on divise la masse totale par le nombre de bigorneaux.<br>
    $${texNombre(masseBigorneaux)}\\text{ g}\\div ${nbBigorneaux}$ = $${texNombre(masseBigorneaux.div(nbBigorneaux), 2)}$ g.<br>
    ${this.sup3 ? `${Operation({ operande1: masseBigorneaux.toNumber(), operande2: nbBigorneaux, type: 'division', precision: 1 })}` : ''}
        Un bigorneau pèse $${texNombre(masseBigorneaux.div(nbBigorneaux), 2)}$ g.`
      } else {
        this.correction = `Pour trouver la masse moyenne d'un bigorneau, on divise la masse totale par le nombre de bigorneaux.<br>
    $${texNombre(masseBigorneaux)}\\text{ g}\\div ${nbBigorneaux}$ = $${texNombre(masseBigorneaux.div(nbBigorneaux), 0)}$ g.<br>
    ${this.sup3 ? `${Operation({ operande1: masseBigorneaux.toNumber(), operande2: nbBigorneaux, type: 'division', precision: 1 })}` : ''}
        Un bigorneau pèse environ $${texNombre(masseBigorneaux.div(nbBigorneaux), 0)}$ g.`
      }
    } else {
      listePrincipale = createList({
        items: [
    `Aujourd'hui, j'ai trouvé $${nbBigorneaux}$ bigorneaux. Ils pèsent ensemble $${texNombre(masseBigorneaux, 2)}$ g.<br>En supposant qu'ils aient tous la même masse, trouve combien pèse un bigorneau ?`,
    `Combien pèsent $${nombre2}$ bigorneaux (on suppose toujours qu'ils ont tous la même masse) ?`
        ],
        style: 'nombres'
      }
      )
      this.correction = createList({
        items: [
    `Pour trouver la masse moyenne d'un bigorneau, on divise la masse totale par le nombre de bigorneaux.<br>
    $${texNombre(masseBigorneaux)}\\text{ g}\\div ${nbBigorneaux}$ = $${texNombre(masseBigorneaux.div(nbBigorneaux), 2)}$ g.<br>
        ${this.sup3 ? `${Operation({ operande1: masseBigorneaux.toNumber(), operande2: nbBigorneaux, type: 'division', precision: 1 })}` : ''}
    Un bigorneau pèse $${texNombre(masseBigorneaux.div(nbBigorneaux), 2)}$ g en moyenne.`,
    `Pour trouver la masse de $${nombre2}$ bigorneaux, on multiplie la masse moyenne d'un bigorneau par le nombre de bigorneaux.<br>
    $${texNombre(masseBigorneaux.div(nbBigorneaux), 2)}\\text{ g}\\times ${nombre2}$ = $${texNombre(masseBigorneaux.mul(Number(nombre2)).div(nbBigorneaux), 2)}$ g.<br>
     ${this.sup3 ? `${Operation({ operande1: masseBigorneaux.div(nbBigorneaux).toNumber(), operande2: nombre2, type: 'multiplication', precision: 1 })}` : ''}
    $${nombre2}$ bigorneaux pèsent $${texNombre(masseBigorneaux.mul(Number(nombre2)).div(nbBigorneaux), 2)}$ g.`
        ],
        style: 'nombres'
      }
      )
    }

    this.enonce = listePrincipale
  }

  versionOriginale: () => void = () => {
    this.appliquerLesValeurs(35, new Decimal(4725).div(10), 1, this.sup2)
  }

  versionAleatoire: () => void = () => {
    let nbBigornaux: number
    let masseBigorneaux: Decimal
    let nombre2: number|undefined
    switch (this.sup2) {
      case 1:
        nbBigornaux = choice([10, 100])
        masseBigorneaux = new Decimal(nbBigornaux).mul(randint(121, 139, [130])).div(10)
        nombre2 = randint(1, 6) * 10 + 5
        break
      case 3:
        nbBigornaux = randint(31, 59, [40, 50])
        masseBigorneaux = new Decimal(nbBigornaux).mul(randint(121, 139, [130])).div(10)
        break
      default:
        nbBigornaux = randint(31, 59, [40, 50])
        masseBigorneaux = new Decimal(nbBigornaux).mul(randint(121, 139, [130])).div(10)
        nombre2 = undefined
        break
    }

    this.appliquerLesValeurs(nbBigornaux, masseBigorneaux, Number(this.sup2), nombre2)
  }
}
