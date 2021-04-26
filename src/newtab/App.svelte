<script lang="ts">
  import { onMount } from 'svelte'
  import { model, ui } from '../model'

  import Settings from './Settings.svelte'
  import Frame from './Frame2.svelte'

  const init = async () => {
    await model.initialize()

    timeoutUI()
  }

  onMount(init)
  
  $: ({ showAllControls } = ui)

  let timerUI
  let timerMM

  const delayUI = 5000
  const delayMM = 500
  let throttled = false

  const onInteract = () => {
    if (!throttled) {
      console.log("onInteract")
      if (timerUI) {
        clearTimeout(timerUI)
      }
      if (timerMM) {
        clearTimeout(timerMM)
      }
      throttled = true
  
      if (!$showAllControls) {
        showAllControls.set(true)
      }
      timeoutMM()
      timeoutUI()
    }
  }

  const timeoutUI = () => {
    timerUI = setTimeout(() => {
      console.log("timeoutUI()")
      showAllControls.set(false)
    }, delayUI)
  }

  const timeoutMM = () => {
    timerMM = setTimeout(() => {
      throttled = false
    }, delayMM)
  }

</script>

<main on:mousemove={onInteract} on:click={onInteract} on:keyup={onInteract} on:pointermove={onInteract}>

  <Settings />
  <Frame />

</main>

<style style lang="postcss">
  main {
    @apply bg-grey-100 dark:bg-grey-900;
    @apply w-screen h-screen max-h-screen max-w-full;
    @apply flex items-center justify-center;
  }

</style>
