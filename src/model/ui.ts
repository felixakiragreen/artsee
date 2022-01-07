import { writable } from 'svelte/store'

const showAllControls = writable(true)
const showAllText = writable(true)
const isAboveArt = writable(false)
const showSettings = writable(false)
// const autoHide = writable(true)

const isFullScreen = writable(false)

export const ui = {
  showAllControls,
  showAllText,
  isAboveArt,
  showSettings,
  isFullScreen
}


// Persist certain settings in storage...

/*

settings

backgrounds
- light
- dark
- dominant color

autohide
- controls
- text

screensave


TODO: move the timers to the store
so that I can reset then on interacting with iframes




*/
