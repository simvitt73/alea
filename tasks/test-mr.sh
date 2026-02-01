#!/bin/bash
# Script pour tester les merge requests ouverts
# Usage: ./tasks/test-mr.sh

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "========================================"
echo "  Testeur de Merge Requests - MathALÉA"
echo "========================================"
echo ""

# Vérifier que glab est installé
if ! command -v glab &> /dev/null; then
    echo -e "${RED}Erreur: glab n'est pas installé${NC}"
    echo "Installez-le avec: brew install glab"
    exit 1
fi

# Récupérer les MRs ouverts
echo "Récupération des merge requests ouverts..."
echo ""

# Sauvegarder les MRs dans un fichier temporaire
TEMP_FILE=$(mktemp)
glab mr list 2>&1 > "$TEMP_FILE"

# Compter le nombre de MRs
MR_COUNT=$(grep -c "^!" "$TEMP_FILE" 2>/dev/null || echo "0")

if [ "$MR_COUNT" -eq "0" ]; then
    echo -e "${YELLOW}Aucun merge request ouvert trouvé.${NC}"
    rm "$TEMP_FILE"
    exit 0
fi

echo -e "${BLUE}Merge requests ouverts:${NC}"
echo ""

# Afficher la liste avec des numéros
declare -a MR_NUMBERS
declare -a MR_BRANCHES
declare -a MR_TITLES

i=1
while IFS= read -r line; do
    if [[ $line =~ ^!([0-9]+) ]]; then
        MR_NUM="${BASH_REMATCH[1]}"
        # Extraire la branche source (entre parenthèses après la flèche)
        if [[ $line =~ \←\ \(([a-zA-Z0-9_-]+)\) ]]; then
            BRANCH="${BASH_REMATCH[1]}"
            # Extraire le titre (entre le numéro et (main))
            TITLE=$(echo "$line" | sed -E 's/![0-9]+[[:space:]]+//; s/\(main\).*//; s/^[[:space:]]*//; s/[[:space:]]*$//')
            
            MR_NUMBERS+=($MR_NUM)
            MR_BRANCHES+=($BRANCH)
            MR_TITLES+=("$TITLE")
            
            printf "%2d. !%-5s %-50s → %s\n" $i "$MR_NUM" "${TITLE:0:50}" "$BRANCH"
            ((i++))
        fi
    fi
done < "$TEMP_FILE"

rm "$TEMP_FILE"

echo ""
echo -e "${BLUE}0.  all${NC} - Tester toutes les branches"
echo ""

# Demander le choix
read -p "Entrez le numéro de la branche à tester (ou 0 pour 'all', ou 'q' pour quitter): " CHOICE

if [ "$CHOICE" = "q" ] || [ "$CHOICE" = "Q" ]; then
    echo "Abandon."
    exit 0
fi

# Fonction pour merger une branche
merge_branch() {
    local mr_num=$1
    local title=$2
    
    echo ""
    echo -e "${YELLOW}Lancer le merge pour !${mr_num}?${NC}"
    read -p "Voulez-vous merger cette branche maintenant ? (O/N): " MERGE_CHOICE
    
    if [ "$MERGE_CHOICE" = "O" ] || [ "$MERGE_CHOICE" = "o" ] || [ "$MERGE_CHOICE" = "Y" ] || [ "$MERGE_CHOICE" = "y" ]; then
        echo ""
        echo -e "${BLUE}Merging !${mr_num}...${NC}"
        if glab mr merge "!${mr_num}" --yes 2>&1; then
            echo -e "${GREEN}✓ Merge réussi pour !${mr_num}${NC}"
            return 0
        else
            echo -e "${RED}✗ Échec du merge pour !${mr_num}${NC}"
            echo "  (Le merge peut échouer si des conditions ne sont pas remplies sur GitLab)"
            return 1
        fi
    else
        echo "Merge annulé."
        return 0
    fi
}

# Fonction pour tester une branche
test_branch() {
    local branch=$1
    local mr_num=$2
    local title=$3
    local auto_merge=${4:-false}
    
    echo ""
    echo "========================================"
    echo -e "${BLUE}Testing: !${mr_num} - ${title}${NC}"
    echo -e "${BLUE}Branch: ${branch}${NC}"
    echo "========================================"
    echo ""
    
    # Vérifier si la branche existe en local
    if ! git show-ref --verify --quiet "refs/remotes/origin/${branch}"; then
        echo -e "${YELLOW}Branche ${branch} non trouvée en local, fetch...${NC}"
        git fetch origin "$branch" || {
            echo -e "${RED}Erreur: Impossible de fetch la branche ${branch}${NC}"
            return 1
        }
    fi
    
    # Stash les changements actuels s'il y en a
    local STASHED=false
    if ! git diff --quiet HEAD 2>/dev/null; then
        echo "Changements locaux détectés, stash..."
        git stash push -m "Auto-stash before testing MR !${mr_num}"
        STASHED=true
    fi
    
    # Checkout la branche
    echo "Checkout de la branche ${branch}..."
    git checkout "$branch" || {
        echo -e "${RED}Erreur: Impossible de checkout ${branch}${NC}"
        if [ "$STASHED" = true ]; then
            git stash pop
        fi
        return 1
    }
    
    # Merge main dans la branche pour simuler ce que ferait le MR
    echo "Merge de main dans ${branch}..."
    git pull origin main --no-rebase 2>/dev/null || echo "(main déjà à jour ou pas de changements)"
    
    echo ""
    echo "Installation des dépendances..."
    pnpm install 2>&1 | tail -5
    
    # Tests unitaires
    echo ""
    echo -e "${BLUE}=== Tests unitaires ===${NC}"
    if pnpm test:unit 2>&1; then
        echo -e "${GREEN}✓ Tests unitaires: OK${NC}"
        UNIT_TESTS_PASSED=true
    else
        echo -e "${RED}✗ Tests unitaires: ÉCHEC${NC}"
        UNIT_TESTS_PASSED=false
    fi
    
    echo ""
    echo -e "${BLUE}=== Tests src ===${NC}"
    if pnpm test:src 2>&1; then
        echo -e "${GREEN}✓ Tests src: OK${NC}"
        SRC_TESTS_PASSED=true
    else
        echo -e "${RED}✗ Tests src: ÉCHEC${NC}"
        SRC_TESTS_PASSED=false
    fi
    
    # Build
    echo ""
    echo -e "${BLUE}=== Build ===${NC}"
    if NODE_OPTIONS=--max-old-space-size=4096 pnpm run makeJson && pnpm vite build 2>&1 | tail -20; then
        echo -e "${GREEN}✓ Build: OK${NC}"
        BUILD_PASSED=true
    else
        echo -e "${RED}✗ Build: ÉCHEC${NC}"
        BUILD_PASSED=false
    fi
    
    # Retour sur la branche principale
    echo ""
    echo "Retour sur la branche principale..."
    git checkout main 2>/dev/null || git checkout - 2>/dev/null || true
    
    # Pop le stash si nécessaire
    if [ "$STASHED" = true ]; then
        git stash pop
    fi
    
    # Résumé
    echo ""
    echo "========================================"
    echo -e "${BLUE}RÉSULTATS pour !${mr_num}:${NC}"
    echo "========================================"
    if [ "$UNIT_TESTS_PASSED" = true ] && [ "$SRC_TESTS_PASSED" = true ] && [ "$BUILD_PASSED" = true ]; then
        echo -e "${GREEN}✓ PRÊT POUR MERGE${NC}"
        # Demander pour merger si mode "all" ou demander toujours
        if [ "$auto_merge" = true ]; then
            merge_branch "$mr_num" "$title"
        fi
        return 0
    else
        echo -e "${RED}✗ CONTIENT DES ERREURS${NC}"
        [ "$UNIT_TESTS_PASSED" = false ] && echo "  - Tests unitaires"
        [ "$SRC_TESTS_PASSED" = false ] && echo "  - Tests src"
        [ "$BUILD_PASSED" = false ] && echo "  - Build"
        return 1
    fi
}

# Tester une seule branche ou toutes
if [ "$CHOICE" = "0" ] || [ "$CHOICE" = "all" ]; then
    echo ""
    echo "Lancement des tests sur toutes les branches..."
    echo "⚠️  Cela va prendre du temps (~$((${#MR_BRANCHES[@]} * 5)) minutes)"
    echo ""
    
    PASSED=0
    FAILED=0
    
    for idx in "${!MR_BRANCHES[@]}"; do
        if test_branch "${MR_BRANCHES[$idx]}" "${MR_NUMBERS[$idx]}" "${MR_TITLES[$idx]}" true; then
            ((PASSED++))
        else
            ((FAILED++))
        fi
        echo ""
    done
    
    # Résumé final
    echo ""
    echo "========================================"
    echo "  RÉSUMÉ FINAL"
    echo "========================================"
    echo -e "${GREEN}Branches OK: ${PASSED}${NC}"
    echo -e "${RED}Branches avec erreurs: ${FAILED}${NC}"
    echo ""
    
else
    # Convertir en index (1-based)
    IDX=$((CHOICE - 1))
    
    if [ "$IDX" -lt "0" ] || [ "$IDX" -ge "${#MR_BRANCHES[@]}" ]; then
        echo -e "${RED}Choix invalide.${NC}"
        exit 1
    fi
    
    test_branch "${MR_BRANCHES[$IDX]}" "${MR_NUMBERS[$IDX]}" "${MR_TITLES[$IDX]}" true
fi
