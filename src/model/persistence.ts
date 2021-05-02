import { isEqual } from 'lodash'

import { wallet, synced, assets } from './store'
import { config } from './config'

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
    if (data.config) {
      config.set(data.config)
    }

    createPersistence()
  })
}

const createPersistence = () => {
  console.log('createPersistence()')
  const unsub1 = wallet.subscribe((wallet) => {
    chrome.storage.sync.get(null, (data) => {
      // if (!isEqual(wallet, data.wallet)) {
      //   saveStorage({ wallet })
      // }
      if (!isEqual(wallet, '') && !isEqual(wallet, data.wallet)) {
        saveStorage({ wallet })
      }
    })
  })

  const unsub2 = synced.subscribe((synced) => {
    chrome.storage.sync.get(null, (data) => {
      // if (!isEqual(synced, data.synced)) {
      //   saveStorage({ synced })
      // }
      if (!isEqual(synced, {}) && !isEqual(synced, data.synced)) {
        saveStorage({ synced })
      }
    })
  })

  const unsub3 = assets.subscribe((assets) => {
    chrome.storage.sync.get(null, (data) => {
      // if (!isEqual(assets, dechunkAssets(data))) {
      //   saveStorage(chunkAssets(assets))
      // }
      if (!isEqual(assets, []) && !isEqual(assets, dechunkAssets(data))) {
        saveStorage(chunkAssets(assets))
      }
    })
  })

  const unsub4 = config.subscribe((config) => {
    chrome.storage.sync.get(null, (data) => {
      if (!isEqual(config, {}) && !isEqual(config, data.config)) {
        saveStorage({ config })
      }
    })
  })
}

export const deletePersistence = () => {
  wallet.set('')
  synced.set({})
  assets.set([])
  deleteStorage(['wallet', 'synced', 'assets'])
}
