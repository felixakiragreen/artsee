import { writable } from 'svelte/store'

const autoSync = writable(true)
const autoHideControls = writable(4)
const autoHideText = writable(8)
const autoCycle = writable(60)
const autoPlay = writable(true)

export const settings = {
  autoSync,
  autoHideControls,
  autoHideText,
  autoCycle,
  autoPlay,
}
