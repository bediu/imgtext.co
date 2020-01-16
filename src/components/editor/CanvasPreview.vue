<template>
  

  <canvas id="imgCanvas" class="canvas" 
          :class="{'canvas-anim' : this.$store.getters['image/loaded']}">
          
  </canvas>

</template>

<script>
 
  export default {
    name: 'CanvasPreview',
    mounted() {

      var canvasElement = document.getElementById('imgCanvas');
      var canvasContext = canvasElement.getContext('2d');

      this.$store.commit('image/canvas', canvasElement);
      this.$store.commit('image/canvasContext', canvasContext);
    
      // window.addEventListener('resize', e => {
      // });

    }

  }
</script>