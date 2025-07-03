<script lang="ts">
  import { run } from 'svelte/legacy';

  import BasicClassicModal from './BasicClassicModal.svelte'

  interface Props {
    contentDisplayed: 'success' | 'error' | 'none'; // à bind avec le parent
    successMessage: string;
    errorMessage: string;
    displayDuration?: number;
  }

  let {
    contentDisplayed = $bindable(),
    successMessage,
    errorMessage,
    displayDuration = 3000
  }: Props = $props();

  let isSuccessDisplayed: boolean = $state()
  run(() => {
    if (contentDisplayed === 'success') {
      isSuccessDisplayed = true
      setTimeout(() => {
        contentDisplayed = 'none'
      }, displayDuration)
    }
  });

  let isErrorDisplayed: boolean = $state()
  run(() => {
    if (contentDisplayed === 'error') {
      isErrorDisplayed = true
      setTimeout(() => {
        contentDisplayed = 'none'
      }, displayDuration)
    }
  });

  run(() => {
    if (contentDisplayed === 'none') {
      isSuccessDisplayed = false
      isErrorDisplayed = false
    }
  });

</script>

<BasicClassicModal
  isWithCloseButton={false}
  bind:isDisplayed={isSuccessDisplayed}
  on:close={() => (contentDisplayed = 'none')}
>
  {#snippet content()}
    <div >
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html successMessage}
    </div>
  {/snippet}
</BasicClassicModal>

<BasicClassicModal
  isWithCloseButton={false}
  bind:isDisplayed={isErrorDisplayed}
  on:close={() => (contentDisplayed = 'none')}
>
  {#snippet content()}
    <div >
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html errorMessage}
    </div>
  {/snippet}
</BasicClassicModal>
