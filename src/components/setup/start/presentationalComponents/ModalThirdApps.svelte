<script lang="ts">
  import Card from '../../../shared/ui/Card.svelte'
  import BasicClassicModal from '../../../shared/modal/BasicClassicModal.svelte'
  import appsTierce from '../../../../json/referentielAppsTierce.json'
  import type { AppTierceGroup } from 'src/lib/types/referentiels'

  interface Props {
    thirdAppsChoiceModal: BasicClassicModal;
    showThirdAppsChoiceDialog: boolean;
    appsTierceInExercisesList: string[];
  }

  let { thirdAppsChoiceModal = $bindable(), showThirdAppsChoiceDialog = $bindable(), appsTierceInExercisesList }: Props = $props();

  const appsTierceReferentielArray: AppTierceGroup[] = Object.values(appsTierce)
</script>

<!-- Fenêtre de dialogue pour le choix des applications tierces -->
<BasicClassicModal
  bind:this={thirdAppsChoiceModal}
  bind:isDisplayed={showThirdAppsChoiceDialog}
>
  {#snippet header()}
    <div >Applications</div>
  {/snippet}
  {#snippet content()}
    <div >
      <div class="p2">
        {#each appsTierceReferentielArray as group}
          <div class="mx-2 pt-8">
            <div class="font-bold text-2xl text-coopmaths-struct py-4">
              {group.rubrique}
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              {#each group.liste as app}
                <Card
                  application={app}
                  selected={appsTierceInExercisesList.includes(app.uuid)}
                />
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/snippet}
</BasicClassicModal>
