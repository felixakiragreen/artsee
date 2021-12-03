<script lang="ts">
  import { fade } from 'svelte/transition'
  import { get } from 'lodash'

  import {
    ui,
    config,
    viewingIndex,
    viewingAsset,
    cachedAssetData,
    getType,
    getUrl,
    getImgUrl,
    logStorage,
  } from '../model'

  import Empty from './Empty.svelte'

  // export let getBgColor: () => void

  let imgH
  let imgW

  const iFrameClass = nftData => {
    const artist = get(nftData, 'creator.user.username', '')
    switch (artist) {
      case 'ge1doot':
        return 'wide'
      default:
        return undefined
    }
  }

  const imgClass = nftData => {
    const medium = getType(nftData)

    switch (true) {
      case medium.tag === 'video':
      case medium.tag === 'media':
        return 'hide'
      case medium.file === 'svg':
        return 'svg'
      default:
        return
    }
  }

  $: ({ isAboveArt, isFullScreen } = ui)

  const onEnter = () => {
    isAboveArt.set(true)
  }
  const onLeave = () => {
    isAboveArt.set(false)
  }
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
      <div class={$isFullScreen ? "frame full-screen" : "frame"}>
        {#if getType(nftData).tag === 'media'}
          <iframe
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameborder="0"
            sandbox="allow-scripts"
            src={getUrl(nftData)}
            width={imgW ? `${imgW}px` : '100%'}
            height={imgH ? `${imgH}px` : '100%'}
            style="min-height: inherit;"
            title={nftData['name']}
            class={$isFullScreen ? `${iFrameClass(nftData)} full-screen` : iFrameClass(nftData)}
            on:mouseenter={onEnter}
            on:mouseleave={onLeave}
          />
        {:else if getType(nftData).tag === 'video'}
          <video loop autoplay={$config.autoPlay} class={$isFullScreen ? "full-screen" : ""}>
            <source src={getUrl(nftData)} type="video/mp4" />
            <track default kind="captions" />
          </video>
        {:else if getType(nftData).tag === 'audio'}
          <audio loop autoplay={$config.autoPlay} controls>
            <source src={getUrl(nftData)} type="audio/mpeg" />
            <track default kind="captions" />
          </audio>
        {/if}
        {#if getImgUrl(nftData)}
          <div
            class="dimensions"
            bind:clientHeight={imgH}
            bind:clientWidth={imgW}
            on:mouseenter={onEnter}
            on:mouseleave={onLeave}
          >
            <img
              id={`img-${$viewingIndex}`}
              src={getImgUrl(nftData)}
              alt={nftData['name']}
              class={$isFullScreen ? `${imgClass(nftData)} full-screen` : imgClass(nftData)}
            />
          </div>
        {/if}
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
    @apply relative;

    height: 50vh;
    width: 50vh;

    & img,
    video,
    iframe {
      box-shadow: 0px 5px 2px -3px rgba(0, 0, 0, 0.25),
        0px 8px 6px -3px rgba(0, 0, 0, 0.35),
        0px 24px 12px -8px rgba(0, 0, 0, 0.2);
    }

    & .wide {
      /* @apply w-full; */
      width: 50vw;
    }

    /* &.full {
      width: 100vw;
      height: 100vh;
    } */

    & audio {
      @apply h-12;
      @apply absolute;
      @apply bottom-12;
      -webkit-appearance: none;
      background-color: transparent;
    }
  }

  img,
  video {
    max-width: 50vw;
    max-height: 50vh;
  }

  /* Added min-height to SVGs so they will show up if they have no intrinsic size */
  img.svg {
    min-height: 50vh;
  }

  audio::-webkit-media-controls-enclosure {
    background-color: transparent;
  }

  audio::-webkit-media-controls-panel {
    background-color: rgba(255, 255, 255, 0.5);
    @apply backdrop-filter backdrop-blur-md;
  }

  /* audio::-webkit-media-controls-play-button {} */

  .caption {
    @apply text-center text-xl;
    @apply py-4;

    & .index {
      @apply font-mono text-base opacity-50 mr-4;
    }
  }

  .dimensions {
    @apply absolute;
    z-index: -1;

    & iframe {
      box-shadow: none !important;
    }
  }

  .hide {
    @apply pointer-events-none;
    box-shadow: none !important;
  }

  .bg {
    @apply absolute top-0 left-0 right-0 bottom-0;
    /* background: var(--img-bg-color); */
    z-index: -1;
  }

  /* Full Screen */

  .frame, img {
    &.full-screen {
      min-height: 100vh;
      /* min-width: 100vw; */
      width: auto;

      max-width: 100vw;
      max-height: 100vh;
    }
  }

  iframe {
    &.full-screen {
      min-height: 100vh;
      min-width: 100vw;
    }
  }

  video {
    &.full-screen {
      max-width: 100vw;
      max-height: 100vh;
    }
  }

  /* NOTES */
  /* 
    Animated SVG's size is governed by 'img min-height/width'
    Static SVG's size is controlled by frame or 'svg min-height'
    MP4's size is controlled by 'video min-height/width'
  */
</style>
