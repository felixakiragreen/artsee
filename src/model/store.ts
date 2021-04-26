import { writable } from 'svelte/store'
import isEqual from 'lodash.isequal'

import type { WalletAddress, Model } from './types'

import {
  loadStorage,
  saveStorage,
  mapToStorage,
  mapFromStorage,
} from './storage'

import { loadOpenSeaAssets } from './opensea'

const createModel = () => {
  const { subscribe, set, update } = writable<Model>({})

  const unsub = subscribe((model) => {
    console.log('store.subscribe _ to model changes', model)
    if (model && !isEqual(model, {})) {
      chrome.storage.sync.get(null, (data) => {
        const shouldSaveModel = !isEqual(mapFromStorage(data), model)
        console.log(
          'store.subscribe _ save model to storage?',
          shouldSaveModel,
          {
            data,
            model,
          },
        )

        if (shouldSaveModel) {
          saveStorage(mapToStorage(model))
        }
      })
    }
  })

  const setSyncStarted = () => {
    update((model) => ({
      ...model,
      status: {
        ...model?.status,
        started: true,
        finished: undefined,
      },
    }))
  }

  const setSyncFinished = () => {
    update((model) => ({
      ...model,
      status: {
        ...model?.status,
        started: false,
        finished: new Date().valueOf(),
      },
    }))
  }

  const setSyncError = (error: string) => {
    update((model) => ({
      ...model,
      status: {
        ...model?.status,
        started: false,
        finished: undefined,
        error,
      },
    }))
  }

  const syncAssets = (fetchedAssets) => {
    update((model) => {
      const assets = [...(model?.assets || []), ...fetchedAssets]

      return {
        ...model,
        status: {
          ...model?.status,
          count: assets.length,
        },
        assets,
      }
    })
  }

  return {
    set,
    subscribe,
    update,
    initialize: async () => {
      loadStorage().then((model) => {
        console.log('store.initialize() →', { model })

        if (!isEqual(model, {})) {
          set(mapFromStorage(model))
        }
      })
    },
    fetchAll: async () => {
      setSyncStarted()

      let address: WalletAddress
      let syncStarted: boolean
      const unsub = subscribe((model) => {
        address = model.wallet
        syncStarted = model.status?.started
      })

      console.log(`store.fetchAll(${address}`, syncStarted)

      if (address) {
        let i = 0
        let imax = 50
        let limit = 20
        let timer = null
        let delay = 2000

        const fetchAssets = async (offset: number) => {
          await loadOpenSeaAssets(address, offset).then((assets) => {
            console.log(`store.loadOpenSeaAssets(${offset}) →`, { assets })

            syncAssets(assets)

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

            // USE SYNC COUNT as offset
            // IF we return 0 then we mark syncing finished
            // ELSE if syncing isn't finished, go again.

            // setSyncStarted(true)
          })
        }

        fetchAssets(0)
      } else {
        setSyncError('address not defined BITCH!')
      }

      // return new Promise((resolve, reject) => {

      //   if (address) {
      //     let assets = await loadOpenSeaAssets(address)
      //   } else {
      //     reject("no wallet address")
      //   }

      // })
      // update(async (model: Model): Promise<Model> => {

      // })
    },
    // increment: () => update(n => n + 1),
    // decrement: () => update(n => n - 1),
    // reset: () => set(0)
  }
}

export const model = createModel()
