<script>
  const handleKeydown = e => {
    console.log('HANDLE KEY')
  }
</script>

<svelte:window on:keydown={handleKeydown} />