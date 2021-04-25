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

<aside>
  {#if isOpen}
    <div transition:fly="{{ y: -400 }}" class=panel>
      <div transition:fly="{{ x: -400, y: 400 }}" on:click={onClick} class="icon close">
        <IconClose />
      </div>
      <SettingsPanel />
    </div>
  {:else}
    <div transition:fly="{{ x: 400 }}" on:click={onClick} class="icon cog">
      <IconCog />
    </div>
  {/if}

</aside>

<style style lang="postcss">
  
  aside {
    @apply relative;
    @apply bg-grey-200 dark:bg-grey-800;
    @apply text-grey-900 dark:text-gray-100;
    @apply font-mono;

    @apply rounded;

    @apply absolute;
    @apply top-4 left-4;

    @apply space-y-4;

    @apply z-50;
  }

  .panel {
    @apply p-8;
  }

  .icon {
    @apply p-2;
    @apply rounded;
    @apply cursor-pointer;
    @apply absolute;

    @apply text-grey-900 dark:text-gray-100 hover:text-grey-700 hover:dark:text-gray-300;
    @apply hover:bg-grey-300 hover:dark:bg-gray-700;

    &.cog {
      @apply top-4 left-4;
    }
    &.close {
      @apply top-4 right-4;
    }
  }

  h2 {
    @apply text-2xl;
  }

  input[type="text"] {
    @apply bg-grey-300 dark:bg-grey-700;
    
    @apply text-base;
    @apply text-grey-800 dark:text-gray-200;
    
    @apply px-4 pt-2 pb-1;
    @apply rounded;
    @apply w-[450px];

    @apply focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-300 dark:focus:ring-green-700;
  }

  button {
    @apply bg-grey-300 dark:bg-grey-700 hover:bg-grey-100 hover:dark:bg-grey-900;

    @apply border border-gray-500;

    @apply text-sm font-medium;
    @apply text-grey-800 dark:text-gray-200 text-base;
    
    @apply px-4 py-2;
    @apply shadow-sm;
    @apply rounded-md;

    @apply focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-700 dark:focus:ring-green-700;
  }

  dl {
    @apply space-y-4;
  }

  dt {
    @apply text-lg text-grey-600 dark:text-gray-400;
    @apply pt-4;
  }

  dd {
    @apply flex flex-col;
    @apply text-xl;
    @apply space-y-4;
  }

</style>
