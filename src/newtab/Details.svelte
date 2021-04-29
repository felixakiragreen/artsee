<script lang="ts">
  import { fade } from 'svelte/transition'
  import { get } from 'lodash'
  // import pkg from '../manifest.json'

  import { ui } from '../model'
  import { viewingIndex, viewingAsset, cachedAssetData } from '../model/cache'

  import { getFileTypeFromUrl,
getType,
getUrl,
getImgUrl, } from '../model/funcs'

  $: ({ showAllText } = ui)

  const getYear = (isoString: string) => {
    const date = new Date(isoString)

    if (isNaN(date.valueOf())) {
      return ''
    } else {
      return date.getFullYear()
    }
  }

  $: medium = getType($cachedAssetData)


</script>


{#if $showAllText && $viewingAsset}

  {#await $cachedAssetData}

  {:then nftData}
    <aside transition:fade={{ duration: 300 }}>

      <p class=title>
        {nftData.name}, 
        <span class=year>{getYear(get(nftData, 'collection.created_date', ''))}</span>
      </p>
      
      <p class=artist>{get(nftData, 'creator.user.username', '')}</p>
      <p class=collection>{get(nftData, 'collection.name', '')}</p>

      <p class=medium>{getType(nftData).tag}/{getType(nftData).file}</p>

      <p>opensea, rarible</p>

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

    @apply bg-grey-200;
    @apply text-grey-900;
    @apply backdrop-filter backdrop-blur-lg;
    @apply bg-opacity-75;

    @apply rounded;
  }

  .muted {
    @apply text-grey-500;
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


</style>