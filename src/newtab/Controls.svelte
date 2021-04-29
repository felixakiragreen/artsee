<script lang="ts">
  import { fly } from 'svelte/transition'
  
  import Icon, { ChevronLeft, ChevronRight, ChevronDoubleLeft, ChevronDoubleRight, Refresh, Link, ExternalLink } from 'svelte-hero-icons'
  import IconButton from '../lib/IconButton.svelte'
  
  import { ui } from '../model'

  import { cachedAssetData } from '../model/cache'
  
  export let onRandom
  export let onPrev
  export let onNext
  export let onFirst
  export let onLast

  
  

  let link = ''
  let extLink = ''

  // const getLink = async (): Promise<string> => {
  //   return $cachedAssetData.then((data) => data.permalink)
  // }

  $: { $cachedAssetData.then(data => {
      link = data.permalink
      extLink = data.external_link
    })
  }

  console.log($cachedAssetData, link, extLink)

  $: ({ showAllControls } = ui)
</script>

<!-- <div class="wrapper">
  <IconButton onClick={onRandom}>
    <Icon src="{Refresh}" />
  </IconButton>
  <IconButton onClick={onPrev}>
    <Icon src="{ChevronLeft}" />
  </IconButton>
  <IconButton onClick={onNext}>
    <Icon src="{ChevronRight}" />
  </IconButton>
  <IconButton onClick={onNewest}>
    <Icon src="{Sparkles}" />
  </IconButton>
</div> -->

{#if $showAllControls}
  <div class="controls" transition:fly="{{ y: 50 }}">
    <div>
      <IconButton onClick={onRandom}>
        <Icon src="{Refresh}" />
      </IconButton>
    </div>
    <div>
      <IconButton onClick={onFirst}>
        <Icon src="{ChevronDoubleLeft}" />
      </IconButton>
    </div>
    <div>
      <IconButton onClick={onPrev}>
        <Icon src="{ChevronLeft}" />
      </IconButton>
    </div>
    <div>
      <IconButton onClick={onNext}>
        <Icon src="{ChevronRight}" />
      </IconButton>
    </div>
    <div>
      <IconButton onClick={onLast}>
        <Icon src="{ChevronDoubleRight}" />
      </IconButton>
    </div>
    {#if link}
      <div>
        <a href={link} target="_blank">
          <IconButton>
            <Icon src="{Link}" />
          </IconButton>
        </a>
      </div>
    {/if}
    {#if extLink}
      <div>
        <a href={extLink} target="_blank">
          <IconButton>
            <Icon src="{ExternalLink}" />
          </IconButton>
        </a>
      </div>
    {/if}
  </div>
{/if}

<style style lang="postcss">

.controls {
  @apply flex flex-row justify-center;
  @apply space-x-4;
  @apply p-4;
  @apply fixed bottom-0 left-0 right-0;
}

</style>