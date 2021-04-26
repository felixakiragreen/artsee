<script lang="ts">
  import IconButton from '../lib/IconButton.svelte'
  import Icon, { ChevronLeft, ChevronRight, Sparkles, Refresh } from 'svelte-hero-icons'

  export let onPrev
  export let onNext
  export let onNewest
  export let onRandom
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

<div class="controls">
  <div>
    <IconButton onClick={onRandom}>
      <Icon src="{Refresh}" />
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
    <IconButton onClick={onNewest}>
      <Icon src="{Sparkles}" />
    </IconButton>
  </div>
</div>

<style style lang="postcss">

.controls {
  @apply flex flex-row justify-center;
  @apply space-x-4;
  @apply p-4;
  @apply fixed bottom-0 left-0 right-0;
}

</style>