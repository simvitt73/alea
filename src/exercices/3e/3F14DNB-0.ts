import { courbe } from '../../lib/2d/courbes'
import { droiteParPointEtPente } from '../../lib/2d/droites'
import { point, tracePoint } from '../../lib/2d/points'
import RepereBuilder from '../../lib/2d/RepereBuilder'
import { labelPoint } from '../../lib/2d/textes'
import { createList } from '../../lib/format/lists'
import { Polynome } from '../../lib/mathFonctions/Polynome'
import { choice, shuffle } from '../../lib/outils/arrayOutils'
import { ecritureAlgebrique, ecritureAlgebriqueSauf1, ecritureParentheseSiNegatif, rienSi1 } from '../../lib/outils/ecritures'
import { texNombre } from '../../lib/outils/texNombre'
import { fixeBordures, mathalea2d } from '../../modules/2dGeneralites'
import FractionEtendue from '../../modules/FractionEtendue'
import { randint } from '../../modules/outils'
import ExerciceBrevetA from '../ExerciceBrevetA'

export const uuid = '68e607'
export const refs = {
  'fr-fr': ['3F14DNB-0'],
  'fr-ch': []
}
export const interactifReady = true
export const interactifType = 'qcm'
export const amcReady = 'true'
export const amcType = 'qcmMono'
export const titre = 'Exercice 5 (Nouvelle Calédonie 12/2023)'
export const dateDePublication = '15/11/2024'

export default class Exercice3F14DNB0 extends ExerciceBrevetA {
  constructor () {
    super()
    this.besoinFormulaireCaseACocher = ['Sujet original', false]
    this.sup = false
    this.besoinFormulaire2CaseACocher = ['Présence possible de nombres négatifs', false]
    this.sup2 = false
    this.nbQuestionsModifiable = true
    this.versionAleatoire()
  }

  private appliquerLesValeurs (a: number, b:number, c:number, d: number, x0: number, x1: number, y0: number) {
    const xSommet = -(c + d) / 2
    const ySommet = (xSommet + c) * (xSommet + d)// c'est forcément un minimum car la on a une fonction en x^2+bx+c
    const xMin = xSommet - 4
    const xMax = xSommet + 4
    const yMin = ySommet - 1
    const yMax = ySommet + 16
    console.log(xSommet, ySommet, c, d)
    const poly = new Polynome({ coeffs: [c * d, (c + d), 1] })
    const rep = new RepereBuilder({ xMin, xMax, yMin, yMax }).setLabelX({ xMin, xMax, dx: 1 }).setLabelY({ yMin, yMax, dy: 1 }).setThickX({ xMin, xMax, dx: 1 }).setThickY({ yMin, yMax, dy: 1 }).setGrille({ grilleX: { dx: 1 }, grilleY: { dy: 1 } }).buildStandard()
    const laCourbe = courbe(poly.fonction, { repere: rep, color: 'red' })
    const dG = droiteParPointEtPente(point(0, b), a, '', 'blue')
    const A = point(x0, a * x0 + b, 'A', 'above left')
    const B = point(x1, a * x1 + b, 'B', 'above left')
    const traces = tracePoint(A, B)
    const labels = labelPoint(A, B)
    const figure = mathalea2d(Object.assign({}, fixeBordures([...rep.objets, laCourbe])), rep.objets, laCourbe)
    const figureCoor = mathalea2d(Object.assign({}, fixeBordures([...rep.objets, laCourbe, dG])), rep.objets, laCourbe, dG, traces, labels)
    const sousListe1 = createList({
      items: [
        `La fonction $f$, dont la représentation graphique est ci-dessous  est-elle une fonction affine ? Justifier votre réponse.<br>${figure}`,
        `À l'aide de ce graphique ci-dessus, compléter, ci-dessous, le tableau de valeurs de la fonction $f$.<br>
        $\\def\\arraystretch{1.2}\\begin{array}{|l|c|c|c|c|c|c|c|}
        \\hline
        ~~~&\\phantom{AB}A\\phantom{AB}&\\phantom{AB}B\\phantom{AB}&\\phantom{AB}C\\phantom{AB}&\\phantom{AB}D\\phantom{AB}&\\phantom{AB}E\\phantom{AB}&\\phantom{AB}F\\phantom{AB}&\\phantom{AB}G\\phantom{AB}\\\\
         \\hline
        1 &x&-3 &-2 &-1 &0&1&2\\\\
         \\hline
        2& f(x)& ${poly.fonction(-3)}& ${poly.fonction(-2)}&\\ldots&\\ldots&\\ldots&\\ldots\\\\
         \\hline
        \\end{array}$<br>`,
        `Parmi les trois formules suivantes, l'une correspond à l'expression de la fonction $f$.<br>
        Elle a été saisie dans la cellule B2 puis étendue dans la cellule C2 du tableau ci-dessus.<br>
        $\\def\\arraystretch{1.2}\\begin{array}{|c|c|c|}
        \\hline
        ${this.sup
         ? `~~=B1${ecritureAlgebrique(poly.fonction(-3) + 3)}~~&=(B1${ecritureAlgebrique(c)})\\times(B1${ecritureAlgebrique(d)})&~=SOMME(B1 : G1)~`
        : shuffle([
`~~=B1${ecritureAlgebrique(poly.fonction(-3) + 3)}~~`, `=(B1${ecritureAlgebrique(c)})\\times(B1${ecritureAlgebrique(d)})`, '~=SOMME(B1 : G1)~'
        ]).join('&')}\\\\
         \\hline
         \\end{array}$<br>
         Noter la bonne formule sur votre copie.`
      ],
      style: 'alpha'
    })
    const sousListe1Corr = createList({
      items: [
        `La fonction $f$ n'est pas affine car une fonction affine est représentée par une droite (voir ci-dessous).<br>${figureCoor}`,
        `Le tableau de valeurs est le suivant :<br>
        $\\def\\arraystretch{1.2}\\begin{array}{|l|c|c|c|c|c|c|c|}
        \\hline
        ~~~&\\phantom{AB}A\\phantom{AB}&\\phantom{AB}B\\phantom{AB}&\\phantom{AB}C\\phantom{AB}&\\phantom{AB}D\\phantom{AB}&\\phantom{AB}E\\phantom{AB}&\\phantom{AB}F\\phantom{AB}&\\phantom{AB}G\\phantom{AB}\\\\
         \\hline
        1 &x&-3 &-2 &-1 &0&1&2\\\\
         \\hline
        2& f(x)& ${poly.fonction(-3)}& ${poly.fonction(-2)}& ${poly.fonction(-1)}& ${poly.fonction(0)}& ${poly.fonction(1)}& ${poly.fonction(2)}\\\\
         \\hline
        \\end{array}$<br>`,
        `La formule correcte est : $=(B1${ecritureAlgebrique(c)})\\times(B1${ecritureAlgebrique(d)})$.`
      ],
      style: 'alpha'
    })

    const sousListe2 = createList({
      items: [
        `Calculer l'image de $${x0}$ par la fonction $g$.`,
        `Calculer $g(${x1})$.`,
        `Déterminer l'antécédent de $${y0}$ par la fonction $g$.`,
        'Tracer, sur le graphique précédent, la représentation graphique de la fonction $g$.'
      ],
      style: 'alpha'
    })
    const antecedent = new FractionEtendue(y0 - b, a)
    const sousListe2Corr = createList({
      items: [
        `$g(${x0}) = ${a}\\times${ecritureParentheseSiNegatif(x0)}${ecritureAlgebrique(b)} = ${a * x0}${ecritureAlgebrique(b)}=${a * x0 + b}$ (point $A$).`,
         `$g(${x1}) = ${a}\\times${ecritureParentheseSiNegatif(x1)}${ecritureAlgebrique(b)}= ${a * x1}${ecritureAlgebrique(b)} = ${a * x1 + b}$ (point $B$).`,
         `On sait que $${a}\\times x ${ecritureAlgebrique(b)}= ${y0}$, donc 
         ${a === 1
        ? `$x =${y0}${ecritureAlgebrique(-b)}= ${texNombre(antecedent.valeurDecimale, 0)}$.`
        : a === -1
            ? `$x=${-y0}${ecritureAlgebrique(b)}= ${texNombre(antecedent.valeurDecimale, 0)}$.`
            : `$x =\\dfrac{${y0}${ecritureAlgebrique(-b)}}{${a}} = ${antecedent.texFraction}= ${texNombre(antecedent.valeurDecimale, 3)}$.`
      }<br>L'antécédent de $${y0}$ par la fonction $g$ est donc $${texNombre(antecedent.valeurDecimale, 3)}$ et on note : $g(${texNombre(antecedent.valeurDecimale, 3)})=${y0}$.`,
        `Le graphique de la fonction $g$ est une droite passant par le point $A(${x0};${a * x0 + b})$ et le point $B(${x1};${a * x1 + b})$.<br>
        En effet, aux questions 2.a et 2.b, on a trouvé les coordonnées de ces deux points.`
      ],
      style: 'alpha'
    })

    const sousListe3 = createList({
      items: [
        `Développer et réduire l'expression $(x${ecritureAlgebrique(c)})(x${ecritureAlgebrique(d)})$.`,
        'Pour quelle(s) valeur(s) de $x$, a-t-on $f(x) = g(x)$ ?'
      ],
      style: 'alpha'
    })
    const sousListe3Corr = createList({
      items: [
        `$(x${ecritureAlgebrique(c)})(x${ecritureAlgebrique(d)}) = x^2${ecritureAlgebrique(c)}x${ecritureAlgebrique(d)}x${ecritureAlgebrique(c * d / Math.abs(d))}\\times ${Math.abs(d)} = x^2${ecritureAlgebriqueSauf1(c + d)}x${ecritureAlgebrique(c * d)}$.`,
        `Par lecture graphique, On a $f(x) = g(x)$ si la droite représentant la fonction $g$ et la courbe représentant la fonction $f$ ont des points d'intersection.<br>
        Sur le graphique ci-dessous, on voit que les points d'intersection sont les points $A$ et le point de coordonnées $(${-A.x};${a * (-A.x) + b})$.<br>
        On en déduit que les solutions de l'équation $f(x) = g(x)$ sont $x=${A.x}$ et $x=${-A.x}$.`
      ],
      style: 'alpha'
    })

    const listePrincipale = createList({
      items: [
        sousListe1,
       `On considère la fonction affine $g$ définie par $g(x) = ${rienSi1(a)}x${ecritureAlgebrique(b)}$.${sousListe2}`,
        `L'expression de la fonction $f$ ci-dessus est $f(x) = (x${ecritureAlgebrique(c)})(x${ecritureAlgebrique(d)})$${sousListe3}.`
      ],
      style: 'nombres'
    })
    const listePrincipaleCorrection = createList({
      items: [
        sousListe1Corr,
        sousListe2Corr,
        sousListe3Corr
      ],
      style: 'nombres'
    })

    this.enonce = listePrincipale
    this.correction = listePrincipaleCorrection
  }

  versionOriginale: () => void = () => {
    this.appliquerLesValeurs(2, 1, 3, -1, -2, 3, 2)
  }

  versionAleatoire: () => void = () => {
    const d = randint(1, 3) * (this.sup2 ? choice([1, -1]) : 1)
    const c = randint(1, 4, [d, -d])
    const a = c + d
    const n = randint(1, 2, [Math.sqrt(Math.abs(c * d))])
    const b = c * d + n ** 2
    const x0 = choice([n, -n])
    const x1 = randint(1, 5, [n, -n]) * (this.sup2 ? choice([1, -1]) : 1)
    const num = randint(1, 5, [-b, b]) * (this.sup2 ? choice([1, -1]) : 1)
    const y0 = b + num
    this.appliquerLesValeurs(a, b, c, d, x0, x1, y0)
  }
}
