<script lang="ts">
  import { onMount } from 'svelte'
  import { model } from './store'

  import Settings from './Settings.svelte'
  import Frame from './Frame.svelte'

  const init = async () => {
    await model.initialize()
  }

  onMount(init)

</script>

<main>

  <Settings />
  <Frame />

</main>

<style style lang="postcss">
  main {
    @apply bg-grey-100 dark:bg-grey-900;
    @apply w-screen h-screen max-h-screen max-w-full;
    @apply flex items-center justify-center;
  }

</style>
