import { writable, derived } from 'svelte/store'
import { isEqual } from 'lodash'

import type { WalletAddress, Synced, OpenSeaAsset, Model } from './types'

import {
  loadStorage,
  saveStorage,
  mapToStorage,
  mapFromStorage,
  chunkAssets,
  dechunkAssets,
} from './storage'

import {
  loadOpenSeaAssets,
  fetchOpenSeaAssets,
  fetchMostRecentOpenSeaEvent,
} from './opensea'

export const wallet = writable<WalletAddress>('')
export const synced = writable<Synced>({})
export const assets = writable<OpenSeaAsset[]>([])

export const initialize = async () => {
  return loadStorage().then((data) => {
    console.log('store2.initialize() →', { data })

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

// export const currentAsset = derived(
//   [model, currentAssetIndex],
//   ([$model, $currentAssetIndex]) => $model.assets?.[$currentAssetIndex],
// )

const createPersistence = () => {
  console.log('createPersistence()')
  const unsubW = wallet.subscribe((wallet) => {
    chrome.storage.sync.get(null, (data) => {
      if (!isEqual(wallet, data.wallet)) {
        // saveStorage({ wallet })
      }
      // if (!isEqual(wallet, '') && !isEqual(wallet, data.wallet)) {
      //   saveStorage({ wallet })
      // }
    })
  })

  const unsubS = synced.subscribe((synced) => {
    chrome.storage.sync.get(null, (data) => {
      if (!isEqual(synced, data.synced)) {
        // saveStorage({ synced })
      }
      // if (!isEqual(synced, {}) && !isEqual(synced, data.synced)) {
      //   saveStorage({ synced })
      // }
    })
  })

  const unsubA = assets.subscribe((assets) => {
    chrome.storage.sync.get(null, (data) => {
      if (!isEqual(assets, dechunkAssets(data))) {
        // saveStorage(chunkAssets(assets))
      }
      // if (!isEqual(assets, []) && !isEqual(assets, dechunkAssets(data))) {
      //   saveStorage(chunkAssets(assets))
      // }
    })
  })
}

// export const persistence = createPersistence()

const setSyncStarted = () => {
  // set started, clear finished
  synced.update((existing) => ({
    ...existing,
    started: true,
    finished: undefined,
  }))
  // clear the assets
  assets.set([])
}

const setSyncFinished = () => {
  // unset started, log finished date
  synced.update((existing) => ({
    ...existing,
    error: undefined,
    started: false,
    finished: new Date().valueOf(),
  }))
}

const setSyncError = (error: string) => {
  synced.update((existing) => ({
    ...existing,
    started: false,
    finished: undefined,
    error,
  }))
}

const incrSyncAssets = (fetchedAssets) => {
  assets.update((existingAssets) => {
    const assets = (existingAssets || []).concat(fetchedAssets)

    synced.update((existing) => ({
      ...existing,
      count: assets.length,
    }))

    return assets
  })
}

export const fetchAllAssets = async () => {
  setSyncStarted()

  let address: WalletAddress
  let syncStarted: boolean
  const unsubW = wallet.subscribe((w) => {
    address = w
  })
  const unsubS = synced.subscribe((s) => {
    syncStarted = s.started
  })

  console.log(`store.fetchAll(${address})`, syncStarted)

  if (address) {
    let i = 0
    let imax = 50
    let limit = 20
    let timer = null
    let delay = 1000

    await fetchLatestEvent(address).then((event) => {
      synced.update((existing) => ({
        ...existing,
        eventId: event.id,
      }))
    })

    const fetchAssets = async (offset: number) => {
      await loadOpenSeaAssets(address, offset).then((assets) => {
        console.log(`store.loadOpenSeaAssets(${offset}) →`, { assets })

        incrSyncAssets(assets)

        if (assets.length > 0 && i < imax && syncStarted) {
          console.log('store.fetching loop...', assets, i, syncStarted)
          i++
          timer = setTimeout(() => {
            fetchAssets(offset + limit)
          }, delay)
        } else {
          setSyncFinished()
          clearTimeout(timer)
        }
      })
    }

    fetchAssets(0)
  } else {
    setSyncError('address not defined BITCH!')
  }
}

const fetchLatestEvent = async (address) => {
  if (address) {
    return fetchMostRecentOpenSeaEvent(address)
      .then((fetched) => fetched)
      .catch((err) => {
        console.error(`couldn't fetch most recent event`, err)
      })
  } else {
    console.error('address not defined')
  }
}

export const isSyncedUp = async () => {
  let address: WalletAddress
  let eventId: string
  const unsubW = wallet.subscribe((w) => {
    address = w
  })
  const unsubS = synced.subscribe((s) => {
    eventId = s.eventId
  })

  if (address && eventId) {
    const fetchedLatestEvent = await fetchLatestEvent(address)

    // console.log('isSyncedUp()', { eventId, fetchedLatestEvent })

    return isEqual(eventId, fetchedLatestEvent.id)
  } else {
    return false
  }
}
