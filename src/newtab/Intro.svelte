<script lang="ts">
  import { model } from '../model'
  import ArtSee from '../lib/ArtSee.svelte'
  import Button from '../lib/Button.svelte'
  
  let syncing

  const sync = async () => {
    syncing = true
    await model.fetchAll()
  }

</script>




<section>

  <!-- <div class=logo>
    <ArtSee />
  </div> -->
  <div class="logo emoji">
    🖼 👀
  </div>

  <h2>welcome to the artsee BETA!</h2>
  
  <i>a thing for viewing your NFthings</i>

  <p>
    right now things are super basic<br />
    to get started just enter your wallet here and click "sync"
  </p>

  <div class=wallet>
    <input type="text" bind:value={$model.wallet} placeholder="wallet address" />
    <Button action={sync}>{syncing ? `syncing...${$model.synced?.count || 0}` : "sync"}</Button>
  </div>

  <p>
    if you acquire any new NFTs<br />
    you'll need to click on the gear icon and click "sync" again<br />
    (until we add auto-syncing ;)
  </p>

  <p>
    pls join our <a href="https://discord.gg/6j65H7nqSd" target="_blank">discord</a>
    to report bugs
    or request features!
  </p>

  <p>
    🙏 thank you for trying out the artsee beta!
  </p>

  <p>
    💚 <a href="https://ambition.wtf" target="_blank">ambition.wtf</a>
  </p>


</section>



<style style lang="postcss">

  section {
    @apply text-grey-900 dark:text-gray-100;
    @apply font-mono;
    @apply text-center;

    @apply space-y-4;
    /* @apply w-full; */
    @apply px-4;
  }

  .logo {
    @apply w-48 h-24 mx-auto my-4;
    @apply text-grey-900;
  }

  h2 {
    @apply text-2xl;
  }

  i {
    @apply block;
    @apply italic font-serif my-4;
  }

  .wallet {
    @apply flex flex-row;
    @apply w-full;

    & input {
      @apply flex-1 mr-4;
    }
  }

  input[type="text"] {
    @apply bg-grey-200 dark:bg-grey-800;
    
    @apply text-lg;
    @apply text-grey-800 dark:text-gray-200;
    @apply focus:text-green-800 focus:dark:text-green-200;
    
    @apply px-4 py-2;
    @apply rounded-lg;
    @apply w-[500px];

    @apply ring-green-300 dark:ring-green-700;
    @apply hover:ring-1;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-0;
  }

  a {
    @apply underline hover:no-underline;
  }

</style>