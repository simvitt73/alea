import { Figure2D } from '../Figures2D'

/**
 * Génère une figure représentant un panneau de fin d'interdiction de doubler.
 * @param options Options pour personnaliser le style du panneau.
 * @returns Une instance de Figure2D représentant un panneau de fin d'interdiction de doubler.
 */
export function finInterdictionDoubler (
  options?: {
    fillStyle?: string; // Couleur de remplissage du cercle (par défaut blanc)
    strokeStyle?: string; // Couleur de la bordure du cercle (par défaut noir)
    lineWidth?: number; // Épaisseur de la bordure
    diagonalColor?: string; // Couleur des diagonales (par défaut gris)
    carColor?: string; // Couleur des voitures (par défaut gris)
  }
): Figure2D {
  // Génération du code SVG
  const circleFill = options?.fillStyle || 'white'
  const circleStroke = options?.strokeStyle || 'black'
  const circleLineWidth = options?.lineWidth || 2
  const diagonalColor = options?.diagonalColor || 'gray'
  const carColor = options?.carColor || 'gray'
  const codeSvg = `
    <circle cx="0" cy="0" r="20" fill="${circleFill}" stroke="${circleStroke}" stroke-width="${circleLineWidth}" />
    <rect x="-12" y="-5" width="8" height="10" fill="${carColor}" />
    <rect x="4" y="-5" width="8" height="10" fill="${carColor}" />
    <line x1="-15" y1="-15" x2="15" y2="15" stroke="${diagonalColor}" stroke-width="2" />
    <line x1="-15" y1="15" x2="15" y2="-15" stroke="${diagonalColor}" stroke-width="2" />
  `.trim()

  // Génération du code TikZ
  const tikzCircleFill = `fill=${circleFill}`
  const tikzCircleStroke = `draw=${circleStroke}`
  const tikzCircleLineWidth = `line width=${circleLineWidth}pt`
  const tikzDiagonalColor = diagonalColor
  const tikzCarColor = carColor
  const codeTikz = `
    \\draw[${tikzCircleFill}, ${tikzCircleStroke}, ${tikzCircleLineWidth}] (0,0) circle (1cm);
    \\fill[${tikzCarColor}] (-0.6,-0.25) rectangle (-0.2,0.25);
    \\fill[${tikzCarColor}] (0.2,-0.25) rectangle (0.6,0.25);
    \\draw[${tikzDiagonalColor}, line width=1pt] (-0.75,-0.75) -- (0.75,0.75);
    \\draw[${tikzDiagonalColor}, line width=1pt] (-0.75,0.75) -- (0.75,-0.75);
  `.trim()

  return new Figure2D({ codeSvg, codeTikz, width: 2, height: 2 })
}
