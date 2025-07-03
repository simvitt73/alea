<script lang="ts">
  interface Props {
    isQuestionsVisible: boolean | undefined;
    isCorrectionVisible: boolean | undefined;
    currentVue: number;
    nbOfVues: 0 | 1 | 2 | 3 | 4;
    setCurrentVue: (value: number) => void;
    setQuestionsVisible: (value: boolean) => void;
    setCorrectionVisible: (value: boolean) => void;
    handleCorrectionsStepsClick: (button: 'backward' | 'forward') => void;
    newDataForAll: () => void;
    backToSettings: () => void;
  }

  let {
    isQuestionsVisible,
    isCorrectionVisible,
    currentVue = $bindable(),
    nbOfVues,
    setCurrentVue,
    setQuestionsVisible,
    setCorrectionVisible,
    handleCorrectionsStepsClick,
    newDataForAll,
    backToSettings
  }: Props = $props();

</script>

<div class="flex flex-col items-center w-14 min-h-screen py-4
  bg-coopmaths-canvas-dark dark:bg-coopmathsdark-canvas-dark
  text-coopmaths-struct dark:text-coopmathsdark-struct"
>
  <button
    type="button"
    class="pb-8
      text-coopmaths-action dark:text-coopmathsdark-action
      hover:text-coopmaths-action-lightest dark:hover:text-coopmathsdark-action-lightest"
    onclick={backToSettings}
  >
    <i class="bx bx-sm bx-arrow-back"></i>
  </button>
  <button
    type="button"
    class="pb-8
      text-coopmaths-action dark:text-coopmathsdark-action
      hover:text-coopmaths-action-lightest dark:hover:text-coopmathsdark-action-lightest"
    onclick={newDataForAll}
  >
    <i class="bx bx-sm bx-refresh"></i>
  </button>

  <span
    class="text-xs
    {isQuestionsVisible ? 'font-bold' : 'font-light'}
    text-coopmaths-struct dark:text-coopmathsdark-struct"
  >
    Questions
  </span>
  <button
    type="button"
    onclick={() => setQuestionsVisible(!isQuestionsVisible)}
  >
    <i
      class="bx bx-sm cursor-pointer
      {isQuestionsVisible ? 'bx-toggle-right' : 'bx-toggle-left'}
      text-coopmaths-action dark:text-coopmathsdark-action
      hover:text-coopmaths-action-lightest dark:hover:text-coopmathsdark-action-lightest"
></i>
  </button>
  <span
    class="text-xs pt-2
    {isCorrectionVisible ? 'font-bold' : 'font-light'}
    text-coopmaths-struct dark:text-coopmathsdark-struct"
  >
    Réponses
  </span>
  <button
    type="button"
    onclick={() => setCorrectionVisible(!isCorrectionVisible)}
  >
    <i class="mb-8 bx bx-sm cursor-pointer
      {isCorrectionVisible ? 'bx-toggle-right' : 'bx-toggle-left'}
      text-coopmaths-action dark:text-coopmathsdark-action
      hover:text-coopmaths-action-lightest dark:hover:text-coopmathsdark-action-lightest"
></i>
  </button>
  <span class="text-xs font-bold pt-2
    text-coopmaths-struct dark:text-coopmathsdark-struct"
  >
    Pas à pas
  </span>
  <div class="flex flex-row justify-center items-center mb-8
    text-coopmaths-action dark:text-coopmathsdark-action
    hover:text-coopmaths-action-lightest dark:hover:text-coopmathsdark-action-lightest"
  >
    <button
      type="button"
      onclick={() => handleCorrectionsStepsClick('backward')}
    >
      <i class="bx bxs-left-arrow mr-2 cursor-pointer"></i>
    </button>
    <button
      type="button"
      onclick={() => handleCorrectionsStepsClick('forward')}
    >
      <i class="bx bxs-right-arrow cursor-pointer"></i>
    </button>
  </div>

  <!-- Onglets Séries -->
  {#if nbOfVues > 1}
    {#each [...Array(nbOfVues).keys()] as i}
      <input
        type="radio"
        id="tab{i + 1}"
        value={i}
        bind:group={currentVue}
        onchange={() => setCurrentVue(i)}
        class="peer/tab{i + 1} items-center justify-center hidden"
      />
      <label
        class="flex flex-row justify-center items-center text-center
          w-14 h-14 rounded-l-lg border-y border-l
          cursor-pointer peer-checked/tab{i + 1}:cursor-default
          border-coopmaths-struct dark:border-coopmathsdark-struct
          bg-coopmaths-canvas-dark font-bold dark:bg-coopmathsdark-canvas-dark
          text-coopmaths-action dark:text-coopmathsdark-action
          hover:text-coopmaths-action-lightest dark:hover:text-coopmathsdark-action-lightest
          peer-checked/tab{i + 1}:bg-coopmaths-canvas dark:peer-checked/tab{i + 1}:bg-coopmathsdark-canvas
          peer-checked/tab{i + 1}:text-coopmaths-struct dark:peer-checked/tab{i + 1}:text-coopmathsdark-struct"
        for="tab{i + 1}"
      >
        {i + 1}
      </label>
    {/each}
    <input
      type="radio"
      id="tab5"
      value={4}
      bind:group={currentVue}
      onchange={() => setCurrentVue(4)}
      class="hidden peer/tab5 items-center justify-center"
    />
    <label
      class="flex flex-row rounded-l-lg border-y border-l border-coopmaths-struct dark:border-coopmathsdark-struct w-14 h-14 justify-center items-center text-center cursor-pointer bg-coopmaths-canvas-dark dark:bg-coopmathsdark-canvas-dark font-bold text-coopmaths-action hover:text-coopmaths-action-lightest dark:text-coopmathsdark-action dark:hover:text-coopmathsdark-action-lightest peer-checked/tab5:bg-coopmaths-canvas dark:peer-checked/tab5:bg-coopmathsdark-canvas peer-checked/tab5:text-coopmaths-struct dark:peer-checked/tab5:text-coopmathsdark-struct peer-checked/tab5:cursor-default"
      for="tab5"
    >
      Tout
    </label>
  {/if}
</div>
