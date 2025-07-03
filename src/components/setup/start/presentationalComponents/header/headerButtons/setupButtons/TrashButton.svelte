<script lang="ts">
  import ButtonIconTooltip from '../../../../../../shared/forms/ButtonIconTooltip.svelte'

  interface Props {
    trash: () => void;
  }

  let { trash }: Props = $props();
</script>

<ButtonIconTooltip
  icon="bx-trash text-3xl"
  tooltip="Supprimer tous les exercices"
  on:click={trash}
/>
