<script lang="ts">
  import { fly } from 'svelte/transition'

  import IconButton from '../lib/IconButton.svelte'
  import Icon, { X, Cog } from 'svelte-hero-icons'
  import SettingsPanel from './SettingsPanel.svelte'

  let isOpen = false

  const onClick = () => {
    isOpen = !isOpen
  }
</script>


{#if isOpen}
  <aside transition:fly="{{ x: -400 }}" class=panel>
    <div class="icon close">
      <IconButton {onClick}>
        <Icon src="{X}" />
      </IconButton>
    </div>
    <SettingsPanel />
  </aside>
{:else}
  <aside transition:fly="{{ x: 400 }}" class="icon cog">
    <IconButton {onClick}>
      <Icon src="{Cog}" />
    </IconButton>
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
    @apply absolute;
    @apply bg-transparent;

    &.cog {
      @apply top-4 left-4;
    }
    &.close {
      @apply top-4 right-4;
    }
  }

</style>
