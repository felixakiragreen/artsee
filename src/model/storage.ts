import chunk from 'lodash.chunk'

import type { WalletAddress, Model, StorageModel, OpenSeaAsset } from './types'

export const loadStorage = async (): Promise<Model> => {
  return new Promise((resolve, reject) => {
    let model: Model = {}

    chrome.storage.sync.get(null, (data) => {
      console.log('storage.loadFromStorage() →', { data })

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

export const saveStorage = async (model: Model) => {
  console.log('storage.saveToStorage() →', { model })
  chrome.storage.sync.set(model)
}

export const logStorage = async () => {
  chrome.storage.sync.get(null, (data) => {
    console.log('storage.logStorage() →', { data })
  })
}

export const deleteStorage = async () => {
  chrome.storage.sync.clear(() => {
    console.log('storage.delStorage()')
  })
}

export const pad = (id: number | string, length = 3): string =>
  `000${id}`.slice(-length)

const CHUNK_SIZE = 100

export const mapToStorage = (model: Model): StorageModel => {
  const chunkedAssets = chunk(model.assets, CHUNK_SIZE)

  console.log('b4', model)

  let storage = { ...model }

  delete storage.assets

  console.log('a5', storage)

  chunkedAssets.map((eachChunk, index) => {
    storage[`ass${pad(index)}`] = [...eachChunk]
  })

  console.log('a6', storage)

  return storage
}

export const mapFromStorage = (storage: StorageModel): Model => {
  let assets: OpenSeaAsset[] = []

  let model = {
    ...(storage || {}),
  }

  console.log('b4', model)

  for (let i = 0; i < 9; i++) {
    let id = `ass${pad(i)}`
    let chunkedAssets = storage[id]

    console.log({ chunkedAssets })

    if (chunkedAssets) {
      assets = assets.concat(chunkedAssets)
      delete model[id]
    }
  }

  model.assets = assets

  console.log('a5', model)

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
