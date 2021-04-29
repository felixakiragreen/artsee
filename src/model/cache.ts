// https://opensea.io/assets/0x2e90ce7898dc43be7837b007d53838c3962d44d5/14

// permalink

import { writable, derived } from 'svelte/store'
import { derivedPromisable } from 'svelte-promisable-stores'

// import { model } from './store'
import { assets } from './store2'
import { fetchOpenSeaAsset, fetchOpenSeaAssetUrl } from './opensea'
import type { OpenSeaAsset } from './types'

// TODO: update to use store2

export const viewingIndex = writable(0)

export const viewingAsset = derived(
  [assets, viewingIndex],
  ([$assets, $viewingIndex]) => $assets[$viewingIndex],
)

const cache = new Map()

const retrieveAssetData = async ($asset) => {
  console.log('fetchAssetData()', { $asset })
  const url = fetchOpenSeaAssetUrl($asset.c, $asset.t)

  if (cache.has(url)) {
    console.log('cached', { url }, cache.get(url))
    return Promise.resolve(cache.get(url))
  } else {
    console.log('fetching', { url })
    return new Promise((resolve, reject) => {
      fetchOpenSeaAsset($asset.c, $asset.t)
        .then((result) => {
          cache.set(url, result)
          resolve(result)
        })
        .catch((err) => reject(err))
    })
  }
}

export const cachedAssetData = derivedPromisable(
  viewingAsset,
  retrieveAssetData,
  // (current, $asset, previousAsset) => {
  //   console.log('cachedAsset', current, $asset, previousAsset)
  //   return true
  // },
)

// export const getNftData = (asset: OpenSeaAsset) => {

//   const store = writable

// }

// (currentStateData, $searchTerm, previousSearchTerm) =>
// $searchTerm && $searchTerm !== previousSearchTerm,
// fetchOpenSeaAsset

// const createCache = () => {

//   const { subscribe, set, update } = writable<>({})

// }

// export const cache = createCache()
