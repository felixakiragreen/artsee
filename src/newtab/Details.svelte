<script lang="ts">
  import { fade } from 'svelte/transition'
  import { get } from 'lodash'
  // import pkg from '../manifest.json'

  import { ui } from '../model'
  import { viewingIndex, viewingAsset, cachedAssetData } from '../model/cache'

  import {
    getFileTypeFromUrl,
    getType,
    getUrl,
    getImgUrl,
    getOpenSeaLink,
    getExternalLink,
    remapArtist,
    figureOutUndefined
  } from '../model/funcs'

  $: ({ showAllText } = ui)

  const getYear = (isoString: string) => {
    const date = new Date(isoString)

    if (isNaN(date.valueOf())) {
      return ''
    } else {
      return date.getFullYear()
    }
  }

  let medium
  let seaLink
  let extLink

  $: {
    $cachedAssetData.then(data => {
      medium = getType(data)
      seaLink = getOpenSeaLink(data)
      extLink = getExternalLink(data)
    })
  }

  const getUndefinedMedium = async () => {
    const data = await $cachedAssetData
    const url = getUrl(data)
    return figureOutUndefined(url)
  }

  $: if (medium && typeof medium.file === "undefined") {
    getUndefinedMedium()
      .then(m => {
        medium = m
      })
  }

</script>


{#if $showAllText && $viewingAsset}

  {#await $cachedAssetData}

  {:then nftData}
    <aside transition:fade={{ duration: 300 }}>

      <p class=title>
        {nftData.name}, 
        <span class=year>{getYear(get(nftData, 'collection.created_date', ''))}</span>
      </p>
      
      <p class=artist>
        {remapArtist(nftData)}
        {#if remapArtist(nftData) === "n/a"}
          <span class=todo>(🚧 TODO)</span>
        {/if}
      </p>
      <p class=collection>{get(nftData, 'collection.name', '')}</p>

      <p class=medium>{medium.tag}/{medium.file}</p>

      <p class=links><a href={seaLink.url} target="_blank">{seaLink.label}</a>, <a href={extLink.url} target="_blank">{extLink.label}</a></p>

    </aside>

  {/await}
{/if}

<style style lang="postcss">

  aside {
    @apply absolute;
    @apply bottom-4 right-4;
    @apply z-50;
    
    @apply p-4;
    @apply font-sans;
    @apply space-y-1;

    @apply bg-grey-100;
    @apply text-grey-900;
    @apply backdrop-filter backdrop-blur-lg;
    @apply bg-opacity-70;

    @apply rounded;
  }


  .title {
    @apply font-bold text-xl;

    & .year { 
      @apply font-light;
    }
  }

  .artist {
    @apply italic text-lg;
  }

  .medium {
    @apply uppercase text-grey-500;
  }

  .collection, .links {
    @apply text-grey-500;
  }
  .links {
    /* font-mono */
  }

  a {
    @apply underline hover:no-underline;
  }

  .todo {
    @apply text-xs font-mono text-grey-500 font-normal;
  }

</style>