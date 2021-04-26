<script lang="ts">
  // export let cls
</script>

<div>
  <slot />
</div>

<style style lang="postcss">

div {
  @apply p-2;
  @apply rounded;
  @apply cursor-pointer;

  @apply text-grey-900 dark:text-gray-100 hover:text-green-700 hover:dark:text-green-300;
  @apply hover:bg-grey-300 hover:dark:bg-gray-700;
  @apply bg-opacity-25 hover:bg-opacity-50; 
}

</style>