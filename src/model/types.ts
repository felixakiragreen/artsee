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

export type StorageModel = {
  wallet?: WalletAddress // wallet address
  synced?: {
    started?: boolean
    count?: number
    finished?: number // time the sync was finished
    error?: string
  }
  ass000?: OpenSeaAsset[]
  ass001?: OpenSeaAsset[]
  ass002?: OpenSeaAsset[]
  ass003?: OpenSeaAsset[]
  ass004?: OpenSeaAsset[]
  ass005?: OpenSeaAsset[]
  ass006?: OpenSeaAsset[]
  ass007?: OpenSeaAsset[]
  ass008?: OpenSeaAsset[]
  ass009?: OpenSeaAsset[]
}

export type OpenSeaAsset = {
  c: string
  t: string
}
