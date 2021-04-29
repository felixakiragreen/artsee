<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import ColorThief from 'colorthief'
  import { contrastColor } from 'contrast-color'

  import { model } from '../model'
  import { currentAssetIndex } from '../model/cache'

  import Controls from './Controls.svelte'
  import Empty from './Empty.svelte'
  import Art from './Art.svelte'
  import Dev from './Dev.svelte'

  const colorThief = new ColorThief()

  onMount(async () => {
    // console.log("frame onMount")
    // onScreenSave()
  })
  onDestroy(() => {
    clearTimeout(timerSS)
    timerSS = null
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

  let lastIndex: number
  let index: number
  let hasFetched = false

  $: if ($model.assets && !hasFetched) {
    console.log("$ Frame.reactive")
    
    onRandom()
  }

  const onRandom = () => {
    lastIndex = index
    let newIndex = randomInt($model.assets.length)
    let i = 0
    while (i < 10 && lastIndex === newIndex) {
      console.log("onRandom.tryAgain", { lastIndex, newIndex })
      i++
      newIndex = randomInt($model.assets.length)
    }
    index = newIndex
    currentAssetIndex.set(index)

    console.log("onRandom", { lastIndex, newIndex, index })
  }

  // TODO: make random not pick the same one again

  const onPrev = () => {
    lastIndex = index
    if (index > 0) {
      index = index - 1
    } else {
      index = $model.assets.length - 1
    }
    currentAssetIndex.set(index)

    console.log("onPrev", index)
  }

  const onNext = () => {
    lastIndex = index
    if (index < $model.assets.length - 1) {
      index = index + 1
    } else {
      index = 0
    }
    currentAssetIndex.set(index)

    console.log("onNext", index)
  }

  const onFirst = () => {
    lastIndex = index
    index = 0
    currentAssetIndex.set(index)
    
    console.log("onFirst", index)
  }

  const onLast = () => {
    lastIndex = index
    index = $model.assets.length - 1
    currentAssetIndex.set(index)
    
    console.log("onLast", index)
  }

  let timerSS
  let delaySS = 60 * 1000
  const onScreenSave = () => {
    timerSS = setTimeout(() => {
      console.log("onScreenSave()")
      onRandom()
      onScreenSave()
      
    }, delaySS)
  }

  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')

  let bgHex
  let bgIsDark = true
  // let textHex

  const getBgColor = async () => {
    const img = document.querySelector(`img#img-${index}`)

    const [r, g, b] = await colorThief.getColor(img)

    bgHex = rgbToHex(r, g, b);

    let textHex = contrastColor({ bgColor: bgHex })

    bgIsDark = textHex === "#FFFFFF"

    console.log('Frame.getBgColor', { img, bgHex, textHex, bgIsDark })
  }

</script>






<section
  style="--img-bg-color: {bgHex || "--clear"};"
  class="{bgIsDark ? "light" : "dark"}"
>
  
  {#if $model.assets && $model.assets[index]}

    <div class="frame">
      <Art assets={$model.assets} {index} {getBgColor} />
    </div>
    <Controls {onRandom} {onPrev} {onNext} {onFirst} {onLast} />
  
  {:else}

    <Empty />

  {/if}

  <Dev />
</section>






<style style lang="postcss">

  section {
    z-index: 1;

    &.dark {
      @apply text-grey-900;
    }
    &.light {
      @apply text-grey-100;
    }
  }

  .frame {
    @apply z-20;
    @apply flex flex-col items-center justify-center;

    width: 50vw;
    height: 50vh;
  }

</style>
