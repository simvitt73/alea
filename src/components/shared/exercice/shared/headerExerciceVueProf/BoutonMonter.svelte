<script lang="ts">
  import { exercicesParams, moveExercice } from '../../../../../lib/stores/generalStore'
  interface Props {
    indice: number;
  }

  let { indice }: Props = $props();
  function monter () {
    exercicesParams.update((l) => {
      return moveExercice(l, indice, indice - 1)
    })
  }
</script>

<button onclick={monter} class={indice === 0 ? 'hidden md:invisible' : ''}>
  <i
    class="text-coopmaths-action hover:text-coopmaths-action-lightest dark:text-coopmathsdark-action dark:hover:text-coopmathsdark-action-lightest bx bx-up-arrow-circle"
></i>
</button>
