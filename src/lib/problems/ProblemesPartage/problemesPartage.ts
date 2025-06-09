import { randint } from '../../../modules/outils'
import SchemaEnBoite from '../../outils/SchemaEnBoite'
import { texNombre } from '../../outils/texNombre'
import Probleme from '../Probleme'
import { courses2 } from './courses'
import { fete } from './feteEcole'
import { mariage1 } from './mariage'
/**
 * @author Jean-Claude Lhote
 */
export default class ProblemePartage extends Probleme {
  constructor (name: string = '', data?: { nbFois: number, quotité: number, reste?: number }) {
    const nbFois = data?.nbFois ?? randint(2, 5)
    const reste = data?.reste ?? 0
    const quotité = data?.quotité ?? randint(10, 20)
    const total = nbFois * quotité + reste
    data = data == null ? { nbFois, quotité: randint(5, 10) } : data
    super(name, data)
    this.schema = new SchemaEnBoite({

      bottomBraces: [{
        start: 3,
        end: 13,
        text: String(nbFois)
      }],
      lignes: [
        {
          barres: [
            {
              content: `$${texNombre(nbFois * quotité + reste, 2)}$`,
              length: 12,
              color: 'lightgray'
            }
          ]
        },
        {
          barres: [
            {
              content: `$${texNombre(reste, 2)}$`,
              length: 2,
              color: 'lightgray'
            },
            {
              content: `$${texNombre(quotité, 2)}$`,
              length: 2,
              color: 'lightgray'
            },
            {
              content: '',
              length: 6,
              color: 'lightgray',
              type: 'flèche'
            },
            {
              content: `$${texNombre(quotité, 2)}$`,
              length: 2,
              color: 'lightgray'
            }
          ]
        }
      ]
    })
    this.enonce = `Nous avons ${total} objets. Après en avoir mis ${reste} de côté, nous formons ${nbFois} paquets. Combien y a-t-il d'objets par paquets ?`
    this.correction = `Nous avons ${total} objets. Après en avoir mis ${reste} de côté, il en reste ${total - reste}. Donc, il y a $${texNombre((total - reste) / nbFois, 2)}$ objets par paquet.`
    this.reponse = texNombre((total - reste) / nbFois, 2)
  }
}

export const listeDeProblemesPartage = [
  mariage1,
  courses2,
  fete
]
/*
const situationsDivisionApresSoustractionMassesDistances = [
  {
    enonce: `Un camion a livré $${texNombre(total, 1)}$ tonnes de sable sur un chantier.
$${texNombre(reste, 1)}$ tonnes ont été perdues en cours de déchargement.
Le sable restant a été réparti en ${nbFois} tas égaux.
Quelle masse de sable y a-t-il dans chaque tas ?`,
    correction: `${texNombre(total, 1)} tonnes ont été livrées, mais ${texNombre(reste, 1)} tonnes ont été perdues.
Il reste donc ${texNombre(total - reste, 1)} tonnes à répartir en ${nbFois} tas.
Le calcul est : $${texNombre(total - reste, 1)} \\div ${texNombre(nbFois, 0)} = ${texNombre((total - reste) / nbFois, 2)}$ tonnes par tas.`
  },
  {
    enonce: `Une équipe devait parcourir $${texNombre(total, 2)}$ kilomètres lors d'une course en relais.
$${texNombre(reste, 2)}$ kilomètres n'ont pas pu être courus à cause de la météo.
La distance restante a été répartie entre ${nbFois} coureurs.
Quelle distance chaque coureur a-t-il parcourue ?`,
    correction: `${texNombre(total, 2)} kilomètres devaient être parcourus, mais ${texNombre(reste, 2)} kilomètres ne l'ont pas été.
Il reste donc ${texNombre(total - reste, 2)} kilomètres à répartir entre ${nbFois} coureurs.
Le calcul est : $${texNombre(total - reste, 2)} \\div ${texNombre(nbFois, 0)} = ${texNombre((total - reste) / nbFois, 2)}$ kilomètres par coureur.`
  },
  {
    enonce: `Une laiterie a produit $${texNombre(total, 1)}$ litres de lait.
$${texNombre(reste, 1)}$ litres ont été mis de côté car non conformes.
Le lait restant a été mis dans ${nbFois} bouteilles.
Quelle quantité de lait contient chaque bouteille ?`,
    correction: `${texNombre(total, 1)} litres ont été produits, mais ${texNombre(reste, 1)} litres ont été écartés.
Il reste donc ${texNombre(total - reste, 1)} litres à répartir dans ${nbFois} bouteilles.
Le calcul est : $${texNombre(total - reste, 1)} \\div ${texNombre(nbFois, 0)} = ${texNombre((total - reste) / nbFois, 2)}$ litres par bouteille.`
  },
  {
    enonce: `${personnage.prenom} a acheté $${texNombre(total, 1)}$ kg de pommes de terre pour un repas de groupe.
$${texNombre(reste, 1)}$ kg n'ont pas pu être utilisés.
${premiereLettreEnMajuscule(personnage.pronom)} a ensuite réparti le reste dans ${nbFois} grands paniers.
Quelle masse de pommes de terre y a-t-il dans chaque panier ?`,
    correction: `${texNombre(total, 1)} kg ont été achetés, mais ${texNombre(reste, 1)} kg n'ont pas pu être utilisés.
Il reste donc ${texNombre(total - reste, 1)} kg à répartir dans ${nbFois} paniers.
Le calcul est : $${texNombre(total - reste, 1)} \\div ${texNombre(nbFois, 0)} = ${texNombre((total - reste) / nbFois, 2)}$ kg par panier.`
  },
  {
    enonce: `${personnage.prenom} a reçu $${texNombre(total, 1)}$ litres de savon liquide pour équiper les sanitaires de l'école.
$${texNombre(reste, 1)}$ litres ont été renversés par accident.
${premiereLettreEnMajuscule(personnage.pronom)} a ensuite rempli ${nbFois} distributeurs avec le reste.
Quel volume de savon y a-t-il dans chaque distributeur ?`,
    correction: `${texNombre(total, 1)} litres ont été reçus, mais ${texNombre(reste, 1)} litres ont été renversés.
Il reste donc ${texNombre(total - reste, 1)} litres à répartir dans ${nbFois} distributeurs.
Le calcul est : $${texNombre(total - reste, 1)} \\div ${texNombre(nbFois, 0)} = ${texNombre((total - reste) / nbFois, 2)}$ litres par distributeur.`
  }
];
*/
