<script lang="ts">
  import { fade } from 'svelte/transition'

  import { fetchOpenSeaAsset } from '../model'
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
</script>




{#await fetchNft}

  <Empty />

{:then nftData}

  <div class="bg" transition:fade={{ duration: 600 }} />

  <section transition:fade={{ duration: 300 }}>
    <div class="frame">
      {#if getType(nftData) === "VID"}
        <video loop autoplay>
          <source src={getUrl(nftData)} type="video/mp4" />
        </video>
      {/if}
      <img
        id={`img-${index}`}
        src={getImgUrl(nftData)}
        alt={nftData["name"]}
        class="{getType(nftData) === "IMG" ? "show" : "hide"}"
        on:load={getBgColor}
      />
    </div>
    <div class="caption"><span class="index">{index}</span> {nftData["name"]}</div>
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
      @apply font-mono text-base text-grey-600 dark:text-gray-400;
    }
  }

  .show {

  }

  .hide {
    @apply absolute opacity-0;
  }

  .bg {
    @apply absolute top-0 left-0 right-0 bottom-0;
    background: var(--img-bg-color);
    z-index: -1;
  }

</style>
