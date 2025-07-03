<script lang="ts">
  import type { Vue } from '../../../types'

  interface Props {
    slideView: Vue;
  }

  let { slideView }: Props = $props();

</script>

<div class="flex flex-col">
  <div>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html slideView.consigne}
  </div>
  <div>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html slideView.question}
  </div>
</div>
