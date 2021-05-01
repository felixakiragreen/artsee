import { isEqual } from 'lodash'

import { wallet, synced, assets } from './store'

import {
  loadStorage,
  saveStorage,
  deleteStorage,
  chunkAssets,
  dechunkAssets,
} from './storage'

export const initialize = async () => {
  return loadStorage().then((data) => {
    console.log('persistence.initialize() →', { data })

    if (data.wallet) {
      wallet.set(data.wallet)
    }
    if (data.synced) {
      synced.set(data.synced)
    }
    if (data.ass000) {
      assets.set(dechunkAssets(data))
    }

    createPersistence()
  })
}

const createPersistence = () => {
  console.log('createPersistence()')
  const unsubW = wallet.subscribe((wallet) => {
    chrome.storage.sync.get(null, (data) => {
      // if (!isEqual(wallet, data.wallet)) {
      //   saveStorage({ wallet })
      // }
      if (!isEqual(wallet, '') && !isEqual(wallet, data.wallet)) {
        saveStorage({ wallet })
      }
    })
  })

  const unsubS = synced.subscribe((synced) => {
    chrome.storage.sync.get(null, (data) => {
      // if (!isEqual(synced, data.synced)) {
      //   saveStorage({ synced })
      // }
      if (!isEqual(synced, {}) && !isEqual(synced, data.synced)) {
        saveStorage({ synced })
      }
    })
  })

  const unsubA = assets.subscribe((assets) => {
    chrome.storage.sync.get(null, (data) => {
      // if (!isEqual(assets, dechunkAssets(data))) {
      //   saveStorage(chunkAssets(assets))
      // }
      if (!isEqual(assets, []) && !isEqual(assets, dechunkAssets(data))) {
        saveStorage(chunkAssets(assets))
      }
    })
  })
}

export const deletePersistence = () => {
  wallet.set('')
  synced.set({})
  assets.set([])
  deleteStorage()
}
