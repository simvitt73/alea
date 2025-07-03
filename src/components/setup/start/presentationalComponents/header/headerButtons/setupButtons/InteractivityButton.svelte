<script lang="ts">
  import TwoStatesIcon from '../../../../../../../components/shared/icons/TwoStatesIcon.svelte'

  interface Props {
    setAllInteractive: (isAllInteractive: boolean) => void;
  }

  let { setAllInteractive }: Props = $props();
  let isAllInteractive: boolean = $state(false)

</script>

<button
  type="button"
  onclick={() => {
    isAllInteractive = !isAllInteractive
    setAllInteractive(isAllInteractive)
  }}
  class="tooltip tooltip-bottom tooltip-neutral"
  data-tip={isAllInteractive
    ? "Supprimer l'interactivité"
    : 'Tous les exercices en interactif'}
>
  <div class="px-2">
    <TwoStatesIcon
      isOnStateActive={isAllInteractive}
      size={7}
    />
  </div>
</button>
