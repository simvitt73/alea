<script lang="ts">
  import ButtonToggle from '../../../../shared/forms/ButtonToggle.svelte'
  import FormRadio from '../../../../shared/forms/FormRadio.svelte'

  interface Props {
    setInteractive?: string;
    oneShot?: boolean;
    isDisabled: boolean;
    setInteractivity: (value: string) => void;
  }

  let {
    setInteractive = $bindable('2'),
    oneShot = $bindable(false),
    isDisabled,
    setInteractivity
  }: Props = $props();

</script>

<div class="pl-2 pb-2 font-light text-2xl
  text-coopmaths-struct-light dark:text-coopmathsdark-struct-light"
>
  Interactivité
</div>
<FormRadio
  title="Interactif"
  bind:valueSelected={setInteractive}
  {isDisabled}
  on:newvalue={() => setInteractivity(setInteractive)}
  labelsValues={[
    { label: 'Laisser tel quel', value: '2' },
    { label: 'Tout interactif', value: '1' },
    { label: "Pas d'interactivité", value: '0' }
  ]}
/>
<div class="pl-2 pt-2">
  <ButtonToggle
    titles={[
      'Les élèves peuvent répondre une seule fois',
      'Les élèves peuvent répondre plusieurs fois'
    ]}
    bind:value={oneShot}
  />
</div>
