import { pointAbstrait, PointAbstrait } from './points-abstraits'
import { VecteurAbstrait, vecteurAbstrait } from './vecteurs-abstraits'

export function rotationAbstraite<T extends PointAbstrait | VecteurAbstrait> (A: T, O: PointAbstrait, angle: number):T {
  if (A instanceof PointAbstrait) {
    const x = O.x +
      (A.x - O.x) * Math.cos((angle * Math.PI) / 180) -
      (A.y - O.y) * Math.sin((angle * Math.PI) / 180)
    const y = O.y +
      (A.x - O.x) * Math.sin((angle * Math.PI) / 180) +
      (A.y - O.y) * Math.cos((angle * Math.PI) / 180)
    return pointAbstrait(x, y) as T
  }
  const x = A.x * Math.cos((angle * Math.PI) / 180) -
      A.y * Math.sin((angle * Math.PI) / 180)
  const y = A.x * Math.sin((angle * Math.PI) / 180) +
      A.y * Math.cos((angle * Math.PI) / 180)
  const v = vecteurAbstrait(x, y)
  return v as T
}
