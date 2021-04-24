<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { model } from './store'
  
  onMount(async () => {
    // console.log("b4", $model)

    await model.initialize()
    
    // console.log("a5", $model)
  })

  const resync = async () => {
    // console.log("b4", $model)
    
    await model.fetchAll()
    await tick()
    // wallet.update(m => "haha")

    // console.log("a5", $model)
  }

  const storage = async () => {
    chrome.storage.sync.get(null, (data) => {
      console.log('loadFromStorage() →', { data })
    })
  }

  const remove = async () => {
    chrome.storage.sync.remove("model", () => {
      console.log('removed() →')
    })
  }

  $: syncedDate = $model.synced ? new Date($model.synced).toISOString() : "unsynced"

</script>

<aside>
  <h2>settings</h2>

  <dl>
    <dt>
      <label for="wallet">my wallet address:</label>
    </dt>
    <dd>
      <input type="text" name="wallet" bind:value={$model.wallet} />
    </dd>
  
    <dt>synced:</dt>
    <dd>
      <div>
        {syncedDate}
      </div>
      <div>
        <button on:click={resync}>resync</button>
        <button on:click={storage}>get storage</button>
        <button on:click={remove}>clr storage</button>
      </div>
    </dd>

    <dt>asset count:</dt>
    <dd>
      {$model.assets?.length || "n/a"}
    </dd>
  
  </dl>

</aside>

<style style lang="postcss">
  
  aside {
    @apply bg-grey-200 dark:bg-grey-800;
    @apply text-grey-900 dark:text-gray-100;
    @apply font-mono;

    @apply p-8;
    @apply rounded;

    @apply absolute;
    @apply top-4 left-4;

    @apply space-y-4;
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
