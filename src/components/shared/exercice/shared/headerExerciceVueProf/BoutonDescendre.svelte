<script lang="ts">
  import { exercicesParams, moveExercice } from '../../../../../lib/stores/generalStore'
  interface Props {
    indice: number;
    indiceLastExercice: number;
  }

  let { indice, indiceLastExercice }: Props = $props();
  function descendre () {
    exercicesParams.update((l) => {
      return moveExercice(l, indice, indice + 1)
    })
  }
</script>

<button
  onclick={descendre}
  class={indice === indiceLastExercice ? 'hidden md:invisible' : ''}
>
  <i
    class="text-coopmaths-action hover:text-coopmaths-action-lightest dark:text-coopmathsdark-action dark:hover:text-coopmathsdark-action-lightest bx bx-down-arrow-circle"
></i>
</button>
