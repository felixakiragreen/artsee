<script lang="ts">
  // import { onMount, onDestroy } from 'svelte'
  // import ColorThief from 'colorthief'
  // import { contrastColor } from 'contrast-color'

  import { assets, viewingIndex, viewingAsset, randomInt, synced, ui } from '../model'

  import Controls from './Controls.svelte'
  import Empty from './Empty.svelte'
  import Art from './Art.svelte'
  import Dev from './Dev.svelte'
  import Details from './Details.svelte'
  import KeyboardShortcuts from './KeyboardShortcuts.svelte';

  $: ({ isFullScreen } = ui)

  // const colorThief = new ColorThief()

  let lastIndex: number
  // let index: number
  let hasFetched = false

  $: if ($assets && !hasFetched && !$synced.started) {
    // console.log("$ Frame.reactive")
    onRandom()
  }

  // TODO: maybe this logic should move out to a store.... !?

  const onRandom = () => {
    hasFetched = true
    lastIndex = $viewingIndex
    let newIndex = randomInt($assets.length)
    let i = 0
    while (i < 10 && lastIndex === newIndex) {
      console.log("onRandom.tryAgain", { lastIndex, newIndex })
      i++
      newIndex = randomInt($assets.length)
    }
    viewingIndex.set(newIndex)

    // console.log("onRandom", { lastIndex, newIndex })
  }

  const onPrev = () => {
    lastIndex = $viewingIndex
    if ($viewingIndex > 0) {
      viewingIndex.update(i => i - 1)
    } else {
      viewingIndex.set($assets.length - 1)
    }
    // console.log("onPrev", $viewingIndex)
  }

  const onNext = () => {
    lastIndex = $viewingIndex
    if ($viewingIndex < $assets.length - 1) {
      viewingIndex.update(i => i + 1)
    } else {
      viewingIndex.set(0)
    }

    // console.log("onNext", $viewingIndex)
  }

  const onFirst = () => {
    lastIndex = $viewingIndex
    viewingIndex.set(0)
    
    // console.log("onFirst", $viewingIndex)
  }

  const onLast = () => {
    lastIndex = $viewingIndex
    viewingIndex.set($assets.length - 1)
    
    // console.log("onLast", $viewingIndex)
  }

  const onExpand = () => {
    isFullScreen.update(isFS => !isFS)

    // Get and set background color
    // $isFullScreen ? getBgColor() : bgHex = null
    
    // console.log('isFullScreen', $isFullScreen)
  }

  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')

  let bgHex
  let bgIsDark = true
  // let textHex

  const getBgColor = async () => {
    // const img = document.querySelector(`img#img-${$viewingIndex}`)
    
    // const [r, g, b] = await colorThief.getColor(img)
    
    // bgHex = rgbToHex(r, g, b);

    // let textHex = contrastColor({ bgColor: bgHex })

    // // bgIsDark = textHex === "#FFFFFF"

    // console.log('Frame.getBgColor', { img, bgHex, textHex, bgIsDark })
  }

  // $: {
  //   console.log('lala', $viewingAsset)
  // }

  const dispatch = action => {
    // console.log('dispatch', action);
    
    switch (action) {
      case 'LEFT':
        onPrev()
        break
      case 'RIGHT':
        onNext()
        break
      case 'EXPAND':
        onExpand()
        break
      case 'RANDOM':
        onRandom()
        break
      case 'FIRST':
        onFirst()
        break
      case 'LAST':
        onLast()
        break
      default:
        console.error('Keyboard shortcut dispatch error. Unhandled error.')
        break
    }
  }

</script>


<section
  style="--img-bg-color: {bgHex || "--clear"};"
  class="{bgIsDark ? "light" : "dark"}"
>
  
  {#if $viewingAsset}

    <div class={$isFullScreen ? "frame full" : "frame"}>
      <Art />
    </div>
    <Controls {onRandom} {onPrev} {onNext} {onFirst} {onLast} {onExpand} />
    <Details />
    
  {:else}

    <Empty />

  {/if}

  <Dev />
  <KeyboardShortcuts {dispatch} />
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

    &.full {
      width: 100vw;
      height: 100vh;

      background: #222;
    }
  }

</style>
