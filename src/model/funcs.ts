export const getFileTypeFromUrl = (url: string): string => {
  let type = url.split('.').pop()

  // console.log('getFileTypeFromUrl()', url, type)

  if (type && type.length < 5) {
    return type
  }
}

type NiftyTag = 'video' | 'img'
type Nifty = {
  tag: NiftyTag
  file: string
}

export const getType = (asset): Nifty => {
  let file: string
  let tag: NiftyTag

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
    tag = 'img'
  }

  if (!file && asset['image_original_url']) {
    file = getFileTypeFromUrl(asset['image_original_url'])
    tag = 'img'
  }

  // console.log('getType()', tag, file)

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
    console.error('could not find URL for:', { asset })
    return ''
  }
}

export const getImgUrl = (asset) => {
  if (asset['image_url']) {
    return asset['image_url']
  } else if (asset['image_original_url']) {
    return asset['image_original_url']
  } else {
    console.error('could not find URL for:', { asset })
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
  return {
    url,
    label,
  }
}
