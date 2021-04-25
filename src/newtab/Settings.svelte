<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { fly } from 'svelte/transition'

  import IconCog from '../lib/IconCog.svelte'
  import IconClose from '../lib/IconClose.svelte'
  import SettingsPanel from './SettingsPanel.svelte'

  let isOpen = false

  const onClick = () => {
    isOpen = !isOpen
  }

</script>


{#if isOpen}
  <aside transition:fly="{{ x: -400 }}" class=panel>
    <div on:click={onClick} class="icon close">
      <IconClose />
    </div>
    <SettingsPanel />
  </aside>
{:else}
  <aside transition:fly="{{ x: 400 }}" on:click={onClick} class="icon cog">
    <IconCog />
  </aside>
{/if}

<style style lang="postcss">
  
  aside {
    @apply relative;
    @apply bg-grey-200 dark:bg-grey-800;
    @apply text-grey-900 dark:text-gray-100;
    @apply backdrop-filter backdrop-blur-lg;
    @apply font-mono;

    @apply rounded;

    @apply absolute;
    @apply top-4 left-4;

    @apply space-y-4;

    @apply z-50;
  }

  .panel {
    @apply p-8;
    @apply bg-opacity-75;
  }

  .icon {
    @apply p-2;
    @apply rounded;
    @apply cursor-pointer;
    @apply absolute;

    @apply text-grey-900 dark:text-gray-100 hover:text-green-700 hover:dark:text-green-300;
    @apply hover:bg-grey-300 hover:dark:bg-gray-700;
    @apply bg-opacity-25 hover:bg-opacity-50; 

    &.cog {
      @apply top-4 left-4;
    }
    &.close {
      @apply top-4 right-4;
    }
  }

</style>
