<script lang="ts">
  import { run } from 'svelte/legacy';

  import { onMount } from 'svelte'

  interface Props {
    isManualModeActive: boolean | undefined;
    currentQuestionNumber: number;
    totalQuestionsNumber: number;
    goToQuestion: (index: number) => void;
    ratioTime: number;
    currentSlideDuration: number;
  }

  let {
    isManualModeActive,
    currentQuestionNumber,
    totalQuestionsNumber,
    goToQuestion,
    ratioTime,
    currentSlideDuration
  }: Props = $props();

  let stepsUl: HTMLElement | null = $state()
  onMount(() => {
    stepsUl = document.getElementById('stepsUl')
  })

  run(() => {
    if (stepsUl) {
      const steps = stepsUl.querySelectorAll('button')
      if (steps[currentQuestionNumber]) steps[currentQuestionNumber].scrollIntoView()
      if (steps[currentQuestionNumber + 5]) steps[currentQuestionNumber + 5].scrollIntoView()
      if (steps[currentQuestionNumber - 5]) steps[currentQuestionNumber - 5].scrollIntoView()
      const diapoProgressContainer = document.getElementById('diapoProgressContainer')
      if (diapoProgressContainer) diapoProgressContainer.scrollIntoView()
    }
  });

</script>

<div
  id="diapoProgressContainer"
  class:invisible={isManualModeActive}
  class="flex flex-row flex-shrink-0 h-6 border
    border-coopmaths-warn dark:border-coopmathsdark-warn"
>
  <div
    class="bg-coopmaths-warn dark:bg-coopmathsdark-warn"
    style="width: {ratioTime}%; transition: width {currentSlideDuration / 100}s linear"
></div>
</div>
<ul id="stepsUl" class="steps w-full mt-3">
  {#each [...Array(totalQuestionsNumber).keys()] as i}
    <button
      onclick={() => goToQuestion(i)}
      class="cursor-pointer
        step dark:step-info
        {currentQuestionNumber === i ? 'step-current' : ''}
        {currentQuestionNumber >= i ? 'step-primary' : ''}"
    >
    </button>
  {/each}
</ul>

<style>
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
  .step::after {
    color: white;
  }
  .step-current::after {
    animation: pulse 1s infinite ease-in-out;

  }
</style>
