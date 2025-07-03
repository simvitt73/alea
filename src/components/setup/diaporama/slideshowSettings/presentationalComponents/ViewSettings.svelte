<script lang="ts">
  import type { NumberRange } from '../../../../../lib/types'
  import CheckboxWithLabel from '../../../../shared/forms/CheckboxWithLabel.svelte'
  import FormRadio from '../../../../shared/forms/FormRadio.svelte'

  interface Props {
    nbOfViews: NumberRange<1, 4>;
    updateNbOfViews: (nbOfViews: NumberRange<1, 4>) => void;
    isImagesOnSides: boolean;
    updateIsImagesOnSides: (isImagesOnSides: boolean) => void;
  }

  let {
    nbOfViews = $bindable(),
    updateNbOfViews,
    isImagesOnSides,
    updateIsImagesOnSides
  }: Props = $props();

  const labelsForMultivue = [
    { label: 'Pas de multivue', value: 1 },
    { label: 'Deux vues', value: 2 },
    { label: 'Trois vues', value: 3 },
    { label: 'Quatre vues', value: 4 }
  ]
</script>

<div class="flex text-lg font-bold mb-2
  text-coopmaths-struct dark:text-coopmathsdark-struct"
>
  Affichage
</div>
<div class="flex flex-col px-4 pb-8">
  <FormRadio
    bind:valueSelected={nbOfViews}
    on:newvalue={() => updateNbOfViews(nbOfViews)}
    title="multivue"
    labelsValues={labelsForMultivue}
  />
  <CheckboxWithLabel
    id="slideshow-view-images-on-sides-checkbox"
    isChecked={isImagesOnSides}
    label="Afficher les images sur les côtés"
    on:change={(e) => {
      const isChecked = e.detail
      updateIsImagesOnSides(isChecked)
    }}
  />
</div>
