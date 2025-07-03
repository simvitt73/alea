<script lang="ts">
  import { run, self } from 'svelte/legacy';

  import { createEventDispatcher } from 'svelte'
  import ButtonIcon from '../forms/ButtonIcon.svelte'

  interface Props {
    isDisplayed: boolean; // à bind avec le parent
    icon?: string;
    isWithCloseButton?: boolean;
    header?: import('svelte').Snippet;
    content?: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
  }

  let {
    isDisplayed = $bindable(),
    icon = '',
    isWithCloseButton = true,
    header,
    content,
    footer
  }: Props = $props();

  const dispatch = createEventDispatcher()

  let dialog: HTMLDialogElement = $state()

  run(() => {
    if (dialog && isDisplayed) dialog.showModal()
  });
  run(() => {
    if (dialog && !isDisplayed) dialog.close()
  });
</script>

<div class="flex justify-center"> <!-- pour que la modale ne soit pas affectée par les modifications de marge de ses parents -->

  <!-- Ceux qui n'ont pas de souris ont le focus sur le bouton de la croix pour fermer donc ce n'est pas grave s'ils ne peuvent pas fermer en interagissant avec le fond de la modale -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <dialog
    bind:this={dialog}
    onclick={self(() => dialog.close())}
    onclose={() => {
      isDisplayed = false
      dispatch('close')
    }}
    class="rounded-xl
      w-full md:w-2/3 xl:w-1/2
      bg-coopmaths-canvas dark:bg-coopmathsdark-canvas"
  >
    <div class="relative p-6 text-center">
      {#if isWithCloseButton}
        <ButtonIcon
        icon="bx-x text-2xl"
        class="absolute top-3 right-3"
        on:click={() => dialog.close()}
        />
      {/if}
      {#if icon !== ''}
        <div class="flex items-center justify-center h-12 w-12 mx-auto mt-2 mb-6 rounded-full
          bg-coopmaths-warn-100 text-coopmaths-warn-darkest"
        >
            <i class="bx bx-sm {icon}"></i>
        </div>
      {/if}
      <div class="w-full mb-4
        text-2xl font-bold
        text-coopmaths-struct dark:text-coopmathsdark-struct"
      >
        {@render header?.()}
      </div>
      <div class="w-full">
        {@render content?.()}
      </div>
      <div class="w-full mt-6 mb-3">
        {@render footer?.()}
      </div>
    </div>
  </dialog>
</div>
