<script lang="ts">
  import ZoomButtons from './ZoomButtons.svelte'
  import InteractivityButton from './InteractivityButton.svelte'
  import ReorderButton from './ReorderButton.svelte'
  import NewDataButton from './NewDataButton.svelte'
  import TrashButton from './TrashButton.svelte'
  import FullscreenButton from './FullscreenButton.svelte'

  interface Props {
    reorderModalDisplayed: boolean;
    zoomUpdate: (plusMinus: ('+' | '-')) => void;
    setAllInteractive: (isAllInteractive: boolean) => void;
    newDataForAll: () => void;
    trash: () => void;
    setFullScreen: (isFullScreen: boolean) => void;
  }

  let {
    reorderModalDisplayed = $bindable(),
    zoomUpdate,
    setAllInteractive,
    newDataForAll,
    trash,
    setFullScreen
  }: Props = $props();

</script>

<ZoomButtons
  {zoomUpdate}
/>
<InteractivityButton
  {setAllInteractive}
/>
<ReorderButton
  bind:reorderModalDisplayed
/>
<NewDataButton
  {newDataForAll}
/>
<TrashButton
  {trash}
/>
<FullscreenButton
  callback={setFullScreen}
/>
