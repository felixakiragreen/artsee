<script lang="ts">
  export let name
  export let action
</script>

<button on:click={action}><slot /></button>

<style style lang="postcss">

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

</style>
