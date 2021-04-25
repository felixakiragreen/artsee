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
