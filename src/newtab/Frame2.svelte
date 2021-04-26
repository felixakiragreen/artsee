<script lang="ts">

  import { onMount } from 'svelte'
  import ColorThief from 'colorthief'

  import { model } from '../model'

  import Controls from './Controls.svelte'
  import Empty from './Empty.svelte'
  import Art from './Art.svelte'

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

  let index: number
  let hasFetched = false

  $: if ($model.assets && !hasFetched) {
    console.log("$ Frame.reactive")
    
    onRandom()
  }

  const onRandom = () => {
    index = randomInt($model.assets.length)

    console.log("onRandom", index)
  }

  // TODO: make random not pick the same one again

  const onPrev = () => {
    if (index > 0) {
      index = index - 1
    } else {
      index = $model.assets.length - 1
    }

    console.log("onPrev", index)
  }

  const onNext = () => {
    if (index < $model.assets.length - 1) {
      index = index + 1
    } else {
      index = 0
    }

    console.log("onNext", index)
  }

  const onNewest = () => {
    index = 0
    
    console.log("onNewest", index)
  }

  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')

  let bgHex

  const getBgColor = async () => {
    const img = document.querySelector(`img#img-${index}`)

    const [r, g, b] = await colorThief.getColor(img)

    bgHex = rgbToHex(r, g, b);

    console.log('Frame.getBgColor', { img, bgHex })
  }

</script>






<section style="--img-bg-color: {bgHex || "--clear"};">
  
  {#if $model.assets && $model.assets[index]}

    <div class="frame">
      <Art assets={$model.assets} {index} {getBgColor} />
    </div>
    <Controls {onRandom} {onPrev} {onNext} {onNewest} />
  
  {:else}

    <Empty />

  {/if}
</section>






<style style lang="postcss">

  section {
    @apply text-grey-900 dark:text-gray-100;

    z-index: 1;
  }

  .frame {
    @apply z-20;
    @apply flex flex-col items-center justify-center;

    width: 50vw;
    height: 50vh;
  }

</style>
