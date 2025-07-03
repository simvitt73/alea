<script lang="ts">
  import type { Vue } from '../../../types'

  interface Props {
    slideView: Vue;
  }

  let { slideView }: Props = $props();

</script>

<div>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html slideView.correction}
</div>
