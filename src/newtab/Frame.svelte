<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import ColorThief from 'colorthief'

  import { model, fetchOpenSeaAsset } from '../model'
  
  const colorThief = new ColorThief()

  onMount(async () => {
    // console.log("frame onMount")
  })

  const randomElement = (arr: any[]) => {
    if (arr.length > 0) {
      return arr[Math.floor(Math.random() * arr.length)]
    } else {
      return null
    }
  }

  let fetched = false
  let asset

  $: if ($model.assets && !fetched) {
    console.log("Frame.fetching...")
    fetched = true
    let randomAsset = randomElement($model.assets)
    fetchOpenSeaAsset(randomAsset.address, randomAsset.tokenId)
      .then(fetched => {
        asset = fetched
      })
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

</script>

<section style="--img-bg-color: {bgHex || "--clear"};">
  {#if asset}
    <div class="bg" transition:fade={{ duration: 800 }} />
    <div class="img" transition:fade={{ duration: 200 }}>
      <img src={asset["image_url"]} alt={asset["name"]} on:load={getBgColor} />
    </div>
  {:else}
    <p>🖼 👀</p>
  {/if}
</section>`

<style style lang="postcss">
  
  section {
    @apply text-grey-900 dark:text-gray-100;

    z-index: 1;
  }

  .bg {
    @apply absolute top-0 left-0 right-0 bottom-0;
    background: var(--img-bg-color);
    z-index: -1;
  }

  .img {
    @apply z-20;
  }
  img {
    @apply max-w-lg;
  }

  p {
    @apply text-8xl;
  }
</style>
