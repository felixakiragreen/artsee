<script>
  import ArtSee from '../lib/ArtSee.svelte'

</script>

<div class=empty>
  <!-- <p>🖼 👀</p> -->
  <div class=shrink>
    <ArtSee />
  </div>
</div>

<style style lang="postcss">

  .empty {
    width: 50vw;
    height: 50vh;
    @apply flex items-center justify-center;

    @apply text-grey-900 opacity-50;
  }

  .shrink {
    @apply w-48;
  }

  p {
    @apply text-8xl;
    font-size: 256px;
  }

</style>
