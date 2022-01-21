<script lang="ts">
	import { onMount } from 'svelte'

	import { config, wallet, fetchOpenSeaCollections } from '../model'

	/*
  {
    "primary_asset_contracts": [],
    "traits": {},
    "stats": {
        "one_day_volume": 0.32,
        "one_day_change": -0.24705882352941172,
        "one_day_sales": 3,
        "one_day_average_price": 0.10666666666666667,
        "seven_day_volume": 4.043,
        "seven_day_change": 0.4747939009265342,
        "seven_day_sales": 19,
        "seven_day_average_price": 0.21278947368421053,
        "thirty_day_volume": 12.73010001,
        "thirty_day_change": -0.014705767757216215,
        "thirty_day_sales": 116,
        "thirty_day_average_price": 0.10974224146551724,
        "total_volume": 1644.2017937186358,
        "total_sales": 4464,
        "total_supply": 4712,
        "count": 4712,
        "num_owners": 2416,
        "average_price": 0.36832477457854745,
        "num_reports": 0,
        "market_cap": 1002.664,
        "floor_price": 0
    },
    "banner_image_url": "https://lh3.googleusercontent.com/5-KeOMqOlfC7D6etYVEcrEiPcRy_QB-KPS3uOeGu7hMsPorzvPNtJOVrQRb1rxjHFcFsyXEQmTdj7bvqlbAQD5foHQxbTEgb5GPaMLg=s2500",
    "chat_url": null,
    "created_date": "2021-12-09T23:50:03.010012",
    "default_to_fiat": false,
    "description": "Transitions by Jason Ting x Matt Bilfield - Art Blocks Factory",
    "dev_buyer_fee_basis_points": "0",
    "dev_seller_fee_basis_points": "750",
    "discord_url": null,
    "display_data": {
        "card_display_style": "contain",
        "images": []
    },
    "external_url": "https://www.artblocks.io/project/117",
    "featured": false,
    "featured_image_url": "https://lh3.googleusercontent.com/zkwdi-5NwIx5PZxR4biqwKqJ5ZfBzTYds69cqiwNb1Baz2yfRFiENpWVytaECLYVmCcl2ASgP5sDU8Q5CRzaXdabZ9tsvltALai8",
    "hidden": false,
    "safelist_request_status": "verified",
    "image_url": "https://lh3.googleusercontent.com/zkwdi-5NwIx5PZxR4biqwKqJ5ZfBzTYds69cqiwNb1Baz2yfRFiENpWVytaECLYVmCcl2ASgP5sDU8Q5CRzaXdabZ9tsvltALai8",
    "is_subject_to_whitelist": false,
    "large_image_url": null,
    "medium_username": null,
    "name": "Transitions by Jason Ting x Matt Bilfield",
    "only_proxied_transfers": false,
    "opensea_buyer_fee_basis_points": "0",
    "opensea_seller_fee_basis_points": "250",
    "payout_address": "0x6c093fe8bc59e1e0cae2ec10f0b717d3d182056b",
    "require_email": false,
    "short_description": null,
    "slug": "transitions-by-jason-ting-x-matt-bilfield",
    "telegram_url": null,
    "twitter_username": null,
    "instagram_username": null,
    "wiki_url": null,
    "owned_asset_count": 3
}
  */

	type Collection = {
		name: string
		description: string
		slug: string
		owned_asset_count: number
	}

	let collections: Collection[] = []

	let disabledCollections: string[] = []

	onMount(async () => {
		console.log('onMount.collections', $wallet)
		collections = await fetchOpenSeaCollections($wallet)
	})

	$: {
		console.log({ collections, disabledCollections })
	}

	function onToggleCollection(slug: string) {
		if (disabledCollections.includes(slug)) {
			disabledCollections = disabledCollections.filter(s => s !== slug)
		} else {
			disabledCollections.push(slug)
		}
		console.log({ disabledCollections })
	}

	// TODO: make the whole row clickable

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
	{#each collections as collection}
		<li>
			<div>
				<input
					name={collection.slug}
					id={collection.slug}
					type="checkbox"
					checked={!disabledCollections.includes(collection.slug)}
					on:change={() => onToggleCollection(collection.slug)}
				/>
				<label for={collection.slug}>{collection.name}</label>
			</div>
			<span class="info">{collection.owned_asset_count}</span>
		</li>
	{/each}
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
		@apply flex justify-between items-baseline;
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
