<script lang="ts">
  import ButtonsDeck from '../../../../../shared/ui/ButtonsDeck.svelte'
  import SetupButtons from './setupButtons/SetupButtons.svelte'
  import ExportButtons from './exportButtons/ExportButtons.svelte'
  import type { VueType } from '../../../../../../lib/types'

  interface Props {
    reorderModalDisplayed?: boolean;
    zoomUpdate: (plusMinus: ('+' | '-')) => void;
    setAllInteractive: (isAllInteractive: boolean) => void;
    newDataForAll: () => void;
    trash: () => void;
    setFullScreen: (isFullScreen: boolean) => void;
    handleExport: (vue: VueType) => void;
    exportQcmCam: () => Promise<void>;
  }

  let {
    reorderModalDisplayed = $bindable(false),
    zoomUpdate,
    setAllInteractive,
    newDataForAll,
    trash,
    setFullScreen,
    handleExport,
    exportQcmCam
  }: Props = $props();

</script>

<ButtonsDeck class="md:pl-10 flex md:flex">
  <!-- @migration-task: migrate this slot by hand, `setup-buttons` is an invalid identifier -->
  <div
    slot="setup-buttons"
    class="flex flex-row justify-start items-center space-x-3 md:space-x-4"
  >
    <SetupButtons
      bind:reorderModalDisplayed
      {zoomUpdate}
      {setAllInteractive}
      {newDataForAll}
      {trash}
      {setFullScreen}
    />
  </div>
  <!-- @migration-task: migrate this slot by hand, `export-buttons` is an invalid identifier -->
  <div
    slot="export-buttons"
    class="flex flex-row justify-end items-center space-x-3 md:space-x-4"
  >
    <ExportButtons
      {handleExport}
      {exportQcmCam}
    />
  </div>
</ButtonsDeck>
