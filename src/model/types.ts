export type WalletAddress = string

export type Synced = {
  started?: boolean
  count?: number
  finished?: number // time the sync was finished
  eventId?: string // most recent OpenSea event ID
  error?: string
}

export type Model = {
  wallet?: WalletAddress // wallet address
  synced?: Synced
  assets?: OpenSeaAsset[] // array of open sea assets
  config?: Config
}

export type StorageModel = {
  wallet?: WalletAddress // wallet address
  synced?: Synced
  config?: Config
} & AssetStorage

export type AssetStorage = {
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

export type MediumTag = 'video' | 'image' | 'media' | 'audio'
export type Medium = {
  tag: MediumTag
  file: string
}

export type Config = {
  autoSync: boolean
  autoHideControls: number
  autoHideText: number
  autoCycle: number
  autoPlay: boolean
}
