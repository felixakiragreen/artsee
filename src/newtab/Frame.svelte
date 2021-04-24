<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { model, fetchOpenSeaAsset } from './store'

  

  

  

  onMount(async () => {
    console.log("frame onMount")


  })

  const randomElement = (arr: any[]) => {
    if (arr.length > 0) {
      return arr[Math.floor(Math.random() * arr.length)]
    } else {
      return null
    }
  }

  // $: randoAsset = $model.assets ? randomElement($model.assets) : null

  // const fetchRandomAsset = async (asset: OpenSeaAsset) => {
  //   fetchOpenSeaAsset(asset.address, asset.tokenId)
  //     .then((asset) => {
  //       return asset
  //     })
  //     .catch(err => 
  //       console.error(err)
  //     )
  // }

  let fetched = false
  let asset

  $: if ($model.assets && !fetched) {
    console.log("fetching...", fetched)
    fetched = true
    let randomAsset = randomElement($model.assets)
    // fetchRandomAsset(randoAsset)
    fetchOpenSeaAsset(randomAsset.address, randomAsset.tokenId)
      .then(fetched => {
        console.log("inside", fetched)
        asset = fetched
      })
  }

  console.log('bla', { asset })

</script>

<section>
  {#if asset}
    <div transition:fade>
      <img src={asset["image_url"]} alt={asset["name"]} />
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
</section>

<style style lang="postcss">
  
  section {
    @apply text-grey-900 dark:text-gray-100;

    z-index: 1;
  }

  img {
    @apply max-w-lg;
  }
</style>
