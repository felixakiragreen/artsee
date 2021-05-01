<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import ColorThief from 'colorthief'

  import { model, fetchOpenSeaAsset } from '../model'
  import type { OpenSeaAsset } from '../model'

  import Controls from './Controls.svelte'
  
  const colorThief = new ColorThief()

  onMount(async () => {
    // console.log("frame onMount")
  })

  function randomInt (n: number) {
    return Math.floor(Math.random() * n)
  }

  function randomElement<T> (arr: T[]): T {
    if (arr.length > 0) {
      return arr[randomInt(arr.length)]
    } else {
      return null
    }
  }

  let hasFetched = false
  let index
  let asset
  let nftData

  // This bit of reactive code will 
  $: if (asset) {
    console.log("$ Frame.reactive...")
    fetchResource()
  }
  // {
  //   console.log("Frame.fetching...", { asset })
  //   if (asset) {
      
  //   }
  // }

  $: if ($model.assets && !hasFetched) {
    console.log("$ Frame.reactive ")
    
    onRandom()

    console.log("Frame.randomizing...fetching", asset)
    fetchResource()
  }

  const fetchResource = async () => {
    console.log("Frame.fetchResource()", { asset })
    fetchOpenSeaAsset(asset.c, asset.t)
      .then(result => {
        nftData = result
        hasFetched = true
      })
  }

  const onRandom = () => {
    let randomIndex = randomInt($model.assets.length)
    let randomAsset = $model.assets[randomIndex]
    console.log("onRandom", randomIndex, randomAsset)
    index = randomIndex
    asset = randomAsset
  }

  // TODO: make random not pick the same one again

  const onPrev = () => {
    nftData = null
    if (index > 0) {
      index = index - 1
    } else {
      index = $model.assets.length - 1
    }
    asset = $model.assets[index]

    console.log("onPrev", index, asset)
    // let randomIndex = randomInt($model.assets.length)
    // let randomAsset = $model.assets[i]
    // console.log("onRandom", randomIndex, randomAsset)
    // index = randomIndex
    // asset = randomAsset
  }

  const onNext = () => {
    if (index < $model.assets.length - 1) {
      index = index + 1
    } else {
      index = 0
    }
    asset = $model.assets[index]

    console.log("onNext", index, asset)
  }

  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')

  let bgHex

  const getBgColor = async () => {
    const img = document.querySelector('img')

    const [r, g, b] = await colorThief.getColor(img)

    bgHex = rgbToHex(r, g, b);

    console.log('Frame.getBgColor', { bgHex })
  }

  // https://storage.opensea.io/files/43d1d1954d499ee349a1a5b50314fe84.mp4

  const getType = (asset) => {
    // html


    // animation
    if (asset["animation_url"]) {
      if (asset["animation_url"].slice(-4) === ".mp4") {
        console.log('VID', asset["animation_url"].slice(-4))
        return "VID"
      } else {
        return asset["animation_url"].slice(-4)
      }
    }
    
    // image
    else if (asset["image_url"]) {
      console.log("IMG", asset["image_url"].slice(-4))
      return "IMG"
      // return asset["image_url"].slice(-4)
    }

    // n/a
    else {
      console.error('could not find URL for:', { asset })
      return ''
    }
  }

  const getUrl = (asset) => {
    if (asset["animation_url"]) {
      return asset["animation_url"]
    } else if (asset["image_url"]) {
      return asset["image_url"]
    } else {
      console.error('could not find URL for:', { asset })
      return ''
    }
  }

  const getImgUrl = (asset) => {
    if (asset["image_url"]) {
      return asset["image_url"]
    } else {
      console.error('could not find URL for:', { asset })
      return ''
    }
  }

  // STILL GET THE COLOR FROM THE IMAGE HAHAHA when it's a video

</script>

<section style="--img-bg-color: {bgHex || "--clear"};">
  {#if !nftData}
    <div class="empty">
      <p>🖼 👀</p>
    </div>
  {:else}  
    <div class="bg" transition:fade={{ duration: 800 }} />
    <div class="frame" transition:fade={{ duration: 200 }}>
      {#if getType(nftData) === "VID"}
        <video loop autoplay>
          <source src={getUrl(nftData)} type="video/mp4" />
        </video>
      {/if}
      <img src={getImgUrl(nftData)} alt={nftData["name"]} on:load={getBgColor} class="{getType(nftData) === "IMG" ? "show" : "hide"}" />
    </div>
    <div class="caption">{index} — {nftData["name"]}</div>
    <Controls {onRandom} {onPrev} {onNext} />
  {/if}
</section>

<style style lang="postcss">
  
  section {
    /* @apply text-grey-900 dark:text-gray-100; */
    @apply text-gray-100;

    z-index: 1;
  }

  .bg {
    @apply absolute top-0 left-0 right-0 bottom-0;
    background: var(--img-bg-color);
    z-index: -1;
  }

  .frame {
    @apply relative;
    @apply z-20;
  }
  img, video {
    max-width: 50vw;
    max-height: 50vh;
  }
  p {
    @apply text-8xl;
  }

  .caption {
    @apply text-center text-2xl;
    @apply py-4;
  }

  .show {

  }
  .hide {
    @apply absolute top-0;
    z-index: -1;
  }

  .empty {
    width: 50vw;
    height: 50vh;
    @apply flex items-center justify-center;
  }

</style>
