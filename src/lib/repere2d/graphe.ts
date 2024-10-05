import type { Repere2D } from './repere2d'

export class Graphe implements Repere2D {
  expression : string
  domain : [number, number]
  sample : number
  style : string
  color : string
  // optional parameter color
  constructor (expression : string, domain : [number, number], sample : number = 200, style : string = 'thick', color : string = 'black') {
    this.expression = expression
    this.domain = domain
    this.sample = sample
    this.style = style
    this.color = color
  }

  renderTikz = () => `\\addplot[${this.style},domain=${this.domain[0]}:${this.domain[1]},samples=${this.sample},color=${this.color}] {${this.expression}};`
}
