import { writable, Updater } from 'svelte/store'

export type WalletAddress = string

export type Model = {
  wallet?: WalletAddress // wallet address
  synced?: number // last time fully synced
  count?: number // number of assets
  assets?: OpenSeaAsset[] // array of open sea assets
}

export type OpenSeaAsset = {
  address: string
  tokenId: string
}

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
      // saveToStorage(model)
    }
  })

  return {
    subscribe,
    update,
    initialize: async () => {
      loadFromStorage().then((model) => {
        console.log('initialize() →', { model })
        set(model)
      })
    },
    fetchAll: async () => {
      let address: WalletAddress
      const unsub = subscribe((model) => {
        address = model.wallet
      })
      loadOpenSeaAssets(address).then((assets) => {
        console.log(`fetchAll(${address}) →`, { assets })
        update((model) => ({
          ...model,
          synced: new Date().valueOf(),
          assets: [...assets],
        }))
      })

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
      console.log('loadFromStorage() →', { data })

      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError)
      }

      if (data.wallet) {
        model.wallet = data.wallet
      }

      if (data.synced) {
        model.synced = data.synced
      }

      if (data.assets) {
        model.assets = data.assets
      }

      return resolve(model)
    })
  })
}

const saveToStorage = async (model: Model) => {
  console.log('saveToStorage() →', { model })
  chrome.storage.sync.set(model)
}

const loadOpenSeaAssets = async (
  address: WalletAddress,
  offset: number = 0,
  limit: number = 20,
): Promise<OpenSeaAsset[]> => {
  return new Promise((resolve, reject) => {
    let accAssets: OpenSeaAsset[] = []

    fetchOpenSeaAssets(address, offset, limit)
      .then((assets) => {
        accAssets = accAssets.concat(assets)

        if (assets.length < limit) {
          console.log('done fetching')
        } else {
          console.log('fetch more')
        }

        resolve(accAssets)
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

  console.log('fetchOpenSeaAssets()', url)

  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          console.log(json)

          resolve(json.assets.map((asset) => mapOpenSeaAsset(asset)))
          // chrome.storage.sync.set({ images: json.assets }, () => {
          //   console.log('Value is set to ', json.assets)
          // })
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
          console.log('fetched', json)

          resolve(json)
          // chrome.storage.sync.set({ images: json.assets }, () => {
          //   console.log('Value is set to ', json.assets)
          // })
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
