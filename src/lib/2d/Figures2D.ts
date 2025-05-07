import { ObjetMathalea2D } from '../../modules/2dGeneralites'
import { context } from '../../modules/context'

export class Figure2D extends ObjetMathalea2D {
  codeSvg: string
  codeTikz: string
  scale: number
  angle: number
  width: number // laargeur en cm
  height: number // hauteur en cm
  pixelsParCm: number
  constructor ({
    codeSvg,
    codeTikz,
    x = 0,
    y = 0,
    angle = 0,
    scale = 1,
    width = 0,
    height = 0,
    pixelsParCm = context.pixelsParCm,
  }: {
    codeSvg: string,
    codeTikz: string,
    x?: number,
    y?: number,
    angle?: number,
    scale?: number,
    width: number,
    height: number,
    pixelsParCm?: number,
  }) {
    super()
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.pixelsParCm = pixelsParCm
    this.angle = angle
    this.scale = scale
    this.codeSvg = codeSvg
    this.codeTikz = codeTikz
    this.bordures = [
      (this.x - this.width / 2),
      (this.y - this.height / 2),
      (this.x + this.width / 2),
      (this.y + this.height / 2)
    ]
  }

  svg (coeff: number) {
    return `<g transform="translate(${this.x * coeff}, ${-this.y * coeff}) scale(${this.scale}) rotate(${this.angle})">${this.codeSvg}</g>`
  }

  tikz () {
    // const tikzCenterX = this.width / 2
    // const tikzCenterY = this.height / 2
    return `\\begin{scope}[shift={(${this.x},${this.y})}, scale=${this.scale}, rotate around={${this.angle}:(0,0)}]${this.codeTikz}\\end{scope}`
  }

  rotate (angle: number) {
    this.angle += angle
    this.width = this.width * Math.abs(Math.cos(angle)) + this.height * Math.abs(Math.sin(angle))
    this.height = this.width * Math.abs(Math.sin(angle)) + this.height * Math.abs(Math.cos(angle))
    this.bordures = [
      (this.x - this.width / 2),
      (this.y - this.height / 2),
      (this.x + this.width / 2),
      (this.y + this.height / 2)
    ]
    return this
  }

  dilate (factor: number) {
    this.scale *= factor
    this.width = this.width * factor
    this.height = this.height * factor
    let xmin = this.bordures[0]
    let ymin = this.bordures[1]
    let xmax = this.bordures[2]
    let ymax = this.bordures[3]
    xmin = (xmin - this.x) * factor + this.x
    ymin = (ymin - this.y) * factor + this.y
    xmax = (xmax - this.x) * factor + this.x
    ymax = (ymax - this.y) * factor + this.y
    this.bordures = [
      xmin,
      ymin,
      xmax,
      ymax
    ]
    return this
  }

  translate (dx: number, dy: number) {
    this.x += dx
    this.y += dy
    this.bordures = [
      this.bordures[0] + dx,
      this.bordures[1] + dy,
      this.bordures[2] + dx,
      this.bordures[3] + dy
    ]
    return this
  }

  get CodeSvg () {
    return this.codeSvg
  }

  get CodeTikz () {
    return this.codeTikz
  }

  get Width () {
    return this.width
  }

  get Height () {
    return this.height
  }
}
