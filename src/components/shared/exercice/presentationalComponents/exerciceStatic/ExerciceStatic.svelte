<script lang="ts">
  import HeaderExerciceVueProf from '../../shared/headerExerciceVueProf/HeaderExerciceVueProf.svelte'
  import { retrieveResourceFromUuid } from '../../../../../lib/components/refUtils'
  import {
    resourceHasPlace,
    isStaticType,
    type JSONReferentielObject,
    isCrpeType
  } from '../../../../../lib/types/referentiels'
  /**
   * Gestion du référentiel pour la recherche de l'uuid
   */
  import referentielStaticFR from '../../../../../json/referentielStaticFR.json'
  import referentielStaticCH from '../../../../../json/referentielStaticCH.json'

  import referentielBibliotheque from '../../../../../json/referentielBibliotheque.json'
  import type { HeaderProps } from '../../../../../lib/types/ui'
  import Exercice from '../../Exercice.svelte'
  // on rassemble les deux référentiel statique
  const allStaticReferentiels: JSONReferentielObject = {
    ...referentielBibliotheque,
    ...referentielStaticFR,
    ...referentielStaticCH
  }
  // on supprime les entrées par thème qui entraîne des doublons
  delete allStaticReferentiels['Brevet des collèges par thème - APMEP']
  delete allStaticReferentiels['BAC par thème - APMEP']
  delete allStaticReferentiels['CRPE (2015-2019) par thème - COPIRELEM']
  delete allStaticReferentiels['CRPE (2022-2023) par thème']
  delete allStaticReferentiels['E3C par thème - APMEP']
  delete allStaticReferentiels['EVACOM par thème']

  export let uuid: string
  export let indiceExercice: number
  export let indiceLastExercice: number
  export let zoomFactor: string
  export let isSolutionAccessible: boolean
  const foundResource = retrieveResourceFromUuid(allStaticReferentiels, uuid)
  interface ResourceToDisplay {
    png: string
    pngCor: string
    tex: string
    texCor: string
    typeExercice: 'static' | 'dnb' | 'bac' | 'e3c' | 'evacom'
    uuid: string
    tags: string[]
    titre?: string
    difficulte?: string
    texIndice?: string
    pngIndice?: string
    texReponse?: string
    pngReponse?: string
    texSolution?: string
    pngSolution?: string
  }
  const resourceToDisplay: ResourceToDisplay | null =
    isStaticType(foundResource) || isCrpeType(foundResource)
      ? { ...foundResource }
      : null
  interface Exercice {
    png: string[]
    pngCor: string[]
    difficulty?: string
    titre?: string
    tex?: string
    texCor?: string
    texIndice?: string
    pngIndice?: string
    texReponse?: string
    pngReponse?: string
    texSolution?: string
    pngSolution?: string
  }
  const exercice: Exercice | null =
    resourceToDisplay === null
      ? null
      : {
          png:
            typeof resourceToDisplay.png === 'string'
              ? [resourceToDisplay.png]
              : resourceToDisplay.png,
          pngCor:
            typeof resourceToDisplay.pngCor === 'string'
              ? [resourceToDisplay.pngCor]
              : resourceToDisplay.pngCor
        }
  if (resourceToDisplay !== null && exercice !== null) {
    if (resourceToDisplay.titre !== undefined) {
      exercice.titre = resourceToDisplay.titre
    }
    if (resourceToDisplay.difficulte !== undefined) {
      exercice.difficulty = resourceToDisplay.difficulte
    }
    if (resourceToDisplay.pngIndice !== undefined) {
      exercice.pngIndice = resourceToDisplay.pngIndice
    }
    if (resourceToDisplay.texIndice !== undefined) {
      exercice.texIndice = resourceToDisplay.texIndice
    }
    if (resourceToDisplay.pngSolution !== undefined) {
      exercice.pngSolution = resourceToDisplay.pngSolution
    }
    if (resourceToDisplay.texSolution !== undefined) {
      exercice.texSolution = resourceToDisplay.texSolution
    }
    if (resourceToDisplay.pngReponse !== undefined) {
      exercice.pngReponse = resourceToDisplay.pngReponse
    }
    if (resourceToDisplay.texReponse !== undefined) {
      exercice.texReponse = resourceToDisplay.texReponse
    }
    if (resourceToDisplay.tex !== undefined) {
      exercice.tex = resourceToDisplay.tex
    }
    if (resourceToDisplay.texCor !== undefined) {
      exercice.texCor = resourceToDisplay.texCor
    }
  }
  let isCorrectionVisible = false
  let isContentVisible = true
  let headerExerciceProps: HeaderProps
  if (resourceToDisplay !== null) {
    headerExerciceProps = {
      title: exercice?.titre ?? '',
      id: '',
      isInteractif: false,
      settingsReady: false,
      isSettingsVisible: false,
      interactifReady: false,
      indiceExercice,
      indiceLastExercice,
      randomReady: false,
      correctionReady: isSolutionAccessible
    }
    if (resourceHasPlace(resourceToDisplay)) {
      headerExerciceProps.title = `${resourceToDisplay.typeExercice.toUpperCase()} ${
        resourceToDisplay.mois || ''
      } ${resourceToDisplay.annee} ${resourceToDisplay.lieu} - ${resourceToDisplay.numeroInitial}`
    } else if (resourceToDisplay.titre == null || resourceToDisplay.titre === '') {
      headerExerciceProps.title = resourceToDisplay.uuid
    }
  }

  let noCorrectionAvailable = false

  function handleNoCorrectionAvailable () {
    noCorrectionAvailable = true
  }

</script>

<HeaderExerciceVueProf
  {...headerExerciceProps}
  {indiceExercice}
  {indiceLastExercice}
  on:clickCorrection={(event) => {
    isCorrectionVisible = event.detail.isCorrectionVisible
  }}
  on:clickVisible={(event) => {
    isContentVisible = event.detail.isVisible
    isCorrectionVisible = event.detail.isVisible
  }}
  on:exerciseRemoved
/>

<div class="p-4">
  {#if isContentVisible}
    {#if exercice}
      {#each exercice.png as url}
        <img src={url} style="width: calc(100% * {zoomFactor}" alt="énoncé" />
      {/each}
    {/if}
  {/if}

  {#if isCorrectionVisible}
    <div
      class="relative border-l-coopmaths-struct dark:border-l-coopmathsdark-struct border-l-[3px] text-coopmaths-corpus dark:text-coopmathsdark-corpus mt-6 lg:mt-2 mb-6 py-2 pl-4"
      id="correction{indiceExercice}"
    >
      <div class="container">
        {#if exercice}
          {#each exercice.pngCor as url}
            {#if noCorrectionAvailable}
              <p class="text-red-500">Aucune correction disponible</p>
            {:else}
              <img
                src={url}
                class="p-2"
                style="width: calc(100% * {zoomFactor}"
                alt="correction"
                on:error={handleNoCorrectionAvailable}
              />
            {/if}
          {/each}
        {/if}
      </div>
      <!-- <div class="absolute border-coopmaths-struct dark:border-coopmathsdark-struct top-0 left-0 border-b-[3px] w-10" /> -->
      <div
        class="absolute flex flex-row py-[1.5px] px-3 rounded-t-md justify-center items-center -left-[3px] -top-[15px] bg-coopmaths-struct dark:bg-coopmathsdark-struct font-semibold text-xs text-coopmaths-canvas dark:text-coopmathsdark-canvas"
      >
        Correction
      </div>
      <div
        class="absolute border-coopmaths-struct dark:border-coopmathsdark-struct bottom-0 left-0 border-b-[3px] w-4"
      />
    </div>
  {/if}
</div>
