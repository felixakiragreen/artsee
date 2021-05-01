<script lang="ts">
  import { onMount } from 'svelte'
  import { ethers } from 'ethers'
  
  import { wallet, synced, fetchAllAssets, clearAssets } from '../model'
  
  import Button from '../lib/Button.svelte'
  import artseeIcon from '../assets/icons/icon.svg'
  
  let provider

  onMount(async () => {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum)
    } else {
      provider = new ethers.providers.JsonRpcProvider(
        'https://mainnet.infura.io/v3/da815cf05b444e48a14150ab422c132e',
      )
    }
  })

  let address
  let isValid
  let isEth
  let error

  const ethAddress = new RegExp(/^0x[a-fA-F0-9]{40}$/)

  const onAddressInput = () => {
    if (address.slice(-4) === '.eth') {
      isValid = true
      isEth = true
      // console.log("IS ETH")
    } else if (ethAddress.test(address)) {
      isValid = true
      // console.log("valid address")
    } else {
      // console.log(address)
    }
  }

  const onAddressBlur = () => {
    if (address.slice(-4) === '.eth') {
      isValid = true
      isEth = true
      // console.log("IS ETH")
    } else if (ethAddress.test(address)) {
      isValid = true
      // console.log("valid address")
    } else if (address == "") {
      isValid = undefined
      // console.log(address)
    } else {
      isValid = false
      // console.log(address)
    }
  }

  const onAddressChange = async () => {
    // onAddressBlur()

    await sync()
  }

  const onAddressPersist = async () => {
    return new Promise((resolve, reject) => {
      if (isValid) {
        if (isEth) {
          provider.resolveName(address)
            .then((addy) => {
              // it returns null if none was found
              if (!addy) {
                const err = `ENS lookup did not find an address for: ${address}`
                error = err
                console.error(err)
                reject(err)      
              } else {
                wallet.set(addy)
                resolve(addy)
              }
            })
        } else {
          wallet.set(address)
          resolve(address)
        }
      } else {
        const err = "invalid address"
        error = err
        console.error(err)
        reject(err)
      }
    })
  }

  const sync = async () => {
    error = undefined
    onAddressPersist()
      .then(() => {
        clearAssets()
        fetchAllAssets()
      })
  }

</script>




<section>

  <div class=logo>
    <img alt="cute lil artsee" src={artseeIcon} />
  </div>

  <h2>welcome to the artsee BETA!</h2>
  
  <i>bring NFTs into your daily life</i>

  <div class=wallet>
    <input
      type="text"
      bind:value={address}
      on:input={onAddressInput}
      on:change={onAddressChange}
      on:blur={onAddressBlur}
      placeholder="wallet address (or .eth)"
      class={isValid ? "valid" : isValid === false ? "invalid" : undefined}
    />
    <Button>{$synced.started ? `syncing... ${$synced.count || 0}` : "sync"}</Button>
  </div>

  {#if error}
    <p class=error>{error}</p>
  {/if}

  <p>
    join our <a href="https://discord.gg/6j65H7nqSd" target="_blank">discord</a>
    to report bugs or request features
  </p>

  <p>
    💚 <a href="https://ambition.wtf" target="_blank">ambition.wtf</a>
  </p>

</section>



<style style lang="postcss">

  section {
    /* @apply text-grey-900 dark:text-gray-100; */
    @apply text-gray-100;
    @apply font-mono;
    @apply text-center;

    @apply space-y-4;
    /* @apply w-full; */
    @apply px-4;
  }

  .logo {
    @apply h-40 w-32 mx-auto;
  }

  h2 {
    @apply text-2xl;
  }

  i {
    @apply block;
    @apply my-4;
    @apply text-base text-green-300;
  }

  .wallet {
    @apply flex flex-row;
    @apply w-full;

    & input {
      @apply flex-1 mr-4;
    }
  }

  input[type="text"] {
    /* @apply bg-grey-200 dark:bg-grey-800; */
    @apply bg-grey-800;
    
    @apply text-lg;
    /* @apply text-grey-800 dark:text-gray-200;
    @apply focus:text-green-800 focus:dark:text-green-200; */
    @apply text-gray-200;
    @apply focus:text-green-200;
    
    @apply px-4 py-2;
    @apply rounded-md;
    @apply w-[500px];

    /* @apply ring-green-300 dark:ring-green-700; */
    @apply ring-green-500;
    @apply hover:ring-1;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-0;

    &.valid {
      /* @apply bg-green-200 dark:bg-green-800; */
      @apply bg-green-800;
    }

    &.invalid {
      /* @apply bg-red-200 dark:bg-red-800; */
      @apply bg-red-800;
    }
  }

  a {
    @apply underline hover:no-underline;
  }

  .error {
    /* @apply text-red-700 dark:text-red-300; */
    @apply text-red-300;
  }

</style>