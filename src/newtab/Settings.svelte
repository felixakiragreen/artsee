<script lang="ts">
  import { fly } from 'svelte/transition'
  
  import Icon, { X, Cog, Refresh } from 'svelte-hero-icons'
  import IconButton from '../lib/IconButton.svelte'

  import SettingsPanel from './SettingsPanel.svelte'
  import { ui, synced } from '../model'

  let isOpen = false

  const onClick = () => {
    isOpen = !isOpen
  }

  $: ({ showAllControls } = ui)
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
    {#if $showAllControls}
      <div transition:fly="{{ x: -50 }}">
        <IconButton {onClick}>
          <Icon src="{Cog}" />
        </IconButton>
      </div>
    {/if}
    {#if $synced.started}
      <div class=spinner>
        <Icon src={Refresh} />
      </div>
    {/if}
  </aside>
{/if}

<style style lang="postcss">
  
  aside {
    @apply relative;
    /* @apply bg-grey-200 dark:bg-grey-800;
    @apply text-grey-900 dark:text-gray-100; */
    @apply bg-grey-800;
    @apply text-gray-100;
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
    @apply flex flex-row;
    @apply space-y-0 space-x-4;

    &.cog {
      @apply top-8 left-8;
    }
    &.close {
      @apply top-4 right-4;
    }
  }

  .spinner {
    @apply h-10 w-10 p-2;
    @apply transition-transform animate-spin;
  }

</style>
