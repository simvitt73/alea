<script lang="ts">
  import type { Serie } from '../../../types'
  import SlideshowOverviewSeries from './SlideshowOverviewSerie.svelte'

  interface Props {
    isQuestionsVisible: boolean | undefined;
    isCorrectionVisible: boolean | undefined;
    currentSeriesIndex: number;
    order: number[];
    series: Serie[];
    correctionsSteps: number[];
  }

  let {
    isQuestionsVisible,
    isCorrectionVisible,
    currentSeriesIndex,
    order,
    series,
    correctionsSteps
  }: Props = $props();

</script>

{#each Array(series.length).keys() as seriesId}
  <div class={currentSeriesIndex === 4 || currentSeriesIndex === seriesId ? '' : 'hidden'}>
    <SlideshowOverviewSeries
      {isQuestionsVisible}
      {isCorrectionVisible}
      seriesIndex={seriesId}
      {order}
      {series}
      {correctionsSteps}
    />
  </div>
{/each}
