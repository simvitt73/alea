<script lang="ts">
  import ButtonIcon from '../../../../../shared/forms/ButtonIcon.svelte'

  interface Props {
    isPause: boolean;
    isManualModeActive: boolean | undefined;
    prevQuestion: () => void;
    nextQuestion: () => void;
    switchPause: (isUserAction?: boolean) => void;
    BUTTONS_CLASS: string;
  }

  let {
    isPause,
    isManualModeActive,
    prevQuestion,
    nextQuestion,
    switchPause,
    BUTTONS_CLASS
  }: Props = $props();

</script>

<ButtonIcon
  icon="bx-skip-previous {BUTTONS_CLASS}"
  title="Raccourci clavier : flèche gauche"
  on:click={prevQuestion}
/>
<ButtonIcon
  icon="{isPause ? 'bx-play' : 'bx-pause'} {BUTTONS_CLASS} {isManualModeActive ? 'invisible' : ''}"
  title="Raccourci clavier : espace"
  on:click={() => switchPause(true)}
/>
<ButtonIcon
  icon="bx-skip-next {BUTTONS_CLASS}"
  title="Raccourci clavier : flèche droite"
  on:click={nextQuestion}
/>
