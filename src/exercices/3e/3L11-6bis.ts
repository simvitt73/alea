import { choice, combinaisonListes } from '../../lib/outils/arrayOutils'
import { miseEnEvidence } from '../../lib/outils/embellissements'
import {
  ecritureAlgebrique,
  reduireAxPlusB,
  rienSi1,
} from '../../lib/outils/ecritures'
import { lettreDepuisChiffre } from '../../lib/outils/outilString'
import Exercice from '../Exercice'
import { context } from '../../modules/context'
import {
  listeQuestionsToContenuSansNumero,
  randint,
} from '../../modules/outils'

import { handleAnswers } from '../../lib/interactif/gestionInteractif'
import { ajouteChampTexteMathLive } from '../../lib/interactif/questionMathLive'
import { KeyboardType } from '../../lib/interactif/claviers/keyboard'

export const titre = 'Factoriser une expression complexe (bis)'
export const interactifReady = true
export const interactifType = 'mathLive'
export const dateDePublication = '01/02/2026'

/**
 * Factoriser avec un facteur commun évident :
 *   - (ax+b)² ± (ax+b)(cx+d)
 *   - (ax+b) ± (ax+b)(cx+d)
 * Un paramètre permet d'activer ou non le signe moins entre les deux termes.
 * @author …
 */
export const uuid = '51361'

export const refs = {
  'fr-fr': ['3L11-6bis'],
}

export default class FactoriserUneExpression3eBis extends Exercice {
  constructor() {
    super()

    // Paramètre 1 : type d'expressions proposées
    this.besoinFormulaireNumerique = [
      'Types d\'expressions',
      2,
      '1 : (ax+b)² ± (ax+b)(cx+d) uniquement\n2 :  (ax+b) ± (ax+b)(cx+d)',
    ]

    // Paramètre 2 : signe moins activé ?
    this.besoinFormulaire2Numerique = [
      'Signe moins',
      1,
      '1 : Non\n2 : Oui)',
    ]

    this.nbQuestions = 5
    this.nbCols = 2
    this.nbColsCorr = 2
    this.sup = 2   // par défaut : mélange
    this.sup2 = 1  // par défaut : pas de moins
    this.correctionDetailleeDisponible = true
    this.correctionDetaillee = true
    this.spacing = context.isHtml ? 3 : 2
    this.spacingCorr = context.isHtml ? 3 : 2
    this.listeAvecNumerotation = false
  }

  nouvelleVersion() {
    this.consigne =
      this.nbQuestions > 1
        ? 'Factoriser les expressions suivantes.'
        : "Factoriser l'expression suivante."

    // ── Construction de la liste des types disponibles ──────────────────────
    // this.sup  : 1 = carré seulement, 2 = mélange (carré + terme seul)
    // this.sup2 : 1 = + uniquement,    2 = + ou − aléatoirement
    const typesDisponibles: string[] = []

    // Type A : (ax+b)² ± (ax+b)(cx+d)  — toujours disponible
    if (this.sup === 1) {
      if (this.sup2 === 1) {
                typesDisponibles.push('(ax+b)^2+(ax+b)(cx+d)')
      }
      else {
        typesDisponibles.push('(ax+b)^2-(ax+b)(cx+d)')
      }
    } 

    // Type B : (ax+b) ± (ax+b)(cx+d) 

    if (this.sup === 2) {
      if (this.sup2 === 1) {
                typesDisponibles.push('(ax+b)+(ax+b)(cx+d)')
      }
      else {
        typesDisponibles.push('(ax+b)-(ax+b)(cx+d)')
      }
    } 

    const listeTypeDeQuestions = combinaisonListes(
      typesDisponibles,
      this.nbQuestions,
    )

    for (
      let i = 0, texte, texteCorr, a, b, c, d, cpt = 0;
      i < this.nbQuestions && cpt < 50;

    ) {
      texte = ''
      texteCorr = ''

      // ── Génération des coefficients ──────────────────────────────────────
      a = randint(1, 3)
      b = randint(1, 5) * choice([-1, 1])
      c = randint(2, 5)
      d = randint(2, 5, c) * choice([-1, 1]) // |d| ≠ c

      // ── Guard : pour le cas A−, le second facteur ne doit pas être nul ───
      // (a-c)x+(b-d) = 0 ⟺ a=c et b=d
      if (
        listeTypeDeQuestions[i] === '(ax+b)^2-(ax+b)(cx+d)' &&
        a === c &&
        b === d
      ) {
        cpt++
        continue
      }

      switch (listeTypeDeQuestions[i]) {
        // ════════════════════════════════════════════════════════════════════
        // TYPE A+ : (ax+b)² + (ax+b)(cx+d)  →  (ax+b)((a+c)x + (b+d))
        // ════════════════════════════════════════════════════════════════════
        case '(ax+b)^2+(ax+b)(cx+d)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${rienSi1(a)}x${ecritureAlgebrique(b)})^2+(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `<br>On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            // Étape 1 : mettre en évidence les facteurs
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')', 'blue')}+${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}$`
            // Étape 2 : factoriser
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + '+' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}$`
            // Étape 3 : simplifier le second facteur
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(a + c) + 'x' + ecritureAlgebrique(b + d) + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(a + c)}x${ecritureAlgebrique(b + d)})$<br>`
          }
          handleAnswers(this, i, {
            reponse: {
              value: `(${reduireAxPlusB(a + c, b + d)})(${reduireAxPlusB(a, b)})`,
              options: { factorisation: true },
            },
          })
          break

        // ════════════════════════════════════════════════════════════════════
        // TYPE A− : (ax+b)² − (ax+b)(cx+d)  →  (ax+b)((a−c)x + (b−d))
        // ════════════════════════════════════════════════════════════════════
        case '(ax+b)^2-(ax+b)(cx+d)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${rienSi1(a)}x${ecritureAlgebrique(b)})^2-(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `<br>On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            // Étape 1 : écrire le carré comme produit, mettre en évidence
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')', 'blue')}-${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}$`
            // Étape 2 : factoriser avec parenthèse de différence
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + '-(' + c + 'x' + ecritureAlgebrique(d) + '))', 'blue')}$`
            // Étape 3 : distribuer le moins
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + '-' + c + 'x' + ecritureAlgebrique(-d) + ')', 'blue')}$`
            // Étape 4 : regrouper
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(a - c) + 'x' + ecritureAlgebrique(b - d) + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(a - c)}x${ecritureAlgebrique(b - d)})$<br>`
          }
          handleAnswers(this, i, {
            reponse: {
              value: `(${reduireAxPlusB(a - c, b - d)})(${reduireAxPlusB(a, b)})`,
              options: { factorisation: true },
            },
          })
          break

        // ════════════════════════════════════════════════════════════════════
        // TYPE B+ : (ax+b) + (ax+b)(cx+d)  →  (ax+b)(cx + (d+1))
        // ════════════════════════════════════════════════════════════════════
        case '(ax+b)+(ax+b)(cx+d)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${rienSi1(a)}x${ecritureAlgebrique(b)})+(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `<br>On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            // Étape 1 : rendre explicite le facteur 1
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('1', 'blue')}+${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}$`
            // Étape 2 : factoriser
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(1+' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}$`
            // Étape 3 : réordonner et simplifier
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d + 1) + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d + 1)})$<br>`
          }
          handleAnswers(this, i, {
            reponse: {
              value: `(${reduireAxPlusB(c, d + 1)})(${reduireAxPlusB(a, b)})`,
              options: { factorisation: true },
            },
          })
          break

        // ════════════════════════════════════════════════════════════════════
        // TYPE B− : (ax+b) − (ax+b)(cx+d)  →  (ax+b)(−cx + (1−d))
        // ════════════════════════════════════════════════════════════════════
        case '(ax+b)-(ax+b)(cx+d)':
          texte = `$${lettreDepuisChiffre(i + 1)}=(${rienSi1(a)}x${ecritureAlgebrique(b)})-(${rienSi1(a)}x${ecritureAlgebrique(b)})(${c}x${ecritureAlgebrique(d)})$`
          texteCorr = texte
          if (this.correctionDetaillee) {
            texteCorr += `<br>On remarque que $(${rienSi1(a)}x${ecritureAlgebrique(b)})$ est un facteur commun.`
            // Étape 1 : rendre explicite le facteur 1
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('1', 'blue')}-${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + c + 'x' + ecritureAlgebrique(d) + ')', 'blue')}$`
            // Étape 2 : factoriser avec parenthèse de différence
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(1-(' + c + 'x' + ecritureAlgebrique(d) + '))', 'blue')}$`
            // Étape 3 : distribuer le moins
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(1-' + c + 'x' + ecritureAlgebrique(-d) + ')', 'blue')}$`
            // Étape 4 : réordonner et simplifier
            texteCorr += `<br>$${lettreDepuisChiffre(i + 1)}=${miseEnEvidence('(' + rienSi1(a) + 'x' + ecritureAlgebrique(b) + ')')}${miseEnEvidence('(' + rienSi1(-c) + 'x' + ecritureAlgebrique(1 - d) + ')', 'blue')}$<br>`
          } else {
            texteCorr += `<br>$\\phantom{ABC}=(${rienSi1(a)}x${ecritureAlgebrique(b)})(${rienSi1(-c)}x${ecritureAlgebrique(1 - d)})$<br>`
          }
          handleAnswers(this, i, {
            reponse: {
              value: `(${reduireAxPlusB(-c, 1 - d)})(${reduireAxPlusB(a, b)})`,
              options: { factorisation: true },
            },
          })
          break
      }

      texte += ajouteChampTexteMathLive(
        this,
        i,
        KeyboardType.clavierDeBaseAvecVariable,
        { texteAvant: `<br>$${lettreDepuisChiffre(i + 1)} = $` },
      )

      if (this.questionJamaisPosee(i, a, b, c, d)) {
        this.listeQuestions[i] = texte
        this.listeCorrections[i] = texteCorr
        i++
      }
      cpt++
    }
    listeQuestionsToContenuSansNumero(this)
  }
}