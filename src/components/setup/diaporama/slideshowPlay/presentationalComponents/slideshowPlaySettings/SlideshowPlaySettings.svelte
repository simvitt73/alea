<script lang="ts">
  import SlideshowPlayDisplaySettings from './SlideshowPlayDisplaySettings.svelte'
  import SlideshowPlayControlSettings from './SlideshowPlayControlSettings.svelte'
  import SlideshowPlayOtherSettings from './SlideshowPlayOtherSettings.svelte'

  interface Props {
    isManualModeActive: boolean | undefined;
    isQuestionVisible: boolean;
    isCorrectionVisible: boolean;
    handleTimerChange: (cursorTimeValue: number) => void;
    backToSettings: (event: Event) => void;
    isPause: boolean;
    nextQuestion: () => void;
    prevQuestion: () => void;
    switchDisplayMode: () => void;
    switchPause: (isUserAction?: boolean) => void;
    zoomMinus: () => void;
    zoomPlus: () => void;
    pause: () => void;
    play: (isUserAction?: boolean) => void;
    currentSlideDuration: number;
  }

  let {
    isManualModeActive,
    isQuestionVisible,
    isCorrectionVisible,
    handleTimerChange,
    backToSettings,
    isPause,
    nextQuestion,
    prevQuestion,
    switchDisplayMode,
    switchPause,
    zoomMinus,
    zoomPlus,
    pause,
    play,
    currentSlideDuration
  }: Props = $props();

  const BUTTONS_CLASS = 'mx-1.5 bx-sm md:bx-lg'

</script>

<div class="flex flex-row justify-start items-center ml-7 w-[33%]">
  <SlideshowPlayDisplaySettings
    {BUTTONS_CLASS}
    {zoomPlus}
    {zoomMinus}
  />
</div>
<div class="flex flex-row justify-center items-center w-[33%]">
  <SlideshowPlayControlSettings
    {BUTTONS_CLASS}
    {isPause}
    {isManualModeActive}
    {prevQuestion}
    {nextQuestion}
    {switchPause}
  />
</div>
<div class="flex flex-row justify-end items-baseline mr-7 w-[33%]">
  <SlideshowPlayOtherSettings
    {BUTTONS_CLASS}
    {pause}
    {play}
    {handleTimerChange}
    {switchDisplayMode}
    {backToSettings}
    {isManualModeActive}
    {isQuestionVisible}
    {isCorrectionVisible}
    {currentSlideDuration}
  />
</div>
