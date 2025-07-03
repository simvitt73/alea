<script lang="ts">
  import { run } from 'svelte/legacy';

  import { onDestroy, onMount } from 'svelte'
  import HeaderExerciceVueProf from '../../shared/headerExerciceVueProf/HeaderExerciceVueProf.svelte'
  import type TypeExercice from '../../../../../exercices/Exercice'
  import HeaderExerciceVueEleve from '../shared/HeaderExerciceVueEleve.svelte'
  import type { VueType } from '../../../../../lib/types'
  import { globalOptions, isMenuNeededForExercises } from '../../../../../lib/stores/generalStore'
  interface Props {
    vue: VueType | undefined;
    exercise: TypeExercice;
    indiceExercice: number;
    indiceLastExercice: number;
  }

  let {
    vue,
    exercise,
    indiceExercice,
    indiceLastExercice
  }: Props = $props();

  let divExercice: HTMLDivElement = $state()

  const headerExerciceProps = $state({
    title: exercise.titre,
    id: '',
    indiceExercice,
    indiceLastExercice,
    interactifReady: false,
    randomReady: false,
    settingsReady: false,
    correctionReady: false,
    isHidable: false
  })

  onMount(async () => {
    if (exercise.html != null) {
      divExercice.appendChild(exercise.html)
    }
    const exercicesAffiches = new window.Event('addedToDom', { bubbles: true })
    divExercice.children[0].dispatchEvent(exercicesAffiches)
  })

  onDestroy(() => {
    if (exercise.destroy != null) {
      exercise.destroy()
    }
  })

  run(() => {
    headerExerciceProps.indiceExercice = indiceExercice
    headerExerciceProps.indiceLastExercice = indiceLastExercice
  });
</script>

{#if vue === 'eleve'}
  <HeaderExerciceVueEleve
    {...headerExerciceProps}
    isMenuNeededForExercises={$isMenuNeededForExercises}
    presMode={$globalOptions.presMode ?? 'liste_exos'}
  />
{:else}
  <HeaderExerciceVueProf {...headerExerciceProps} on:exerciseRemoved/>
{/if}
<section id="insert-html-{indiceExercice}" class="mt-6 mb-2 ml-2 lg:mx-5">
  <div bind:this={divExercice}></div>
</section>
