<script lang="ts">

  import pngBottom from '../assets/gallerybottom.png'

</script>

<div class=gallery>
  <div class=wall>

  </div>
  <div class=floor>
    <img alt="wooden gallery floor" src={pngBottom} />
  </div>
</div>


<style>

  .gallery {
    @apply absolute;
    @apply h-screen w-screen;
    @apply flex flex-col;
  }
  
  .wall {
    @apply flex-1;
    background: linear-gradient(to bottom,
    #d6d3d1 0%,
    #cfcbc7 3%,
    #b6b3ad 4.9%,
    #a8a49e 5%, 
    #d3d0c8 5.1%,
    #dbd6d3 6%,
    #ddd8d4 10%,
    #fefaf7 25%,
    #fffffb 50%,
    #fafaf6
    );
  }

  .floor {
    @apply absolute bottom-0;
  }
</style>