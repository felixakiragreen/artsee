<script>
  import { ui } from '../model'
  // Watch for current state, if typing in input or if options screen is open
  // Listen for specific keys
  // On keydown, dispatch action to Frame component
  // In Frame, read payload and call the correct function

  $: ({ showSettings, isFullScreen } = ui)

  export let dispatch;
  
  export const handleKeydown = e => {
    let key = e.key

    if (!$showSettings) {
      if (key === 'ArrowLeft') dispatch('LEFT')
      if (key === 'ArrowRight') dispatch('RIGHT')
      if (key === 'F') dispatch('EXPAND')
      if (key === 'f') dispatch('EXPAND')
      if (key === ' ') dispatch('RANDOM')
      if (key === '[') dispatch('FIRST')
      if (key === ']') dispatch('LAST')
      if ($isFullScreen) {
        if (key === 'Escape') isFullScreen.update(isFS => !isFS)
      }
    } else if ($showSettings) {
      if (key === 'Escape') $showSettings = !$showSettings
    }

    // console.log('handleKeydown', key)
    // console.log('handleKeydown', $showSettings)
  }
</script>

<svelte:window on:keydown={handleKeydown} />