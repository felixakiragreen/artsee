<script>
  import { ui } from '../model'
  // Watch for current state, if typing in input or if options screen is open
  // Listen for specific keys
  // On keydown, dispatch action to Frame component
  // In Frame, read payload and call the correct function

  $: ({ showSettings } = ui)
  
  const handleKeydown = e => {
    let key = e.key

    if (!$showSettings) {
      if (key === 'ArrowLeft') console.log('hit!', key)
      if (key === 'ArrowRight') console.log('hit!', key)
      if (key === 'F') console.log('hit!', key)
      if (key === 'f') console.log('hit!', key)
      if (key === ' ') console.log('hit!', key)
      if (key === 'Escape') console.log('hit!', key)
      if (key === '[') console.log('hit!', key)
      if (key === ']') console.log('hit!', key)
    } else if ($showSettings) {
      if (key === 'Escape') $showSettings = !$showSettings
    }

    // console.log('handleKeydown', key)
    // console.log('handleKeydown', $showSettings)
  }
</script>

<svelte:window on:keydown={handleKeydown} />