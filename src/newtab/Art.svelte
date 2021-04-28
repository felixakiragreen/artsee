<script lang="ts">
  import { fade } from 'svelte/transition'

  import { fetchOpenSeaAsset, ui } from '../model'
  import type { OpenSeaAsset } from '../model'

  import Empty from './Empty.svelte'

  export let index: number
  export let assets: OpenSeaAsset[]
  export let getBgColor: () => void

  $: fetchNft = getNftData(assets[index])
    
  const getNftData = async (asset) => {
    console.log("Frame.getNftData()", { asset })
    return new Promise((resolve, reject) => {
      fetchOpenSeaAsset(asset.c, asset.t)
        .then(result => resolve(result))
        .catch((err) => reject(err))
    })
  }

  const getFileTypeFromUrl = (url: string): string => {
    let type = url.split(".").pop()

    console.log('getFileTypeFromUrl()', url, type)

    if (type && type.length < 5) {
      return type
    }
  }

  type NiftyTag = "video" | "img"
  type Nifty = {
    tag: NiftyTag
    file: string
  }

  const getType = (asset): Nifty => {
    let file: string
    let tag: NiftyTag
  
    // animation
    if (asset["animation_url"]) {
      file = getFileTypeFromUrl(asset["animation_url"])
      tag = "video" 
    }

    if (!file && asset["animation_original_url"]) {
      file = getFileTypeFromUrl(asset["animation_original_url"])
      tag = "video"
    }

    // image
    if (!file && asset["image_url"]) {
      file = getFileTypeFromUrl(asset["image_url"])
      tag = "img"
    }

    if (!file && asset["image_original_url"]) {
      file = getFileTypeFromUrl(asset["image_original_url"])
      tag = "img"
    }

    console.log('getType()', tag, file)

    return {
      tag, file
    }
  }
  
  const getUrl = (asset) => {
    if (asset["animation_url"]) {
      return asset["animation_url"]
    }
    else if (asset["animation_original_url"]) {
      return asset["animation_original_url"]
    }
    else if (asset["image_url"]) {
      return asset["image_url"]
    }
    else if (asset["image_original_url"]) {
      return asset["image_original_url"]
    } 
    else {
      console.error('could not find URL for:', { asset })
      return ''
    }
  }
  
  const getImgUrl = (asset) => {
    if (asset["image_url"]) {
      return asset["image_url"]
    }
    else if (asset["image_original_url"]) {
      return asset["image_original_url"]
    } 
    else {
      console.error('could not find URL for:', { asset })
      return ''
    }
  }

  $: ({ showAllText } = ui)
</script>




{#await fetchNft}

  <Empty />

{:then nftData}

  <div class="bg" transition:fade={{ duration: 600 }} />

  <section transition:fade={{ duration: 300 }}>
    {#if $showAllText}
      <div class="caption" transition:fade={{ duration: 300 }}><span class="index">{index}</span></div>
    {/if}
    <div class="frame">
      {#if getType(nftData).tag === "video"}
        {#if getType(nftData).file === "html"}
          <iframe
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameborder="0"
            sandbox="allow-scripts"
            src={getUrl(nftData)}
            width="100%"
            height="100%"
            style="min-height: inherit;"
            title={nftData["name"]}
          ></iframe>
        {:else}
          <video loop autoplay>
            <source src={getUrl(nftData)} type="video/mp4" />
            <track default kind="captions" />
          </video>
        {/if}
      {/if}
      <img
        id={`img-${index}`}
        src={getImgUrl(nftData)}
        alt={nftData["name"]}
        class="{getType(nftData).tag === "video" && "hide"}"
        on:load={getBgColor}
      />
    </div>
    {#if $showAllText}
      <div class="caption" transition:fade={{ duration: 300 }}>{nftData["name"]}</div>
    {/if}
  </section>

{:catch err}

  <Empty />

{/await}



<style style lang="postcss">
  
  section {
    @apply absolute top-0 left-0 right-0 bottom-0;
    @apply flex flex-col items-center justify-center;
  }
  
  .frame {
    @apply z-20;
    @apply flex flex-col items-center justify-center;

    width: 50vw;
    height: 50vh;
  }

  img, video {
    max-width: 50vw;
    max-height: 50vh;
  }

  .caption {
    @apply text-center text-xl;
    @apply py-4;

    & .index {
      @apply font-mono text-base opacity-50 mr-4;
    }
  }

  .hide {
    @apply absolute opacity-0 pointer-events-none;
    z-index: -1;
  }

  .bg {
    @apply absolute top-0 left-0 right-0 bottom-0;
    background: var(--img-bg-color);
    z-index: -1;
  }

</style>
