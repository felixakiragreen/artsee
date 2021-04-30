<script lang="ts">

  // import pngBottom from '../assets/gallerybottom.png'
  // import pngGalleryFloor from '../assets/galleryFloorFade.png'
  // import pngGalleryCeiling from '../assets/galleryCeilingFade.png'

</script>

<div class=gallery>
  <div class=ceiling>

  </div>
  <div class=wall>

  </div>
  <div class=floor>
    <!-- <img alt="wooden gallery floor" src={pngBottom} /> -->
  </div>
</div>


<style>

  .gallery {
    @apply absolute;
    @apply h-screen w-screen;
    @apply flex flex-col;
    background: linear-gradient(to bottom,
      #efece9 0%,
      #fffffb 50%,
      #fafaf6
    );
  }

  .ceiling {
    background-image: url('../assets/galleryCeilingFade.png');
    background-position: top center;
    background-size: auto 100%;
    height: 150px;
  }
  .floor {
    background-image: url('../assets/galleryFloorFade.png');
    background-position: bottom center;
    background-size: auto 100%;
    height: 150px;
  }

  @media 
    (-webkit-min-device-pixel-ratio: 2), 
    (min-resolution: 192dpi) { 
    .ceiling {
      background-image: url('../assets/galleryCeilingFade@2x.png');
    }
    .floor {
      background-image: url('../assets/galleryFloorFade@2x.png');
    }
  }
  
  .wall {
    @apply flex-1;
  }
</style>