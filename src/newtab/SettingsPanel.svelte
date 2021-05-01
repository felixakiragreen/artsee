<script lang="ts">
  import { 
    config,
    logStorage,
    deletePersistence,
    wallet,
    synced,
    assets,
    clearAssets,
    fetchAllAssets
  } from '../model'

  const sync = async () => {
    clearAssets()
    await fetchAllAssets()
  }

  $: syncedDate = $synced?.finished ? new Date($synced?.finished).toISOString() : "n/a"

  const clearWallet = () => {
    deletePersistence()
  }

</script>

<h2>settings</h2>

<ul>
  <li>
    <label for=autoSync>sync new NFTs automatically</label>
    <input type=checkbox name=autoSync id=autoSync bind:checked={$config.autoSync} />
    <br />
    <span class=info>increases network usage for collections over 50</span>
  </li>
  <li>
    <label for=autoHideControls>hide controls after</label>
    <input type=number name=autoHideControls id=autoHideControls bind:value={$config.autoHideControls} />
    <span>seconds</span>
    <br /><span class=info>set to 0 to disable</span>
  </li>
  <li>
    <label for=autoHideText>hide text after</label>
    <input type=number name=autoHideText id=autoHideText bind:value={$config.autoHideText} />
    <span>seconds</span>
    <br /><span class=info>set to 0 to disable</span>
  </li>
  <li>
    <label for=autoCycle>display new NFT after</label>
    <input type=number name=autoCycle id=autoCycle bind:value={$config.autoCycle} />
    <span>seconds</span>
    <br /><span class=info>kinda like a screensaver</span>
  </li>
  <li>
    <label for=autoPlay>auto play audio & video</label>
    <input type=checkbox name=autoPlay id=autoPlay bind:checked={$config.autoPlay} />
  </li>
</ul>
<ul>
  <li>
    <label for="wallet">wallet address</label><br />
    <input type="text" name="wallet" id=wallet bind:value={$wallet} />
  </li>
  <li>
    <div><label>last sync</label> {syncedDate}</div>
  </li>
  <li>
    <div><label>number of NFTs</label> {$assets?.length || "n/a"}</div>
  </li>
  <li>
    <div>
      <button on:click={sync}>refresh NFTs</button>
      <button on:click={clearWallet}>remove wallet</button>
      <!-- <button on:click={deleteStorage}>del storage</button> -->
      <button on:click={logStorage}>log</button>
    </div>
  </li>
  <li>
    <div><label>help support development → </label> artsee.eth</div>
    <span class=info>eth & nfts welcome!</span>
    <br />
    <span>
      💚 <a href="https://ambition.wtf" target="_blank">ambition.wtf</a>
    </span>
  </li>
</ul>

<!-- <dt>fucking NERD shit:</dt>
<dd>
  <div class=json>
    {$synced && JSON.stringify($synced, null, 2)}
  </div>
</dd> -->


<style style lang="postcss">
  
  h2 {
    @apply text-2xl;
  }

  ul {
    @apply space-y-4;
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

  input[type="text"] {
    @apply w-[450px];    
    @apply px-4;
    /* @apply px-4 pt-2 pb-1; */
  }

  #wallet {
    @apply mt-2;
  }

  input[type="number"] {
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
