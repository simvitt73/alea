import { exercicesParams, globalOptions } from './stores/generalStore'
import { get } from 'svelte/store'

export function sendActivityParams () {
  console.log('toto')
  window.parent.postMessage({ toto: 2 }, '*')
  window.parent.postMessage(
    {
      exercicesParams: get(exercicesParams),
      globalOptions: get(globalOptions),
      action: 'mathalea:activityParams'
    },
    '*'
  )
}
