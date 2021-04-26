import { writable } from 'svelte/store'

const showAllControls = writable(true)

export const ui = {
  showAllControls,
}
