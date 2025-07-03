<script lang="ts">
  import ButtonIcon from '../../../../../shared/forms/ButtonIcon.svelte'
  import FullscreenButton from '../../../../start/presentationalComponents/header/headerButtons/setupButtons/FullscreenButton.svelte'

  interface Props {
    zoomPlus: () => void;
    zoomMinus: () => void;
    BUTTONS_CLASS: string;
  }

  let { zoomPlus, zoomMinus, BUTTONS_CLASS }: Props = $props();

</script>

<FullscreenButton/>
<ButtonIcon
  icon="bx-plus {BUTTONS_CLASS}"
  title="Raccourci clavier : +"
  on:click={zoomPlus}
/>
<ButtonIcon
  icon="bx-minus {BUTTONS_CLASS}"
  title="Raccourci clavier : -"
  on:click={zoomMinus}
/>
