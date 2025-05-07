import { Figure2D } from '../Figures2D'
/**
 * @author Jean-Claude Lhote
 * @param options
 * @returns
 */
export function pacman (
  options?: {
    fillStyle?: string;
    strokeStyle?: string;
    lineWidth?: number;
  }
): Figure2D {
  // Génération du code SVG
  const svgPath = `
        M 0,0
        L 20,0
        A 20,20 0 1,1 0,-20
        Z
    `.trim()
  const codeSvg = `<path d="${svgPath}" fill="${options?.fillStyle || 'none'}" stroke="${options?.strokeStyle || 'black'}" stroke-width="${options?.lineWidth || 1}" />`

  // Génération du code TikZ
  const tikzFill = options?.fillStyle ? `, fill=${options.fillStyle}` : ''
  const tikzStroke = options?.strokeStyle ? `, draw=${options.strokeStyle}` : ''
  const tikzLineWidth = options?.lineWidth ? `, line width=${options.lineWidth}pt` : ''
  const codeTikz = `
        \\draw[${tikzFill}${tikzStroke}${tikzLineWidth}] 
        (0,0) -- (0,1) 
        arc[start angle=90, end angle=360, radius=1cm] -- cycle;
    `.trim()
  return new Figure2D({ codeSvg, codeTikz, width: 2, height: 2 })
}
