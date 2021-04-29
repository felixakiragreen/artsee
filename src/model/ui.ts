import { writable } from 'svelte/store'

const showAllControls = writable(true)
const showAllText = writable(true)
// const autoHide = writable(true)

export const ui = {
  showAllControls,
  showAllText,
}

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
