<script lang="ts">
  import { onMount } from 'svelte'
  import { 
    initialize,
    isSyncedUp,
    fetchAllAssets,
    wallet,
    synced
  } from '../model'

  import Settings from './Settings.svelte'
  import Frame from './Frame2.svelte'
  import Intro from './Intro.svelte'
  import Gallery from './Gallery.svelte'
  import Timers from './Timers.svelte'

  const init = async () => {
    await initialize()
    
    const syncedUp = await isSyncedUp()

    // TODO: add background syncing...
    if (!syncedUp) {
      await fetchAllAssets()
    }
  }

  onMount(init)
  
</script>

<main>

  <Timers />
  <Settings />
  
  {#if $wallet && $synced.finished}
    <Gallery />
    <Frame />
  {:else}
    <Intro />
  {/if}

</main>

<style style lang="postcss">
  main {
    /* @apply bg-grey-300 dark:bg-grey-700; */
    @apply bg-grey-700;
    @apply w-screen h-screen max-h-screen max-w-full;
    @apply flex items-center justify-center;
  }

</style>
