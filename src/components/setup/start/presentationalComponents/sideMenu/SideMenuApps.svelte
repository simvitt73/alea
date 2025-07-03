<script lang="ts">
  import { getContext } from 'svelte'
  interface Props {
    [key: string]: any
  }

  let { ...props }: Props = $props();
  const { toggleThirdAppsChoiceDialog } = getContext('thirdAppsChoiceContext')
</script>

<button
  type="button"
  class={`${props.class || ''} font-bold text-xl text-coopmaths-struct dark:text-coopmathsdark-struct`}
  onclick={toggleThirdAppsChoiceDialog}
>
  Applications tierces
</button>
