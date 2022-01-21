<script lang="ts">
	import { onMount } from 'svelte'

	import { config, wallet, fetchOpenSeaCollections } from '../model'

	onMount(async () => {
		console.log('onMount.collections', $wallet)
		await fetchOpenSeaCollections($wallet)
	})

	// let isCollectionFetched = false
	// $: {
	//   if ($wallet && !isCollectionFetched) {
	//     // fetch
	//     isCollectionFetched = true
	//     fetchOpenSeaCollections($wallet)
	//   }
	// }
</script>

<ul>
	<!-- <li>
		<label for="autoSync">sync new NFTs automatically</label>
		<input
			type="checkbox"
			name="autoSync"
			id="autoSync"
			bind:checked={$config.autoSync}
			on:change={onSyncChange}
		/>
		<br />
		<span class="info">increases network usage for collections over 50</span>
	</li> -->
</ul>

<style style lang="postcss">
	h2 {
		@apply text-2xl;
	}

	ul {
		@apply space-y-2;
		@apply pt-8;
	}

	li {
		@apply text-base text-gray-200;
	}

	.json {
		@apply whitespace-pre;
	}

	.info {
		@apply text-xs text-gray-400;
	}

	a {
		@apply text-sm text-grey-300;
		@apply underline hover:no-underline;
	}

	label {
		@apply text-green-300;
	}

	input {
		@apply bg-grey-700;

		@apply text-base;
		@apply text-gray-200;
		@apply focus:text-green-200;

		@apply rounded;
		@apply pt-2 pb-1;

		@apply hover:ring-1;
		@apply ring-green-500;
		@apply focus:outline-none focus:ring-2 focus:ring-offset-0;
	}

	input[type='text'] {
		@apply w-[450px];
		@apply px-4;
		/* @apply px-4 pt-2 pb-1; */
	}

	#wallet {
		@apply mt-2;
	}

	input[type='number'] {
		@apply w-12;
		@apply px-2;
	}

	button {
		/* @apply bg-grey-300 dark:bg-grey-700 hover:bg-grey-100 hover:dark:bg-grey-900; */
		@apply bg-grey-700 hover:bg-grey-900;

		@apply border border-gray-500 hover:border-green-500;

		@apply text-sm font-medium;
		/* @apply text-grey-800 dark:text-gray-200 text-base;
    @apply hover:text-green-800 hover:dark:text-green-200; */
		@apply text-gray-200 text-base;
		@apply hover:text-green-200;

		@apply px-4 py-2;
		@apply shadow-sm;
		@apply rounded-md;

		/* @apply focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-700 focus:dark:ring-green-700; */
		@apply focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-700;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
