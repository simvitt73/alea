<script lang="ts">
  import ButtonIconTooltip from '../../../../../../shared/forms/ButtonIconTooltip.svelte'

  interface Props {
    zoomUpdate: (plusMinus: ('+' | '-')) => void;
  }

  let { zoomUpdate }: Props = $props();

</script>

<ButtonIconTooltip
  icon="bx-zoom-out text-3xl"
  tooltip="Réduire la taille du texte"
  on:click={() => zoomUpdate('-')}
/>
<ButtonIconTooltip
  icon="bx-zoom-in text-3xl"
  tooltip="Augmenter la taille du texte"
  on:click={() => zoomUpdate('+')}
/>
