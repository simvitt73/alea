<script lang="ts">
  import ButtonIconTooltip from '../../../../../../shared/forms/ButtonIconTooltip.svelte'
  interface Props {
    reorderModalDisplayed: boolean;
  }

  let { reorderModalDisplayed = $bindable() }: Props = $props();

</script>

<ButtonIconTooltip
  icon="bx-transfer text-3xl rotate-90"
  tooltip="Réorganisation"
  on:click={() => {
    reorderModalDisplayed = !reorderModalDisplayed
  }}
/>
