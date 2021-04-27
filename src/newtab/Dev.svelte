<script lang="ts">
  import { fade } from 'svelte/transition'
  // import pkg from '../manifest.json'

  import { ui } from '../model'

  $: ({ showAllText } = ui)
</script>


{#if $showAllText}
  <aside transition:fade={{ duration: 300 }}>

    <p>artsee BETA v0.1</p>

    <p>
      join our <a href="https://discord.gg/6j65H7nqSd" target="_blank">discord</a><br />
      to report bugs<br />
      or request features!
    </p>

  </aside>
{/if}

<style style lang="postcss">

  aside {
    @apply absolute;
    @apply top-4 right-4;
    @apply font-mono text-right opacity-50;
    @apply z-50;
    @apply space-y-4;
  }

  a {
    @apply underline hover:no-underline;
  }

</style>