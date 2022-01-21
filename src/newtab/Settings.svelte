<script lang="ts">
	import { fly } from 'svelte/transition'

	import Icon, { X, Cog, Refresh } from 'svelte-hero-icons'
	import IconButton from '../lib/IconButton.svelte'

	import SettingsPanel from './SettingsPanel.svelte'
	import CollectionsPanel from './CollectionsPanel.svelte'
	import { ui, synced } from '../model'

	$: ({ showAllControls, showSettings } = ui)

	// TODO: consider renaming settings to general
	type SettingsTab = 'settings' | 'collections'
	let currentTab: SettingsTab = 'settings'

	function onClickSettings() {
		$showSettings = !$showSettings
	}

	function onClickTab(tab: SettingsTab) {
		currentTab = tab
	}
</script>

{#if $showSettings}
	<aside transition:fly={{ x: -400 }} class="panel">
		<div class="icon close">
			<IconButton onClick={onClickSettings}>
				<Icon src={X} />
			</IconButton>
		</div>
		<div class="panel-header">
			<div on:click={() => onClickTab('settings')}>
				<h2 class:active={currentTab === 'settings'}>settings</h2>
			</div>
			<div on:click={() => onClickTab('collections')}>
				<h2 class:active={currentTab === 'collections'}>collections</h2>
			</div>
		</div>
		{#if currentTab === 'settings'}
			<SettingsPanel />
		{:else}
			<CollectionsPanel />
		{/if}
	</aside>
{:else}
	<aside transition:fly={{ x: 400 }} class="icon cog">
		{#if $showAllControls}
			<div transition:fly={{ x: -50 }}>
				<IconButton onClick={onClickSettings}>
					<Icon src={Cog} />
				</IconButton>
			</div>
		{/if}
		{#if $synced.started}
			<div class="spinner">
				<Icon src={Refresh} />
			</div>
		{/if}
	</aside>
{/if}

<style style lang="postcss">
	h2 {
		@apply text-2xl;
		@apply cursor-pointer;

		&.active {
			@apply text-green-300;
		}
	}

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

	.panel-header {
		@apply flex;
		@apply space-x-4;
		@apply items-center;
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
			@apply top-4 left-4;
		}
		&.close {
			@apply top-4 right-4;
		}
	}

	.spinner {
		@apply h-10 w-10 p-2;
		@apply text-grey-500;
		@apply transition-transform animate-spin;
	}
</style>
