<script lang="ts">
  import CheckboxWithLabel from '../../../../shared/forms/CheckboxWithLabel.svelte'

  interface Props {
    isQuestionsOrdered: boolean;
    updateQuestionsOrder: (isQuestionsOrdered: boolean) => void;
  }

  let { isQuestionsOrdered, updateQuestionsOrder }: Props = $props();

</script>

<div class="pb-6">
  <div class="flex text-lg font-bold mb-1
    text-coopmaths-struct dark:text-coopmathsdark-struct"
  >
    Ordre
  </div>
  <CheckboxWithLabel
    id="slideshow-order-checkbox"
    isChecked={isQuestionsOrdered}
    label="Questions dans l'ordre"
    on:change={(e) => {
      const isChecked = e.detail
      updateQuestionsOrder(isChecked)
    }}
  />
</div>
