<script lang="ts">
  import { onMount } from 'svelte'
  import { ui } from '../model'
  import { 
    initialize,
    isSyncedUp,
    fetchAllAssets,
    wallet,
    synced
  } from '../model/store2'

  import Settings from './Settings.svelte'
  import Frame from './Frame2.svelte'
  import Intro from './Intro.svelte'
  import Gallery from './Gallery.svelte'

  const init = async () => {
    await initialize()
    // .then(async () => {
      
    // })
    // await model.initialize()
    
    // timeoutUI()
    const syncedUp = await isSyncedUp()

    // TODO: add background syncing...
    if (!syncedUp) {
      await fetchAllAssets()
    }
  }

  onMount(init)
  
  $: ({ showAllControls, showAllText } = ui)

  let timerMM
  let timerUI
  let timerTI

  const delayMM = 500
  const delayUI = 4000
  const delayTI = 8000
  let throttled = true

  const onInteract = () => {
    if (!throttled) {
      console.log("onInteract")
      if (timerMM) {
        clearTimeout(timerMM)
      }
      if (timerUI) {
        clearTimeout(timerUI)
      }
      if (timerTI) {
        clearTimeout(timerTI)
      }
      
      throttled = true
  
      if (!$showAllControls) {
        showAllControls.set(true)
      }
      if (!$showAllText) {
        showAllText.set(true)
      }
      timeoutMM()
      timeoutUI()
      timeoutTI()
    }
  }

  const timeoutMM = () => {
    timerMM = setTimeout(() => {
      throttled = false
    }, delayMM)
  }

  const timeoutUI = () => {
    timerUI = setTimeout(() => {
      console.log("timeoutUI()")
      showAllControls.set(false)
    }, delayUI)
  }

  const timeoutTI = () => {
    timerTI = setTimeout(() => {
      console.log("timeoutTI()")
      showAllText.set(false)
    }, delayTI)
  }

</script>

<main on:mousemove={onInteract} on:click={onInteract} on:keyup={onInteract} on:pointermove={onInteract}>

  <Settings />
  
  {#if $wallet && $synced?.finished}
    <Gallery />
    <Frame />
  {:else}
    <Intro />
  {/if}

</main>

<style style lang="postcss">
  main {
    @apply bg-grey-300 dark:bg-grey-700;
    @apply w-screen h-screen max-h-screen max-w-full;
    @apply flex items-center justify-center;
  }

</style>
