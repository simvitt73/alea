import FractionEtendue from '../../modules/FractionEtendue'

export const epsilon = 0.000001

/**
 * Compare deux nombres (pour les nombres en virgule flottante afin d'éviter les effets de la conversion en virgule flottante).
 * Devient compatible avec les FractionEtendue le 7/05/2024 en comparant leur valeur décimale
 * Pour les Decimal, la conversion automatique en number doit fonctionner.
 * @author Jean-Claude Lhote
 * @param {number} a premier nombre
 * @param {number} b deuxième nombre
 * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
 * @return {boolean}
 */
export function egal (a: number | FractionEtendue, b: number | FractionEtendue, tolerance = epsilon) {
  tolerance = tolerance === 0 ? 1e-10 : tolerance
  if (a instanceof FractionEtendue) a = a.valeurDecimale
  if (b instanceof FractionEtendue) b = b.valeurDecimale
  return (Math.abs(a - b) <= tolerance)
}

/**
 * Retourne true si le nombre a est inférieur à b
 * @param {number} a premier nombre
 * @param {number} b deuxième nombre
 * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
 * @return {boolean}
 */
export function inferieur (a: number, b: number, tolerance = epsilon) {
  return (b - a > tolerance)
}

/**
 * Retourne true si le nombre a est supérieur ou égal à b
 * @param {number} a premier nombre
 * @param {number} b deuxième nombre
 * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
 * @return {boolean}
 */
export function superieurouegal (a: number, b: number, tolerance = epsilon) {
  return (a - b > tolerance || egal(a, b, tolerance))
}

/**
 * Retourne true si le nombre a est inférieur ou égal à b
 * @param {number} a premier nombre
 * @param {number} b deuxième nombre
 * @param {number} [tolerance=0.000001] seuil positif en dessous duquel une valeur est considérée comme nulle
 * @return {boolean}
 */
export function inferieurouegal (a: number, b: number, tolerance = epsilon) {
  return (b - a > tolerance || egal(a, b, tolerance))
}
