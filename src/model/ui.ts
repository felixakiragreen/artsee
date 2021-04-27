import { writable } from 'svelte/store'

const showAllControls = writable(true)
const showAllText = writable(true)

export const ui = {
  showAllControls,
  showAllText,
}
