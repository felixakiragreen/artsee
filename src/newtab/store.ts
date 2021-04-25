import { writable, Updater } from 'svelte/store'

export type WalletAddress = string

export type Model = {
  wallet?: WalletAddress // wallet address
  synced?: {
    started?: boolean
    count?: number
    finished?: number // time the sync was finished
    error?: string
  }
  assets?: OpenSeaAsset[] // array of open sea assets
}

// nftAll
// nft001
// nft002

export type OpenSeaAsset = {
  address: string
  tokenId: string
}

// ass_01, ass_02, ass_03 ...
//

const createModel = () => {
  const { subscribe, set, update } = writable<Model>({})

  // const set = (model: Model) => {
  //   setDirect(model)
  //   saveToStorage(model)
  // }

  // const update = (updater: Updater<Model>) => {
  //   updateDirect(updater)
  // }

  // TODO: update so it only does it when dirty....
  const unsub = subscribe((model) => {
    console.log('subscribed', model)
    if (model && Object.keys(model).length > 0) {
      // TEMPORARILY COMMENTING OUT
      saveToStorage(model)
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
      loadFromStorage().then((model) => {
        console.log('store.initialize() →', { model })
        set(model)
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
        let imax = 4
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

const loadFromStorage = async (): Promise<Model> => {
  return new Promise((resolve, reject) => {
    let model: Model = {}

    chrome.storage.sync.get(null, (data) => {
      console.log('store.loadFromStorage() →', { data })

      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError)
      }

      model = data

      // if (data.wallet) {
      //   model.wallet = data.wallet
      // }

      // if (data.synced) {
      //   model.synced = data.synced
      // }

      // if (data.assets) {
      //   model.assets = data.assets
      // }

      return resolve(model)
    })
  })
}

const saveToStorage = async (model: Model) => {
  console.log('store.saveToStorage() →', { model })
  chrome.storage.sync.set(model)
}

const loadOpenSeaAssets = async (
  address: WalletAddress,
  offset: number = 0,
  limit: number = 20,
): Promise<OpenSeaAsset[]> => {
  return new Promise((resolve, reject) => {
    fetchOpenSeaAssets(address, offset, limit)
      .then((assets) => {
        resolve(assets)
      })
      .catch((err) => {
        console.error(err)
        reject(err)
      })
  })
}

const OPENSEA_ASSETS_URL = 'https://api.opensea.io/api/v1/assets'

const fetchOpenSeaAssets = async (
  address: WalletAddress,
  offset: number = 0,
  limit: number = 20,
): Promise<OpenSeaAsset[]> => {
  const url = `${OPENSEA_ASSETS_URL}?owner=${address}&order_direction=desc&offset=${offset}&limit=${limit}`

  console.log('store.fetchOpenSeaAssets()', url)

  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          console.log('store.fetchOpenSeaAssets() → ', { json })
          resolve(json.assets.map((asset) => mapOpenSeaAsset(asset)))
        })
    } catch (err) {
      console.error(err)
      reject(err)
    }
  })
}

const mapOpenSeaAsset = (object: any): OpenSeaAsset => {
  return {
    address: object['asset_contract']?.address,
    tokenId: object['token_id'],
  }
}

const OPENSEA_ASSET_URL = 'https://api.opensea.io/api/v1/asset'

export const fetchOpenSeaAsset = (
  address: string,
  tokenId: string,
): Promise<Object> => {
  const url = `${OPENSEA_ASSET_URL}/${address}/${tokenId}`

  console.log('fetchOpenSeaAsset()', url)

  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          console.log('store.fetchOpenSeaAsset() → ', { json })

          resolve(json)
        })
    } catch (err) {
      console.error(err)
      reject(err)
    }
  })
}

// {
//   "id":21042046
//   "token_id":"449"
//   "num_sales":0
//   "background_color":NULL
//   "image_url":"https://storage.opensea.io/files/60b5369b934048376a47eb8a72a854f4.svg"
//   "image_preview_url":"https://storage.opensea.io/files/60b5369b934048376a47eb8a72a854f4.svg"
//   "image_thumbnail_url":"https://storage.opensea.io/files/60b5369b934048376a47eb8a72a854f4.svg"
//   "image_original_url":"https://cryptojunks.wtf/art/449"
//   "animation_url":NULL
//   "animation_original_url":NULL
//   "name":"CryptoJunk #0449"
//   "description":"01 11 00 A9 0A 18 7D 00"
//   "external_link":"https://cryptojunks.wtf/deets/449"
//   "asset_contract":{...}
// "asset_contract":{
//   "address":"0x585a2c37858d3b03824bc683829e4dbbf58969ee"
//   "owner":{...}
//   "permalink":"https://opensea.io/assets/0x585a2c37858d3b03824bc683829e4dbbf58969ee/449"
//   "collection":{...}
//   "decimals":0
//   "sell_orders":NULL
//   "creator":{...}
//   "traits":[...]
//   "last_sale":NULL
//   "top_bid":NULL
//   "listing_date":NULL
//   "is_presale":false
//   "transfer_fee_payment_token":NULL
//   "transfer_fee":NULL
//   }
