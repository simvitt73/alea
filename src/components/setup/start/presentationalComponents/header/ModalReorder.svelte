<script lang="ts">
  import ChipsList from '../../../../shared/ui/ChipsList.svelte'
  import { fly, blur } from 'svelte/transition'

  interface Props {
    reorderModalDisplayed: boolean;
  }

  let { reorderModalDisplayed = $bindable() }: Props = $props();

</script>

{#if reorderModalDisplayed}
  <div
  in:fly|global={{ y: -1000 }} out:blur|global
    id="exoChipsList"
    class="z-[1090] fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-2/3 flex flex-row justify-start items-center p-8 rounded-md shadow-2xl bg-coopmaths-canvas-dark dark:bg-coopmathsdark-canvas-dark p"
  >
    <ChipsList bind:chipsListDisplayed={reorderModalDisplayed}/>
  </div>
{/if}
