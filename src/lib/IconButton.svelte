<script lang="ts">
  export let onClick
</script>

<div on:click={onClick}>
  <slot />
</div>

<style style lang="postcss">

div {
  @apply p-2;
  @apply rounded;
  @apply cursor-pointer;

  @apply text-grey-900 dark:text-gray-100;
  @apply hover:text-green-700 hover:dark:text-green-300;

  @apply bg-grey-200 dark:bg-grey-800;
  @apply hover:bg-green-300 hover:dark:bg-green-700;

  @apply bg-opacity-25 hover:bg-opacity-50;
  @apply backdrop-filter backdrop-blur-md;
  @apply transition;

  @apply h-10 w-10;
}

</style>