import { writable } from 'svelte/store'
import { isEqual, uniqWith, concat } from 'lodash'

import type { WalletAddress, Synced, OpenSeaAsset } from './types'

import { loadOpenSeaAssets, fetchMostRecentOpenSeaEvent } from './opensea'

export const wallet = writable<WalletAddress>('')
export const synced = writable<Synced>({})
export const assets = writable<OpenSeaAsset[]>([])

// for syncing....
let timer = null

const setSyncStarted = () => {
  // set started, clear finished
  synced.update((existing) => ({
    ...existing,
    started: true,
    // finished: undefined,
  }))
}

const setSyncFinished = () => {
  // unset started, log finished date
  synced.update((existing) => ({
    ...existing,
    error: undefined,
    started: false,
    finished: new Date().valueOf(),
  }))
  clearTimeout(timer)
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
    const assets = uniqWith(
      concat(existingAssets || [], fetchedAssets),
      isEqual,
    )

    synced.update((existing) => ({
      ...existing,
      count: assets.length,
    }))

    return assets
  })
}

export const clearAssets = () => {
  // clear the assets
  assets.set([])
}

export const stopSync = () => {
  clearTimeout(timer)
  synced.update((existing) => ({
    ...existing,
    error: undefined,
    started: false,
  }))
}

export const storeF = () => {
  synced.update((existing) => ({
    ...existing,
    error: undefined,
    eventId: '',
    started: false,
  }))
  assets.update((existing) => {
    existing.pop()
    return existing
  })
}

// This is called for initial setup (or when wallet changes)
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
    let imax = 20
    let limit = 50
    let delay = 1500

    await fetchLatestEvent(address).then((event) => {
      synced.update((existing) => ({
        ...existing,
        eventId: event.id,
      }))
    })

    const fetchAssets = async (offset: number) => {
      await loadOpenSeaAssets(address, offset, limit).then((assets) => {
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

    timer = setTimeout(() => {
      fetchAssets(0)
    }, delay)
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
