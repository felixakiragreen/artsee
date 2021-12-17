<script>
  // Watch for current state, if typing in input or if options screen is open
  // Listen for specific keys
  // On keydown, dispatch action to Frame component
  // In Frame, read payload and call the correct function

  let isSettingsOpen
  
  const handleKeydown = e => {
    let key = e.key

    console.log('handleKeydown', key)
  }
</script>

<svelte:window on:keydown={handleKeydown} />