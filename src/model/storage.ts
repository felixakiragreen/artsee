import { chunk } from 'lodash'

import type { Model, StorageModel, OpenSeaAsset, AssetStorage } from './types'

export const loadStorage = async (): Promise<StorageModel> => {
  return new Promise((resolve, reject) => {
    let model: StorageModel = {}

    chrome.storage.sync.get(null, (data) => {
      // console.log('storage.loadFromStorage() →', { data })

      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError)
      }

      model = data

      return resolve(model)
    })
  })
}

export const saveStorage = async (model: StorageModel) => {
  console.log('storage.saveToStorage() →', { model })
  chrome.storage.sync.set(model)
}

export const logStorage = async () => {
  chrome.storage.sync.get(null, (data) => {
    console.log('storage.logStorage() →', { data })
  })
}

export const nukeStorage = async () => {
  chrome.storage.sync.clear(() => {
    console.log('storage.nukeStorage()')
  })
}

export const deleteStorage = async (keys: string | string[]) => {
  chrome.storage.sync.remove(keys, () => {
    console.log('storage.delStorage()')
  })
}

export const pad = (id: number | string, length = 3): string =>
  `000${id}`.slice(-length)

const CHUNK_SIZE = 100

export const mapToStorage = (model: Model): StorageModel => {
  const chunkedAssets = chunk(model.assets, CHUNK_SIZE)

  // console.log('mapToStorage()', { model })

  let storage = { ...model }

  delete storage.assets

  // console.log('mapToStorage()', { storage })

  chunkedAssets.map((eachChunk, index) => {
    storage[`ass${pad(index)}`] = [...eachChunk]
  })

  console.log('mapToStorage()', { model, storage })

  return storage
}

export const mapFromStorage = (storage: StorageModel): Model => {
  let assets: OpenSeaAsset[] = []

  let model = {
    ...(storage || {}),
  }

  // console.log('mapFromStorage()', { model })

  for (let i = 0; i < 9; i++) {
    let id = `ass${pad(i)}`
    let chunkedAssets = storage[id]

    // console.log('mapFromStorage()', { chunkedAssets })

    if (chunkedAssets) {
      assets = assets.concat(chunkedAssets)
      delete model[id]
    }
  }

  model.assets = assets

  console.log('mapFromStorage()', { storage, model })

  return model
}

// nftAll
// nft000
// nft001
// nft002

// update assets....

/*
on load....

join all the assets into a massive array
on save 


chunk



*/

export const chunkAssets = (assets: OpenSeaAsset[]): AssetStorage => {
  return chunk(assets, CHUNK_SIZE).reduce(
    (acc, eachChunk, index) => ({
      ...acc,
      [`ass${pad(index)}`]: [...eachChunk],
    }),
    {},
  )
}

export const dechunkAssets = (storage: StorageModel): OpenSeaAsset[] => {
  let assets: OpenSeaAsset[] = []

  for (let i = 0; i < 9; i++) {
    let id = `ass${pad(i)}`
    let chunkedAssets = storage[id]

    if (chunkedAssets) {
      assets = assets.concat(chunkedAssets)
    }
  }

  return assets
}
