<script lang="ts">
  import ButtonIconTooltip from '../../../../../../shared/forms/ButtonIconTooltip.svelte'

  interface Props {
    newDataForAll: () => void;
  }

  let { newDataForAll }: Props = $props();
</script>

<ButtonIconTooltip
  icon="bx-refresh text-3xl"
  tooltip="Nouveaux énoncés"
  on:click={newDataForAll}
/>
