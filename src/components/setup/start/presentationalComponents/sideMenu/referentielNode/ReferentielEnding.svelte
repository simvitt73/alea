<script lang="ts">
  import { run } from 'svelte/legacy';

  import { onDestroy } from 'svelte'
  import {
    isExerciceItemInReferentiel,
    resourceHasMonth,
    resourceHasPlace,
    isTool,
    type JSONReferentielEnding,
    isGeoDynamic
  } from '../../../../../../lib/types/referentiels'
  import katex from 'katex/dist/katex'
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  import { changes, exercicesParams, globalOptions } from '../../../../../../lib/stores/generalStore'
  import type { InterfaceParams } from '../../../../../../lib/types'
  import { isLessThanAMonth } from '../../../../../../lib/types/dates'
  import NoInteractivityIcon from '../../../../../shared/icons/NoInteractivityIcon.svelte'
  import QcmCamIcon from '../../../../../shared/icons/QcmCamIcon.svelte'
  import { mathaleaGenerateSeed } from '../../../../../../lib/mathalea'

  interface Props {
    ending: JSONReferentielEnding;
    nestedLevelCount: number;
    [key: string]: any
  }

  let { ...props }: Props = $props();

  let nomDeExercice: HTMLDivElement = $state()
  let selectedCount: number = $state()
  /* --------------------------------------------------------------
    Gestions des exercices via la liste
   --------------------------------------------------------------- */
  /**
   * Compare un code à UUID courante
   * @param {string} code le code de l'UUID à comparer à l'UUID courante
   * @returns {boolean} `true` si les deux chaînes sont égales
   */
  const compareCodes = (code: string): boolean => {
    return code === props.ending.uuid
  }
  /**
   * Compte le nombre de fois où la ressource a été sélectionnée
   * @returns {number} nb d'occurences
   */
  const countOccurences = (): number => {
    return $exercicesParams.map((item) => item.uuid).filter(compareCodes).length
  }
  // on compte réactivement le nombre d'occurences
  // de l'exercice dans la liste des sélectionnés
  const unsubscribeToExerciceParams = exercicesParams.subscribe(() => {
    selectedCount = countOccurences()
  })

  let endingTitre = $state('')

  run(() => {
    if (isExerciceItemInReferentiel(props.ending)) {
      endingTitre = props.ending.titre
      if (endingTitre.includes('$')) {
        const regexp = /(['$])(.*?)\1/g
        const matchs = endingTitre.match(regexp)
        matchs?.forEach(match => {
          endingTitre = endingTitre.replace(match, katex.renderToString(match.replaceAll('$', '')))
        })
      }
    }
    selectedCount = countOccurences()
  });

  onDestroy(unsubscribeToExerciceParams)

  /**
   * Ajouter l'exercice courant à la liste
   */
  function addToList () {
    const newExercise = {
      uuid: props.ending.uuid,
      alea: mathaleaGenerateSeed(),
      interactif: isGeoDynamic(props.ending) ? '1' : '0'
    } as InterfaceParams
    if (isExerciceItemInReferentiel(props.ending) || isTool(props.ending)) {
      newExercise.id = props.ending.id
    }
    if ($globalOptions.recorder === 'capytale' || $globalOptions.setInteractive === '1') {
      newExercise.interactif = '1'
    }
    exercicesParams.update((list) => [...list, newExercise])
    $changes++
  }
  /**
   * Retirer l'exercice de la liste (si plusieurs occurences
   * la première est retirée)
   */
  function removeFromList () {
    const matchingIndex = $exercicesParams
      .map((item) => item.uuid)
      .findIndex(compareCodes)
    exercicesParams.update((list) => [
      ...list.slice(0, matchingIndex),
      ...list.slice(matchingIndex + 1)
    ])
    $changes--
  }

  /* --------------------------------------------------------------
    Gestions des icônes en début de ligne
   --------------------------------------------------------------- */
  let icon = $state('bxs-message-alt')
  let rotation = $state('-rotate-90')
  let mouseIsOut = $state(true)
  function handleMouseOver () {
    icon = 'bx-trash'
    rotation = 'rotate-0'
    mouseIsOut = false
  }
  function handleMouseOut () {
    icon = 'bxs-message-alt'
    rotation = '-rotate-90'
    mouseIsOut = true
  }
</script>

<!--
  @component
  Composant destiné à afficher les terminaisons des branches d'un référentiel.

  #### Paramètres
  **ending** (_JSONReferentielEnding_) : l'objet représentant la terminaison
  **nestedLevelCount** (_number_) : compteur du niveau d'imbrication (utilisé pour la mise en page)
 -->
<div
  class={`${props.class || ''} w-full flex flex-row mr-4 text-start items-start text-sm text-coopmaths-corpus dark:text-coopmathsdark-corpus bg-coopmaths-canvas-dark dark:bg-coopmathsdark-canvas-dark`}
  style="padding-left: {(props.nestedLevelCount * 2) / 6}rem"
>
  <div
    class="w-full relative inline-flex text-start justify-start items-start hover:bg-coopmaths-action-light dark:hover:bg-coopmathsdark-action-light dark:text-coopmathsdark-action dark:hover:text-coopmathsdark-action-lightest bg-coopmaths-canvas-darkest dark:bg-coopmathsdark-canvas-darkest cursor-pointer"
  >
    <button
      type="button"
      onclick={addToList}
      class="ml-[3px] pl-2 pr-4 bg-coopmaths-canvas-dark dark:bg-coopmathsdark-canvas-dark hover:bg-coopmaths-canvas dark:hover:bg-coopmathsdark-canvas-darkest flex-1"
    >
      <div bind:this={nomDeExercice} class="flex flex-row justify-start">
        {#if isExerciceItemInReferentiel(props.ending)}
          <!-- Exercice MathALÉA -->
          <div
            class="text-start text-coopmaths-corpus dark:text-coopmathsdark-corpus bg-coopmaths-canvas-dark dark:bg-coopmathsdark-canvas-dark hover:bg-coopmaths-canvas dark:hover:bg-coopmathsdark-canvas-darkest"
          >
            <span class="font-bold">{props.ending.id} - </span>{@html endingTitre}
            {#if isLessThanAMonth(props.ending.datePublication)}
              &nbsp;
              <span
                class="tooltip tooltip-bottom tooltip-neutral"
                data-tip="{props.ending.datePublication}"
              >
                <span
                  class="inline-flex flex-wrap items-center justify-center rounded-full bg-coopmaths-warn-dark dark:bg-coopmathsdark-warn-dark text-coopmaths-canvas dark:text-coopmathsdark-canvas text-[0.6rem] px-2 ml-2 font-semibold leading-normal"
                >
                  NEW
                </span>
              </span>
            {/if}
            {#if isLessThanAMonth(props.ending.dateModification)}
              &nbsp;
              <span
                class="tooltip tooltip-bottom tooltip-neutral"
                data-tip="{props.ending.dateModification}"
              >
                <span
                class="tooltip tooltip-bottom tooltip-neutral
                  inline-flex flex-wrap items-center justify-center rounded-full bg-coopmaths-struct-light dark:bg-coopmathsdark-struct-light text-coopmaths-canvas dark:text-coopmathsdark-canvas text-[0.6rem] px-2 ml-2 font-semibold leading-normal"
                >
                  MAJ
                </span>
              </span>
            {/if}
            {#if props.ending.features.qcmcam}
              &nbsp;
              <span
                class="tooltip tooltip-bottom tooltip-neutral"
                data-tip="Export QCM Cam Disponible"
              >
                <QcmCamIcon
                  class="inline-flex h-3 w-3 text-coopmaths-warn-dark dark:text-coopmathsdark-warn-dark fill-coopmaths-warn-dark dark:fill-coopmathsdark-warn-dark stroke-coopmaths-warn-dark dark:stroke-coopmathsdark-warn-dark"
                />
              </span>
            {/if}
            {#if !props.ending.features.interactif?.isActive}
              &nbsp;<span
                class="tooltip tooltip-bottom tooltip-neutral"
                data-tip="Pas d'interactivité"
              >
                <NoInteractivityIcon
                  class="inline-flex h-3 w-3 text-coopmaths-warn-dark dark:text-coopmathsdark-warn-dark fill-coopmaths-warn-dark dark:fill-coopmathsdark-warn-dark stroke-coopmaths-warn-dark dark:stroke-coopmathsdark-warn-dark"
                />
              </span>
            {/if}
          </div>
        {:else if resourceHasPlace(props.ending)}
          <!-- Exercices d'annales -->
          <div class="text-start">
            <span class="font-bold">
              {props.ending.typeExercice.toUpperCase()}
              {#if resourceHasMonth(props.ending)}
                {props.ending.mois}
              {/if}
              {props.ending.annee} {props.ending.lieu}
              {#if props.ending.jour !== undefined}
                [{props.ending.jour === 'J1' ? 'Sujet 1' : 'Sujet 2'}]
              {/if}
              - {props.ending.numeroInitial}
            </span>
            <div class="pl-2">
              {#each props.ending.tags as tag}
                <span
                  class="inline-flex flex-wrap items-center justify-center rounded-full bg-coopmaths-struct-light dark:bg-coopmathsdark-struct-light text-coopmaths-canvas dark:text-coopmathsdark-canvas text-[0.6rem] px-2 py-px leading-snug font-semibold mr-1"
                >
                  {tag}
                </span>
              {/each}
            </div>
          </div>
        {:else if isTool(props.ending)}
          <!-- Outils -->
          <div
            class="text-start text-coopmaths-corpus dark:text-coopmathsdark-corpus bg-coopmaths-canvas-dark dark:bg-coopmathsdark-canvas-dark hover:bg-coopmaths-canvas dark:hover:bg-coopmathsdark-canvas-darkest"
          >
            <span class="font-bold">{props.ending.id} - </span>{props.ending.titre}
          </div>
        {:else}
          <!-- Exercice de la bibliothèque -->
          <div
            class="text-start text-coopmaths-corpus dark:text-coopmathsdark-corpus"
          >
            <span class="font-bold">{props.ending.uuid}</span>
          </div>
        {/if}
      </div>
    </button>

    <!-- Bouton en début de ligne pour visualiser si l'exo est sélectionné,
        combien de fois et pour éventuellement le retirer de la sélection -->
    {#if selectedCount >= 1}
      <button
        type="button"
        class="absolute -left-4 -top-[0.15rem]"
        onmouseover={handleMouseOver}
        onfocus={handleMouseOver}
        onmouseout={handleMouseOut}
        onblur={handleMouseOut}
        onclick={removeFromList}
        onkeydown={removeFromList}
      >
        <i
          class="text-coopmaths-action-light dark:text-coopmathsdark-action-light text-base bx {icon} {rotation}"
></i>
      </button>
    {/if}
    {#if selectedCount >= 2 && mouseIsOut}
      <div
        class="absolute -left-3 -top-0 text-[0.6rem] font-bold text-coopmaths-canvas dark:text-coopmathsdark-canvas-dark"
      >
        {selectedCount}
      </div>
    {/if}
  </div>
</div>
