import FractionEtendue from '../../modules/FractionEtendue'
import { PointAbstrait } from './points-abstraits'

/**
 * Vecteur sans toute la partie représentation graphique / 2d à privilégier dans le moteur pour limiter les dépendances circulaires.
 * @author Guillaume Valmont
 */
export class VecteurAbstrait {
  nom: string
  x: number
  y: number

  constructor (arg1: FractionEtendue | number | PointAbstrait | string, arg2: FractionEtendue | number | PointAbstrait, nom = '') {
    if (arguments.length === 1) {
      this.nom = String(arg1)
      this.x = 0
      this.y = 0
    } else {
      if (typeof arg1 === 'number' || arg1 instanceof FractionEtendue) {
        this.x = arg1 instanceof FractionEtendue ? arg1.valeurDecimale : Number(arg1)
        this.y = arg2 instanceof FractionEtendue ? arg2.valeurDecimale : Number(arg2)
      } else {
        if ((arg1 instanceof PointAbstrait) && (arg2 instanceof PointAbstrait)) {
          this.x = arg2.x - arg1.x
          this.y = arg2.y - arg1.y
        } else {
          window.notify('Vecteur : (attendus : A et B) les arguments de sont pas des points valides', {
            arg1,
            arg2
          })
          this.x = 0
          this.y = 0
        }
      }
      this.nom = nom
    }
  }

  norme () {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  oppose () {
    this.x = -this.x
    this.y = -this.y
  }

  xSVG (coeff: number) {
    return this.x * coeff
  }

  ySVG (coeff: number) {
    return -this.y * coeff
  }
}

/**
 * Vecteur sans toute la partie représentation graphique / 2d à privilégier dans le moteur pour limiter les dépendances circulaires.
 * @example v = vecteur('V') // son nom
 * @example v = vecteur(x,y) // ses composantes
 * @example v = vecteur(A,B) // son origine et son extrémité (deux Points)
 * @example v = vecteur(x,y,'v') // son nom et ses composantes.
 * @author Jean-Claude Lhote et Rémi Angot
 */
export function vecteurAbstrait (arg1: FractionEtendue | number | PointAbstrait | string, arg2: FractionEtendue | number | PointAbstrait, nom = '') {
  return new VecteurAbstrait(arg1, arg2, nom)
}

/**
 * norme(v) renvoie la norme du vecteur
 * @author Rémi Angot
 */
export function norme (v: VecteurAbstrait) {
  return Math.sqrt(v.x ** 2 + v.y ** 2)
}
