<script lang="ts">
  import { model, logStorage, deleteStorage } from '../model'
  import { wallet, synced, assets, fetchAllAssets } from '../model/store2'

  const sync = async () => {
    await fetchAllAssets()
  }

  $: syncedDate = $synced?.finished ? new Date($synced?.finished).toISOString() : "n/a"

  // const delStorage = () => {
  //   wallet.set('')
  // }

</script>

<h2>settings</h2>

<dl>
  <dt>
    <label for="wallet">my wallet address:</label>
  </dt>
  <dd>
    <input type="text" name="wallet" bind:value={$wallet} />
  </dd>

  <dt>synced:</dt>
  <dd>
    <div>
      {syncedDate}
    </div>
    <div>
      <button on:click={sync}>sync</button>
      <button on:click={logStorage}>log storage</button>
      <button on:click={deleteStorage}>del storage</button>
    </div>
  </dd>

  <dt>number of NFTs:</dt>
  <dd>
    {$assets?.length || "n/a"}
  </dd>

  <dt>fucking NERD shit:</dt>
  <dd>
    <div class=json>
      {JSON.stringify($synced, null, 2)}
    </div>
  </dd>

</dl>

<style style lang="postcss">
  
  h2 {
    @apply text-2xl;
  }

  input[type="text"] {
    @apply bg-grey-300 dark:bg-grey-700;
    
    @apply text-base;
    @apply text-grey-800 dark:text-gray-200;
    @apply focus:text-green-800 focus:dark:text-green-200;
    
    @apply px-4 pt-2 pb-1;
    @apply rounded;
    @apply w-[450px];

    @apply ring-green-300 dark:ring-green-700;
    @apply hover:ring-1;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-0;
  }

  button {
    @apply bg-grey-300 dark:bg-grey-700 hover:bg-grey-100 hover:dark:bg-grey-900;

    @apply border border-gray-500 hover:border-green-500;

    @apply text-sm font-medium;
    @apply text-grey-800 dark:text-gray-200 text-base;
    @apply hover:text-green-800 hover:dark:text-green-200;
    
    @apply px-4 py-2;
    @apply shadow-sm;
    @apply rounded-md;

    @apply focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-700 focus:dark:ring-green-700;
  }

  dl {
    @apply space-y-2;
  }

  dt {
    @apply text-base text-grey-600 dark:text-gray-400;
    @apply pt-4;
  }

  dd {
    @apply flex flex-col;
    @apply text-lg;
    @apply space-y-2;
  }

  .json {
    @apply whitespace-pre;
  }

</style>
