<script lang=ts>
  import artseeIcon from '../assets/icons/icon.svg'
</script>

<div class=empty>
  <div class=shrink>
    <img alt="cute lil artsee" src={artseeIcon} />
  </div>
</div>

<style style lang="postcss">

  .empty {
    @apply flex items-center justify-center;
    @apply text-grey-900;
  }

  .shrink {
    @apply w-48;
  }

  p {
    @apply text-8xl;
    font-size: 256px;
  }

</style>
