<script lang="ts">
  import { run } from 'svelte/legacy';

  import type { InterfaceGlobalOptions } from '../../../../../lib/types'
  import type { CanOptions } from '../../../../../lib/types/can'
  import ButtonTextAction from '../../../../shared/forms/ButtonTextAction.svelte'
  import BasicClassicModal from '../../../../shared/modal/BasicClassicModal.svelte'
  import ModalCapytalSettingsCan from './ModalCapytalSettingsCAN.svelte'
  import ModalCapytalSettingsCorrection from './ModalCapytalSettingsCorrection.svelte'
  import ModalCapytalSettingsTitles from './ModalCapytalSettingsTitles.svelte'
  import ModalCapytalSettingsData from './ModalCapytalSettingsData.svelte'
  import ModalCapytalSettingsInteractivity from './ModalCapytalSettingsInteractivity.svelte'

  interface Props {
    isSettingsDialogDisplayed?: boolean;
    globalOptions: InterfaceGlobalOptions;
    canOptions: CanOptions;
    toggleCan: () => void;
    buildUrlAndOpenItInNewTab: (status: 'eleve' | 'usual') => void;
    updateParams: (params: { globalOptions: InterfaceGlobalOptions, canOptions: CanOptions }) => void;
  }

  let {
    isSettingsDialogDisplayed = $bindable(false),
    globalOptions,
    canOptions,
    toggleCan = $bindable(),
    buildUrlAndOpenItInNewTab,
    updateParams
  }: Props = $props();

  const params = $state({
    globalOptions,
    canOptions
  })

  run(() => {
    if (globalOptions || canOptions) {
      params.globalOptions = globalOptions
      params.canOptions = canOptions
    }
  });

  function setInteractivity (value: string) {
    params.globalOptions.setInteractive = value
  }

</script>

<BasicClassicModal
  bind:isDisplayed={isSettingsDialogDisplayed}
  on:close={() => updateParams(params)}
>
  {#snippet header()}
    <div >
      Réglages de l'affichage des exercices
    </div>
  {/snippet}
  {#snippet content()}
    <div
      
      class="pt-2 pl-2 grid grid-flow-row text-justify
        lg:grid-cols-2 md:gap-4 font-light"
    >
      <div class="pb-2">
        <ModalCapytalSettingsInteractivity
          setInteractive={params.globalOptions.setInteractive ?? '2'}
          {setInteractivity}
          bind:oneShot={params.globalOptions.oneShot}
          bind:isDisabled={params.canOptions.isChoosen}
        />
      </div>
      <div class="pb-2">
        <ModalCapytalSettingsCan
          bind:canOptions={params.canOptions}
          bind:toggleCan={toggleCan}
        />
      </div>
      <div class="pb-2">
        <ModalCapytalSettingsData
          bind:globalOptions={params.globalOptions}
        />
      </div>
      <div class="pb-2">
        <ModalCapytalSettingsTitles
          bind:globalOptions={params.globalOptions}
        />
      </div>
      <div class="pb-2">
        <ModalCapytalSettingsCorrection
          bind:globalOptions={params.globalOptions}
          bind:canOptions={params.canOptions}
        />
      </div>
    </div>
  {/snippet}
  {#snippet footer()}
    <div  class="flex flex-row justify-end space-x-4 w-full">
      <div class="pt-4 pb-8 px-4">
        <ButtonTextAction
          class="text-sm py-1 px-2 rounded-md h-7"
          on:click={() => {
            isSettingsDialogDisplayed = false
          }}
          text="Valider"
        />
      </div>
      <div class="pt-4 pb-8 px-4">
        <ButtonTextAction
          class="text-sm py-1 px-2 rounded-md h-7"
          on:click={() => {
            buildUrlAndOpenItInNewTab('eleve')
          }}
          text="Aperçu"
        />
      </div>
    </div>
  {/snippet}
</BasicClassicModal>
