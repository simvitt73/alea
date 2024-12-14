import { context } from '../../modules/context'
import './ShemasEnBoite.css'
import { texNombre } from './texNombre'

type AccoladeType = {
  start: number, // colonne de début (1 = première colonne)
  end: number, // colonne de fin = start + longueur de l'accolade
  text: string
}
type BarreSchemaType = {
  color: string
  length: number
  content: string
}
type LigneSchemaType = BarreSchemaType[]
type LigneAccoladeType = AccoladeType[]
export default class SchemaEnBoite {
  braceT?: LigneAccoladeType
  braceB?: LigneAccoladeType
  top: LigneSchemaType
  bottom: LigneSchemaType

  constructor ({ top, bottom, braceB, braceT }: { top: LigneSchemaType, bottom: LigneSchemaType, braceB?: LigneAccoladeType, braceT?: LigneAccoladeType } = { top: [], bottom: [] }) {
    this.top = top
    this.bottom = bottom
    if (braceB) {
      this.braceB = braceB
    }
    if (braceT) {
      this.braceT = braceT
    }
  }

  concat (boite: SchemaEnBoite): SchemaEnBoite {
    return new SchemaEnBoite({ top: this.top.concat(boite.top) ?? [], bottom: this.bottom.concat(boite.bottom) ?? [], braceB: this.braceB?.concat(boite.braceB ?? []) ?? [], braceT: this.braceT?.concat(boite.braceT ?? []) ?? [] })
  }

  display (): string {
    if (context.isHtml) {
      let ligneAccoladeH = ''
      if (this.braceT) {
        for (let k = 0; k < this.braceT.length; k++) {
          const accolade = this.braceT[k]
          const start = accolade.start
          const end = accolade.end
          const texte = accolade.text
          if (start != null && end != null && texte != null) {
            ligneAccoladeH +=
            `<div class="SchemaItem" style="grid-row: 1; grid-column-start: ${start}; grid-column-end: ${end}; text-align:center; border: none">
            <div class="latexAccoladeTop">$${texte}$</div>
            <div class="curly-brace">
            <div class="brace right"></div>
            <div class="brace left"></div>
            </div>
            </div>\n`
          }
        }
      }
      let ligne1 = ''
      let start = 1
      for (let k = 0; k < this.top.length; k++) {
        ligne1 += `<div class="SchemaItem" style="grid-row: 2; grid-column-start: ${start}; grid-column-end: ${start + this.top[k].length}; background-color:${this.top[k].color}; text-align:center;">${this.top[k].content}</div>\n`
        start += this.top[k].length
      }
      let ligne2 = ''
      start = 1
      for (let k = 0; k < this.bottom.length; k++) {
        ligne2 += `<div class="SchemaItem" style="grid-row: 3; grid-column-start: ${start}; grid-column-end: ${start + this.bottom[k].length}; background-color:${this.bottom[k].color}; text-align:center;">${this.bottom[k].content}</div>\n`
        start += this.bottom[k].length
      }
      let ligneAccoladeB = ''
      if (this.braceB) {
        for (let k = 0; k < this.braceB.length; k++) {
          const brace = this.braceB[k]
          const start = brace.start
          const end = brace.end
          const texte = brace.text
          if (start != null && end != null && texte != null) {
            ligneAccoladeB +=
            `<div class="SchemaItem" style="grid-row: 4; grid-column-start: ${start}; grid-column-end: ${end}; text-align:center; border: none">
            <div class="curly-brace">
            <div class="brace left"></div>
            <div class="brace right"></div>
            </div>
             <div class="latexAccoladeBottom">$${texte}$</div>
            </div>\n`
          }
        }
      }
      return `<div class="SchemaContainer">${ligneAccoladeH}\n${ligne1}\n${ligne2}\n${ligneAccoladeB}</div>`
    } else { // latex
      let latex = '\\begin{tikzpicture}\n'
      if (this.braceT) {
        for (let k = 0; k < this.braceT.length; k++) {
          const brace = this.braceT[k]
          const start = (brace.start - 1) / 2
          const end = (brace.end - 1) / 2
          const texte = brace.text
          if (start != null && end != null && texte != null) {
            latex += `\\draw[decorate,decoration={brace,amplitude=10pt},xshift=0pt,yshift=0pt] (${start},3) -- node[above=10pt] {$${texte}$} (${end},3);\n`
          }
        }
      }
      let start = 0
      for (let k = 0; k < this.top.length; k++) {
        const barre = this.top[k]
        const end = start + barre.length / 2
        latex += `\\draw[fill=${barre.color}] (${start},3) rectangle (${end},2) node[pos=.5] {$${barre.content}$};\n`
        start += barre.length / 2
      }
      start = 0
      for (let k = 0; k < this.bottom.length; k++) {
        const barre = this.bottom[k]
        const end = start + barre.length / 2
        latex += `\\draw[fill=${barre.color}] (${start},2) rectangle (${end},1) node[pos=.5] {$${barre.content}$};\n`
        start += barre.length / 2
      }
      if (this.braceB) {
        for (let k = 0; k < this.braceB.length; k++) {
          const brace = this.braceB[k]
          const start = (brace.start - 1) / 2
          const end = (brace.end - 1) / 2
          const texte = brace.text
          if (start != null && end != null && texte != null) {
            latex += `\\draw[decorate,decoration={brace,mirror,amplitude=10pt},xshift=0pt,yshift=0pt] (${start},1) -- node[below=10pt] {$${texte}$} (${end},1);\n`
          }
        }
      }
      latex += '\\end{tikzpicture}'
      return latex
    }
  }

  /**
   *
   * @param nb1 Le premier facteur (celui de la ligne du haut)
   * @param nb2 Le deuxième facteur (celui de l'accolade)
   * @param precision Le nombre de décimales
   * @returns
   */
  static multiplication (nb1: number, nb2: number, precision: number): SchemaEnBoite {
    const seb = new SchemaEnBoite({
      braceT: [
        {
          start: 1,
          end: 8 + precision * 2,
          text: `${nb2}\\text{ fois}`,
        }
      ],
      top: [
        { color: 'lightgray', length: 2 + precision, content: `$${texNombre(nb1, precision)}$` },
        { color: 'lightgray', length: 3, content: '...' },
        { color: 'lightgray', length: 2 + precision, content: `$${texNombre(nb1, precision)}$` },
      ],
      bottom: [
        { color: 'white', length: 7 + precision * 2, content: '?' },
      ]
    })
    return seb
  }

  /**
 *
 * @param dividende Le dividende (écrit dans la case du dessous)
 * @param nbFois Le diviseur (nombre entier de fois écrit sur l'accolade)
 * @param diviseur Le diviseur (écrit dans les cases du dessus)
 * @param precision nombre de chiffres après la virgule du dividende et du diviseur
 * @returns
 */
  static division (dividende: number | undefined, nbFois: number | undefined, diviseur: number | undefined, precision: number): SchemaEnBoite {
    const seb = new SchemaEnBoite({
      braceT: [
        {
          start: 1,
          end: 8 + 2 * precision,
          text: nbFois == null ? '?' : `\\text{${texNombre(nbFois, 0)} fois}`,
        }
      ],
      top: [
        { color: 'lightgray', length: 2 + precision, content: diviseur == null ? '?' : `$${texNombre(diviseur, precision)}$` },
        { color: 'lightgray', length: 3, content: '...' },
        { color: 'lightgray', length: 2 + precision, content: diviseur == null ? '?' : `$${texNombre(diviseur, precision)}$` },
      ],
      bottom: [
        { color: 'white', length: 7 + 2 * precision, content: dividende == null ? '?' : `$${texNombre(dividende, precision)}$` },
      ]
    })
    return seb
  }

  /**
   *
   * @param nb1 diviseur (est écrit dans les cases du dessus)
   * @param nb2 dividende (est écrit dans la case du dessous, mettre undefined pour avoir un ?)
   * @param nbFois Le nombre de fois écrit sur l'accolade (un string qui peut être égal à '?')
   * @param reste Le reste de la division (un string qui peut être égal à '?')
   * @param precision
   * @returns
   */
  static divisionAvecReste (nb1: number, nb2: number | undefined, nbFois:string, precision: number, reste?: string): SchemaEnBoite {
    const seb = new SchemaEnBoite({
      braceT: [
        {
          start: 1,
          end: 8 + 2 * precision,
          text: `\\text{${nbFois} fois}`,
        }
      ],
      top: [
        { color: 'lightgray', length: 2 + precision, content: `$${texNombre(nb1, precision)}$` },
        { color: 'lightgray', length: 3, content: '...' },
        { color: 'lightgray', length: 2 + precision, content: `$${texNombre(nb1, precision)}$` },
        { color: 'lightgray', length: 2, content: reste ?? '?' }
      ],
      bottom: [
        { color: 'white', length: 9 + 2 * precision, content: nb2 == null ? '?' : `$${texNombre(nb2, precision)}$` },
      ]
    })
    return seb
  }

  /**
 *
 * @param nb1 Le diviseur (écrit dans la case du dessus
 * @param nb2 Le dividende (écrit dans la case du dessous peut être unedfined pour avoir un ?)
 * @param nb3 Le nombre de fois écrit sur l'accolade (un
 * @param precision
 * @param reste
 * @returns
 */
  divisionPartitionAvecReste (nb1: number | undefined, nb2: number | undefined, nb3: number | undefined, precision: number, reste?: string): SchemaEnBoite {
    const seb = new SchemaEnBoite({
      braceT: [
        {
          start: 1,
          end: 8 + 2 * precision,
          text: nb3 == null ? '?' : `\\text{${texNombre(nb3, 0)} fois}`,
        }
      ],
      top: [
        { color: 'lightgray', length: 2 + precision, content: nb1 == null ? '?' : `$${texNombre(nb1, precision)}$` },
        { color: 'lightgray', length: 3, content: '...' },
        { color: 'lightgray', length: 2 + precision, content: nb1 == null ? '?' : `$${texNombre(nb1, precision)}$` },
        { color: 'lightgray', length: 2, content: reste ?? '?' }
      ],
      bottom: [
        { color: 'white', length: 9 + 2 * precision, content: nb2 == null ? '?' : `$${texNombre(nb2, precision)}$` },
      ]
    })
    return seb
  }

  static addition (nb1: number, nb2: number, precision: number): SchemaEnBoite {
    const seb = new SchemaEnBoite({
      top: [
        { color: 'lightgray', length: 2 + precision, content: `$${texNombre(nb1, precision)}$` },
        { color: 'lightgray', length: 2 + precision, content: `$${texNombre(nb2, precision)}$` },
      ],
      bottom: [
        { color: 'white', length: 4 + precision * 2, content: '?' },
      ]
    })
    return seb
  }

  static soustraction (terme1: number | undefined, difference: number | undefined, terme2: number | undefined, precision: number): SchemaEnBoite {
    const seb = new SchemaEnBoite({
      top: [
        { color: 'lightgray', length: 2 + precision, content: terme2 == null ? '?' : `$${texNombre(terme2, precision)}$` },
        { color: 'lightgray', length: 2 + precision, content: difference == null ? '?' : `$${texNombre(difference, precision)}$` },
      ],
      bottom: [
        { color: 'white', length: 4 + precision * 2, content: terme1 == null ? '?' : `$${texNombre(terme1, precision)}$` },
      ]
    })
    return seb
  }
}
