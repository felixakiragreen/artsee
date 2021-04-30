<script lang="ts">
  import { onMount} from 'svelte'
  import { fade } from 'svelte/transition'
  import { get } from 'lodash'

  import { fetchOpenSeaAsset, ui } from '../model'
  import { assets } from '../model/store2'
  import type { OpenSeaAsset } from '../model'
  import { viewingIndex, viewingAsset, cachedAssetData } from '../model/cache'

  import {
    getType,
    getUrl,
    getImgUrl
  } from '../model/funcs'

  import Empty from './Empty.svelte'

  // export let index: number
  // export let assets: OpenSeaAsset[]
  export let getBgColor: () => void

  // onMount(async () => {
  //   console.log("asdf", $currentAssetIndex, $currentAsset)
  // })

  // $: fetchNft = getNftData(assets[index])
  // $: fetchNft = getNftData($currentAsset)
    
  // const getNftData = async (asset) => {
  //   console.log("Frame.getNftData()", { asset })
  //   return new Promise((resolve, reject) => {
  //     fetchOpenSeaAsset(asset.c, asset.t)
  //       .then(result => resolve(result))
  //       .catch((err) => reject(err))
  //   })
  // }

  const getClass = (nftData) => {
    const artist = get(nftData, 'creator.user.username', '')
    switch (artist) {
      case "ge1doot": return "wide"
      default: return undefined
    }
  } 

  $: ({ showAllText } = ui)
</script>



{#if $viewingAsset}
  {#await $cachedAssetData}

    <Empty />

  {:then nftData}

    <div class="bg" transition:fade={{ duration: 600 }} />

    <section transition:fade={{ duration: 300 }}>
      <!-- {#if $showAllText}
        <div class="caption" transition:fade={{ duration: 300 }}><span class="index">{index}</span></div>
      {/if} -->
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
              class={getClass(nftData)}
            ></iframe>
          {:else}
            <video loop autoplay>
              <source src={getUrl(nftData)} type="video/mp4" />
              <track default kind="captions" />
            </video>
          {/if}
        {/if}
        <img
          id={`img-${$viewingIndex}`}
          src={getImgUrl(nftData)}
          alt={nftData["name"]}
          class="{getType(nftData).tag === "video" && "hide"}"
          on:load={getBgColor}
        />
      </div>
      <!-- {#if $showAllText}
        <div class="caption" transition:fade={{ duration: 300 }}>{nftData["name"]}</div>
      {/if} -->
    </section>

  {:catch err}

    <Empty />

  {/await}
{/if}


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

    & img, video, iframe {
      box-shadow:
        0px 5px 2px -3px rgba(0, 0, 0, 0.25),
        0px 8px 6px -3px rgba(0, 0, 0, 0.35),
        0px 24px 12px -8px rgba(0, 0, 0, 0.20);
    }

    & iframe:not(.wide) {
      width: 50vh;
    }
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
    /* background: var(--img-bg-color); */
    z-index: -1;
  }

</style>
