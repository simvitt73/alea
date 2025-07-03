<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { getUniqueStringBasedOnTimeStamp } from '../../../lib/components/time'

  interface Props {
    titles?: string[];
    value?: boolean;
    isDisabled?: boolean;
    classAddenda?: string;
    textSize?: string;
    buttonSize?: string;
    id?: string;
  }

  let {
    titles = ['', ''],
    value = $bindable(true),
    isDisabled = false,
    classAddenda = '',
    textSize = 'sm',
    buttonSize = 'sm',
    id = 'toggle-' + getUniqueStringBasedOnTimeStamp()
  }: Props = $props();

  const dispatch = createEventDispatcher()

  function toggle () {
    value = !value
    dispatch('toggle')
  }
</script>

<!--
  @component
  Bouton toogle avec deux états

  __Paramètres__ :

  * `titles` : tableau pour le titre du boutons (un pour `true`, un pour `false`)
  * `value`: booléen lié au bouton
  * `isDisabled`: booléen servant à désactiver le bouton
  * `classAddenda`: chaîne correspondant à des _ajouts_ pour le style

  Usage:
    ```tsx
  <ButtonToggle
      titles={['Titre pour true', 'Titre pour false']}
      bind:value={maVariable}
      isDisabled={variable2 === 0}
      on:click={maFonction}
  />
  ```
 -->
<div class="flex flex-row justify-start items-center {classAddenda}">
  <button
    type="button"
    {id}
    class="flex justify-center items-center"
    onclick={toggle}
    disabled={isDisabled}
  >
    <i
      class=" text-coopmaths-action hover:text-coopmaths-action-lightest dark:text-coopmathsdark-action dark:hover:text-coopmathsdark-action-lightest bx bx-{buttonSize} translate-y-[0.15rem] {value
        ? 'bx-toggle-right'
        : 'bx-toggle-left'}
        {isDisabled ? 'text-opacity-10' : ''}"
      aria-describedby="{value ? titles[0] : titles[1]}"
></i>
  </button>
  <div
    class="{textSize === 'xs'
      ? 'pl-1'
      : 'pl-2'} inline-block text-{textSize} font-light text-coopmaths-corpus dark:text-coopmathsdark-corpus {isDisabled
        ? 'text-opacity-10'
        : 'text-opacity-70'}"
  >
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html `${value ? titles[0] : titles[1]}`}
  </div>
</div>
