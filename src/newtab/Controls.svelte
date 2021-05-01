<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  
  import Icon, {
    ChevronLeft,
    ChevronRight,
    ChevronDoubleLeft,
    ChevronDoubleRight,
    Refresh,
    ArrowsExpand
  } from 'svelte-hero-icons'
  import IconButton from '../lib/IconButton.svelte'
  
  import { ui, assets, viewingIndex } from '../model'
  
  export let onRandom
  export let onPrev
  export let onNext
  export let onFirst
  export let onLast
  // export let onExpand

  let index = $viewingIndex + 1

  onMount(async () => {
    // subcribe to changes so input updates when navigating around
    const unsub = viewingIndex.subscribe((vI) => {
      if (vI + 1 !== index) {
        // console.log("setting", vI, index)
        index = vI + 1
      }
    })
  })

  const onIndexChange = () => {
    // console.log("onIndexChange()", index)
    if (index === 0) {
      viewingIndex.set(0)
    } else if (index > 0 && index < $assets.length) {
      viewingIndex.set(index - 1)
    } else if (index === null) {
      // console.log("test null")
      viewingIndex.set(0)
    } else if (index > $assets.length) {
      // console.log("test over")
      viewingIndex.set($assets.length - 1)
    } else if (index < 0) {
      // console.log("test neg")
      viewingIndex.set(0)
    }
  }

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
    <div class=pagination>
      <input
        type="number"
        min=0 max={$assets.length - 1}
        bind:value={index}
        on:change={onIndexChange}
      />
      <div><span>/</span> <span class=total>{$assets.length}</span></div>
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
    <!-- <div>
      <IconButton onClick={onExpand}>
        <Icon src="{ArrowsExpand}" />
      </IconButton>
    </div> -->
  </div>
{/if}

<style style lang="postcss">

  .controls {
    @apply flex flex-row justify-center;
    @apply space-x-2;
    @apply p-4;
    @apply fixed bottom-0 left-0 right-0;
    @apply z-50;
  }

  .pagination {
    @apply text-lg;

    @apply flex flex-row items-center;

    > div {
      /* @apply text-grey-900 dark:text-gray-100;
      @apply bg-grey-200 dark:bg-grey-800; */
      @apply text-gray-100;
      @apply bg-grey-800;

      @apply bg-opacity-25;
      @apply backdrop-filter backdrop-blur-md;

      @apply h-10 p-2 pl-0;
      @apply rounded rounded-l-none;

      line-height: 24px;
      & .total {
        line-height: 26px;
      }
    }
  }
  input[type="number"] {
    /* @apply text-grey-900 dark:text-gray-100;
    @apply hover:text-green-700 hover:dark:text-green-300;

    @apply bg-grey-200 dark:bg-grey-800;
    @apply hover:bg-green-300 hover:dark:bg-green-700; */
    @apply text-gray-100;
    @apply hover:text-green-300;

    @apply bg-grey-800;
    @apply hover:bg-green-700;

    @apply bg-opacity-25 hover:bg-opacity-50;
    @apply backdrop-filter backdrop-blur-md;
    @apply transition;

    @apply h-10;
    @apply p-2 pr-0;
    @apply rounded rounded-r-none;

    /* @apply ring-green-300 dark:ring-green-700; */
    @apply ring-green-700;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-0;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

</style>