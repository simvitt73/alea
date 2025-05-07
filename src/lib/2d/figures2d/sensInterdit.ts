import { Figure2D } from '../Figures2D'

/**
 * Génère une figure représentant un panneau de sens interdit.
 * @param options Options pour personnaliser le style du panneau.
 * @returns Une instance de Figure2D représentant un panneau de sens interdit.
 */
export function sensInterdit (
  options?: {
    fillStyle?: string; // Couleur de remplissage du cercle rouge
    strokeStyle?: string; // Couleur de la bordure du cercle
    lineWidth?: number; // Épaisseur de la bordure
  }
): Figure2D {
  // Génération du code SVG
  const circleFill = options?.fillStyle || 'red'
  const circleStroke = options?.strokeStyle || 'red'
  const circleLineWidth = options?.lineWidth || 2
  const svgPath = `
        <circle cx="0" cy="0" r="20" fill="${circleFill}" stroke="black" stroke-width="1" />
        <circle cx="0" cy="0" r="18" fill="${circleFill}" stroke="${circleStroke}" stroke-width="0" />
        <rect x="-13" y="-3.5" width="26" height="7" fill="white" />
    `.trim()
  const codeSvg = `${svgPath}`

  // Génération du code TikZ
  const tikzCircleFill = `fill=${circleFill}`
  const tikzCircleStroke = `draw=${circleStroke}`
  const tikzCircleLineWidth = `line width=${circleLineWidth}pt`
  const codeTikz = `
     \\draw[ draw=black, line width=1pt] (0,0) circle (1cm);
   \\draw[${tikzCircleFill}, ${tikzCircleStroke}, ${tikzCircleLineWidth}] (0,0) circle (0.95cm);
    \\fill[white] (-0.75, -0.125) rectangle (0.75, 0.125);
  `.trim()

  return new Figure2D({ codeSvg, codeTikz, width: 2, height: 2 })
}
