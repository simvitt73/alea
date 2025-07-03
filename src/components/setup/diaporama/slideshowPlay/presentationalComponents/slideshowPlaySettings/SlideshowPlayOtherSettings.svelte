<script lang="ts">
  import { run } from 'svelte/legacy';

  import ButtonIcon from '../../../../../shared/forms/ButtonIcon.svelte'
  import SlideshowPlayTimerSettingsModal from './SlideshowPlayTimerSettingsModal.svelte'

  interface Props {
    handleTimerChange: (cursorTimeValue: number) => void;
    switchDisplayMode: () => void;
    backToSettings: (event: Event) => void;
    pause: () => void;
    play: (isUserAction: boolean) => void;
    isManualModeActive: boolean | undefined;
    isQuestionVisible: boolean;
    isCorrectionVisible: boolean;
    currentSlideDuration: number;
    BUTTONS_CLASS: string;
  }

  let {
    handleTimerChange,
    switchDisplayMode,
    backToSettings,
    pause,
    play,
    isManualModeActive,
    isQuestionVisible,
    isCorrectionVisible,
    currentSlideDuration,
    BUTTONS_CLASS
  }: Props = $props();

  let isTimerSettingsModalDisplayedOnce = $state(false)

  let getDisplayMode = $derived(() => {
    if (isQuestionVisible && !isCorrectionVisible) {
      return 'Q'
    }
    if (isQuestionVisible && isCorrectionVisible) {
      return 'Q+C'
    }
    if (!isQuestionVisible && isCorrectionVisible) {
      return 'C'
    }
    return ''
  })

  let isTimerSettingsModalDisplayed = $state(false)
  function displayTimerSettingsModal () {
    isTimerSettingsModalDisplayed = true
  }

  run(() => {
    if (isTimerSettingsModalDisplayed) {
      pause()
      isTimerSettingsModalDisplayedOnce = true
    } else if (isTimerSettingsModalDisplayedOnce) {
      play(true)
    }
  });

</script>

<ButtonIcon
  icon="bx-stopwatch {BUTTONS_CLASS}"
  title="Régler la durée de chaque question"
  floatUnderText={isManualModeActive ? 'Manuel' : currentSlideDuration + 's'}
  on:click={displayTimerSettingsModal}
/>
<ButtonIcon
  icon="bx-show {BUTTONS_CLASS}"
  title="Raccourci clavier : Entrée"
  floatUnderText={getDisplayMode()}
  on:click={switchDisplayMode}
/>
<ButtonIcon
  icon="bx-power-off {BUTTONS_CLASS}"
  title="Retour au paramétrage"
  on:click={backToSettings}
/>
<SlideshowPlayTimerSettingsModal
  bind:isTimerSettingsModalDisplayed={isTimerSettingsModalDisplayed}
  {handleTimerChange}
/>
