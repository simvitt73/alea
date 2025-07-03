<script lang="ts">
  import NavBar from '../../../../../components/shared/header/NavBar.svelte'
  import ModalReorder from './ModalReorder.svelte'
  import HeaderButtons from './headerButtons/HeaderButtons.svelte'
  import SideMenuWrapper from './SideMenuWrapper.svelte'
  import type { VueType } from '../../../../../lib/types'
  import type { Language } from '../../../../../lib/types/languages'
  import NavBarRecorder from '../../capytale/NavBarRecorder.svelte'

  interface Props {
    isExerciseDisplayed: boolean;
    isNavBarVisible: boolean;
    zoomUpdate: (plusMinus: ('+' | '-')) => void;
    setAllInteractive: (isAllInteractive: boolean) => void;
    newDataForAll: () => void;
    trash: () => void;
    setFullScreen: (isFullScreen: boolean) => void;
    handleExport: (vue: VueType) => void;
    handleRecorder: () => void;
    locale: Language;
    handleLanguage: (lang: string) => void;
    isCapytale: boolean;
    isRecorder: boolean;
    buildUrlAndOpenItInNewTab: (type: 'usual' | 'eleve') => void;
    showSettingsDialog: () => void;
    importExercises: (urlFeuilleEleve: string) => void;
    isExercisesListEmpty: boolean;
    isSidenavOpened: boolean;
    toggleSidenav: (test: boolean) => void;
    exportQcmCam: () => Promise<void>;
  }

  let {
    isExerciseDisplayed,
    isNavBarVisible,
    zoomUpdate,
    setAllInteractive,
    newDataForAll,
    trash,
    setFullScreen,
    handleExport,
    handleRecorder,
    locale,
    handleLanguage,
    isCapytale,
    isRecorder,
    buildUrlAndOpenItInNewTab,
    showSettingsDialog,
    importExercises,
    isExercisesListEmpty,
    isSidenavOpened,
    toggleSidenav,
    exportQcmCam
  }: Props = $props();

  let reorderModalDisplayed: boolean = $state()

</script>

<header class="flex flex-col scrollbar-hide w-full
  md:sticky md:top-0 md:z-50
  bg-coopmaths-canvas dark:bg-coopmathsdark-canvas"
>
  {#if isRecorder}
    <div
      id="headerCapytale"
      class="bg-coopmaths-canvas dark:bg-coopmathsdark-canvas print-hidden"
    >
      <NavBarRecorder
        {zoomUpdate}
        {newDataForAll}
        {trash}
        {buildUrlAndOpenItInNewTab}
        {showSettingsDialog}
        {importExercises}
        {isExercisesListEmpty}
        {isCapytale}
        {handleRecorder}
      />
    </div>
  {:else}
    <!-- Entête -->
    {#if isNavBarVisible}
      <div
        id="headerStart"
        class="bg-coopmaths-canvas dark:bg-coopmathsdark-canvas print-hidden"
      >
        <NavBar
          subtitle="Conception de document"
          subtitleType="design"
          {locale}
          {handleLanguage}
        />
      </div>
    {/if}
    <!-- Barre de boutons si non-smartphone  -->
    <div
      class="flex {isExerciseDisplayed
        ? 'xl:h-[50px] md:h-[100px]'
        : 'h-0'}"
    >
      <div
        class={!isExerciseDisplayed
          ? 'hidden'
          : 'relative w-full flex flex-col justify-center items-center bg-coopmaths-canvas dark:bg-coopmathsdark-canvas'}
        id="barre-boutons"
      >
        <SideMenuWrapper
          {isRecorder}
          {isSidenavOpened}
          {toggleSidenav}
        />
        <HeaderButtons
          bind:reorderModalDisplayed
          {zoomUpdate}
          {setAllInteractive}
          {newDataForAll}
          {trash}
          {setFullScreen}
          {handleExport}
          {exportQcmCam}
        />
      </div>
    </div>
  {/if}
</header>

<ModalReorder {reorderModalDisplayed} />
