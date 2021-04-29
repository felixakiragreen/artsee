import type { WalletAddress, OpenSeaAsset } from './types'

export const loadOpenSeaAssets = async (
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

export const fetchOpenSeaAssets = async (
  address: WalletAddress,
  offset: number = 0,
  limit: number = 20,
): Promise<OpenSeaAsset[]> => {
  const url = `${OPENSEA_ASSETS_URL}?owner=${address}&order_direction=desc&offset=${offset}&limit=${limit}`

  // doing this makes it so that all of them don't load...?
  // &order_by=sale_date

  console.log('store.fetchOpenSeaAssets()', url)

  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          console.log('store.fetchOpenSeaAssets() → ', { json })
          const newShit = {
            ...json,
          }
          resolve(newShit.assets.map((asset) => mapOpenSeaAsset(asset)))
        })
    } catch (err) {
      console.error(err)
      reject(err)
    }
  })
}

export const mapOpenSeaAsset = (object: any): OpenSeaAsset => {
  return {
    c: object['asset_contract']?.address,
    t: object['token_id'],
  }
}

const OPENSEA_ASSET_URL = 'https://api.opensea.io/api/v1/asset'

export const fetchOpenSeaAssetUrl = (
  address: string,
  tokenId: string,
): string => `${OPENSEA_ASSET_URL}/${address}/${tokenId}`

export const fetchOpenSeaAsset = (
  address: string,
  tokenId: string,
): Promise<Object> => {
  const url = fetchOpenSeaAssetUrl(address, tokenId)

  console.log('store.fetchOpenSeaAsset()', url)

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

const OPENSEA_EVENTS_URL = 'https://api.opensea.io/api/v1/events'

export const fetchMostRecentOpenSeaEvent = async (
  address: WalletAddress,
  offset: number = 0,
  limit: number = 1,
): Promise<Object> => {
  const url = `${OPENSEA_EVENTS_URL}?account_address=${address}&only_opensea=false&offset=${offset}&limit=${limit}`

  // 'https://api.opensea.io/api/v1/events?account_address=0xc0d4a42dd3cf5ac320d82e20a1285b50efe26615&only_opensea=false&offset=0&limit=20'

  console.log('store.fetchMostRecentOpenSeaEvents()', url)

  return new Promise((resolve, reject) => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          console.log('store.fetchMostRecentOpenSeaEvents() → ', { json })
          resolve(json['asset_events'][0])
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
