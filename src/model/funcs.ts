import { get } from 'lodash'
import type { Medium, MediumTag } from './types'

export const getFileTypeFromUrl = (url: string): string => {
  let type = url.split('.').pop()

  // console.log('getFileTypeFromUrl()', url, type)

  if (type && type.length < 5) {
    return type
  }
}

export const figureOutUndefined = async (url: string) => {
  let req = new Request(url)

  return fetch(req)
    .then((res) => {
      // console.log(JSON.stringify(res.headers, null, 2), res)
      return res.blob()
    })
    .then((res) => {
      // console.log({ res })
      const [tag, file] = res.type.split('/')
      return remapTypes({
        tag,
        file,
      })
    })
}

export const getType = (asset): Medium => {
  let file: string
  let tag: MediumTag

  // animation
  if (asset['animation_url']) {
    file = getFileTypeFromUrl(asset['animation_url'])
    tag = 'video'
  }

  if (!file && asset['animation_original_url']) {
    file = getFileTypeFromUrl(asset['animation_original_url'])
    tag = 'video'
  }

  // image
  if (!file && asset['image_url']) {
    file = getFileTypeFromUrl(asset['image_url'])
    tag = 'image'
  }

  if (!file && asset['image_original_url']) {
    file = getFileTypeFromUrl(asset['image_original_url'])
    tag = 'image'
  }

  // console.log('getType()', tag, file)

  return remapTypes({
    tag,
    file,
  })
}

const remapTypes = (medium: Medium): Medium => {
  let { tag, file } = medium

  switch (true) {
    case file === 'html':
      tag = 'media'
      break
    case file === 'mp3':
      tag = 'audio'
      break
  }

  return {
    tag,
    file,
  }
}

export const getUrl = (asset) => {
  if (asset['animation_url']) {
    return asset['animation_url']
  } else if (asset['animation_original_url']) {
    return asset['animation_original_url']
  } else if (asset['image_url']) {
    return asset['image_url']
  } else if (asset['image_original_url']) {
    return asset['image_original_url']
  } else {
    console.error('getUrl() could not find URL for:', { asset })
    return ''
  }
}

export const getImgUrl = (asset) => {
  if (asset['image_url']) {
    return asset['image_url']
  } else if (asset['image_original_url']) {
    return asset['image_original_url']
  } else {
    console.error('getImgUrl() could not find URL for:', { asset })
    return ''
  }
}

type LinkLabel = {
  url: string
  label: string
}

export const getOpenSeaLink = (asset): LinkLabel => {
  return {
    url: asset['permalink'],
    label: 'opensea',
  }
}

export const getExternalLink = (asset): LinkLabel => {
  const url = asset['external_link']
  const link = new URL(url)
  const label = link.hostname
    .split('.')
    .filter((v) => !['app', 'com', 'www'].includes(v))
    .join('.')

  return {
    url,
    label,
  }
}

export const remapArtist = (asset: string): string => {
  const artist = get(asset, 'creator.user.username', '')

  switch (true) {
    case artist === 'CryptoJunks_wtf':
      return 'ambition.wtf'
    case artist === 'ambition_wtf':
      return 'ambition.wtf'
    case artist === '' || artist === null || artist === 'null':
      return 'n/a'
    default:
      return artist
  }
}
