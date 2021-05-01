<script lang="ts">
  import { onMount } from 'svelte'
  import {
    settings,
    ui,
  } from '../model'

  $: ({ showAllControls, showAllText, isAboveArt } = ui)
  $: ({ autoHideControls, autoHideText, autoCycle } = settings)

  onMount(async () => {
    if ($autoHideControls > 0) {
      timeoutUI()
    }
    if ($autoHideText > 0) {
      timeoutTI()
    }
  })

  let timerMM // mouse move
  let timerUI // user interface buttons
  let timerTI // text interface
  let timerSS // screensaver

  const delayMM = 500
  let throttled = false
  let enabled = ($autoHideControls !== 0 || $autoHideControls !== 0)

  const onInteract = () => {
    if (!throttled && enabled) {
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
    if ($autoHideControls > 0) {
      timerUI = setTimeout(() => {
        console.log(`timeoutUI(${$isAboveArt})`)
        // showAllControls.set(false)
        showAllControls.set($isAboveArt)
      }, $autoHideControls * 1000)
    }
  }

  const timeoutTI = () => {
    if ($autoHideText > 0) {
      timerTI = setTimeout(() => {
        console.log(`timeoutTI(${$isAboveArt})`)
        // showAllText.set(false)
        showAllText.set($isAboveArt)
      }, $autoHideText * 1000)
    }
  }

</script>

<svelte:window on:mousemove={onInteract} on:click={onInteract} on:keyup={onInteract} on:pointermove={onInteract} />