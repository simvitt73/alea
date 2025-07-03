<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  interface Props {
    id: string;
    isChecked: boolean;
    isDisabled?: boolean;
    label: string;
  }

  let {
    id,
    isChecked = $bindable(),
    isDisabled = false,
    label
  }: Props = $props();

  const dispatch = createEventDispatcher()
</script>

<div class="flex flex-row justify-start items-center px-4 mt-1">
  <input
    id="{id}"
    aria-describedby="{id}"
    type="checkbox"
    class="w-4 h-4 rounded
      bg-coopmaths-canvas dark:bg-coopmathsdark-canvas
      { isDisabled ? 'border-opacity-20 dark:border-opacity-20' : 'cursor-pointer'}
      border-coopmaths-action dark:border-coopmathsdark-action
      text-coopmaths-action dark:text-coopmathsdark-action
      focus:ring-3
      focus:ring-coopmaths-action dark:focus:ring-coopmathsdark-action"
    bind:checked={isChecked}
    onchange={() => dispatch('change', isChecked)}
    disabled={isDisabled}
  />
  <label
    for="{id}"
    class="ml-3 text-sm
      text-coopmaths-corpus dark:text-coopmathsdark-corpus
      {isDisabled ? 'text-opacity-20 dark:text-opacity-20' : 'text-opacity-70 dark:text-opacity-70 cursor-pointer'}
      {isChecked ? 'font-semibold' : 'font-light'}"
  >
    {label}
  </label>
</div>
