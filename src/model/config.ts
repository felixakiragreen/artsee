import { writable } from 'svelte/store'

import type { Config } from './types'

// const autoSync = writable(true)
// const autoHideControls = writable(4)
// const autoHideText = writable(8)
// const autoCycle = writable(60)
// const autoPlay = writable(true)

// export const settings = {
//   autoSync,
//   autoHideControls,
//   autoHideText,
//   autoCycle,
//   autoPlay,
// }

// const autoSync = writable(true)
// const autoHideControls = writable(4)
// const autoHideText = writable(8)
// const autoCycle = writable(60)
// const autoPlay = writable(true)

// export const config = writable<Config>({
//   autoSync: true,
//   autoHideControls: 4,
//   autoHideText: 8,
//   autoCycle: 60,
//   autoPlay: true,
// })


// These set the default config values
const createConfig = () => {
  const { subscribe, set, update } = writable<Config>({
    autoSync: true,
    autoHideControls: 4,
    autoHideText: 8,
    autoCycle: 60,
    autoPlay: true,
    startInFullScreen: false
  })

  const updateProp = (key: keyof Config, value) => {
    update((existing) => ({
      ...existing,
      [key]: value,
    }))
  }

  return {
    subscribe,
    set,
    update,
    updateProp,
  }
}

export const config = createConfig()
