<script lang="ts">
  import ExerciceMathaleaVueEleve from './exerciceMathaleaVueEleve/ExerciceMathaleaVueEleve.svelte'
  import ExerciceMathaleaVueProf from './exerciceMathaleaVueProf/ExerciceMathaleaVueProf.svelte'
  import type TypeExercice from '../../../../exercices/Exercice'

  interface Props {
    vue: ('prof' | 'eleve');
    exercise: TypeExercice;
    exerciseIndex: number;
    indiceLastExercice: number;
    isCorrectionVisible?: boolean;
  }

  let {
    vue,
    exercise,
    exerciseIndex,
    indiceLastExercice,
    isCorrectionVisible = false
  }: Props = $props();

</script>

{#if vue === 'prof'}
<ExerciceMathaleaVueProf
  {exercise}
  {exerciseIndex}
  {indiceLastExercice}
  {isCorrectionVisible}
  on:exerciseRemoved
/>
{:else if vue === 'eleve'}
<ExerciceMathaleaVueEleve
  {exercise}
  {exerciseIndex}
  {indiceLastExercice}
  {isCorrectionVisible}
/>
{/if}
