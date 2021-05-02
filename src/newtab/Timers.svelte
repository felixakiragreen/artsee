<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import {
    config,
    ui,
    assets,
    viewingIndex,
    randomInt,
  } from '../model'

  $: ({ showAllControls, showAllText, isAboveArt } = ui)

  onMount(async () => {
    if ($config.autoHideControls > 0) {
      timeoutUI()
    }
    if ($config.autoHideText > 0) {
      timeoutTI()
    }
    if ($config.autoCycle > 0) {
      timeoutSS()
    }
  })
  onDestroy(() => {
    clearTimeout(timerMM)
    clearTimeout(timerUI)
    clearTimeout(timerTI)
    clearTimeout(timerSS)
  })

  let timerMM // mouse move
  let timerUI // user interface buttons
  let timerTI // text interface
  let timerSS // screensaver

  const delayMM = 500
  let throttled = false
  let enabled = ($config.autoHideControls !== 0 || $config.autoHideControls !== 0 || $config.autoCycle !== 0)

  const onInteract = () => {
    if (!throttled && enabled) {
      // console.log("onInteract")
      if (timerMM) {
        clearTimeout(timerMM)
      }
      if (timerUI) {
        clearTimeout(timerUI)
      }
      if (timerTI) {
        clearTimeout(timerTI)
      }
      if (timerSS) {
        clearTimeout(timerSS)
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
      timeoutSS()
    }
  }

  const timeoutMM = () => {
    timerMM = setTimeout(() => {
      throttled = false
    }, delayMM)
  }

  const timeoutUI = () => {
    if ($config.autoHideControls > 0) {
      timerUI = setTimeout(() => {
        // console.log(`timeoutUI(${$isAboveArt})`)
        // showAllControls.set(false)
        showAllControls.set($isAboveArt)
      }, $config.autoHideControls * 1000)
    }
  }

  const timeoutTI = () => {
    if ($config.autoHideText > 0) {
      timerTI = setTimeout(() => {
        // console.log(`timeoutTI(${$isAboveArt})`)
        // showAllText.set(false)
        showAllText.set($isAboveArt)
      }, $config.autoHideText * 1000)
    }
  }

  const timeoutSS = () => {
    if ($config.autoCycle > 0) {
      timerSS = setTimeout(() => {
        // console.log("onScreenSave()")
        cycle()
        timeoutSS()
      }, $config.autoCycle * 1000)
    }
  }

  let lastIndex: number
  const cycle = () => {
    if (!$isAboveArt) {
      lastIndex = $viewingIndex
      let newIndex = randomInt($assets.length)
      let i = 0
      while (i < 10 && lastIndex === newIndex) {
        // console.log("cycle.tryAgain", { lastIndex, newIndex })
        i++
        newIndex = randomInt($assets.length)
      }
      viewingIndex.set(newIndex)
      
      timerTI = setTimeout(() => {
        showAllText.set(true)
        timeoutTI()
      }, 10)

      // console.log("cycle", { lastIndex, newIndex })
    }
  }

</script>

<svelte:window on:mousemove={onInteract} on:click={onInteract} on:keyup={onInteract} on:pointermove={onInteract} />