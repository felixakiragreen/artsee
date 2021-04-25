import type { WalletAddress, Model, OpenSeaAsset } from './types'

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
