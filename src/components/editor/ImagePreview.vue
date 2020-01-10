<template>
  <canvas id="imgCanvas" class="canvas" :class="{'canvas-anim' : this.$store.state.imageFile.state,
           'canvas-drag' : this.$store.state.imageFile.draggable}" @mousedown="canvasDragStart"
    @mouseup="canvasDragStop" @mouseout="canvasDragStop" @mousemove="canvasDrag"></canvas>

</template>

<script>
  import {
    initCanvasTransforms,
    canvasPrepareTransforms
  } from './../../js/methods/canvas'

  export default {
    name: 'ImagePreview',
    data() {
      return {
        isDragging: false,
        lastX: 0,
        lastY: 0,
        dragContext: null
      }
    },
    mounted() {

      this.$store.commit('setCanvasElement', document.getElementById('imgCanvas'));
      this.$store.commit('setCanvasContext', document.getElementById('imgCanvas').getContext('2d'));
      canvasPrepareTransforms(this.$store.state.canvasContext);

    },
    methods: {

      canvasDragStart(e) {
        if (this.$store.state.imageFile.draggable) {

          this.isDragging = true;

          this.dragContext = this.$store.state.canvasContext.transformedPoint(
            e.offsetX || e.pageX - this.$store.state.canvasElement.offsetLeft,
            e.offsetY || e.pageY - this.$store.state.canvasElement.offsetTop);

        }
      },

      canvasDragStop(e) {
        if (this.$store.state.imageFile.draggable) {
          this.isDragging = false;
        }
      },

      canvasDrag(e) {
        if (this.$store.state.imageFile.draggable && this.isDragging) {

          if (this.dragContext) {

            this.$store.state.canvasContext.clearRect(0, 0, 
            this.$store.state.imageFile.size.w, 
            this.$store.state.imageFile.size.h);
            

            var pt = this.$store.state.canvasContext.transformedPoint(
              e.offsetX || (e.pageX - this.$store.state.canvasElement.offsetLeft),
              e.offsetY || (e.pageY - this.$store.state.canvasElement.offsetTop));

            this.$store.state.canvasContext.translate(
              pt.x - this.dragContext.x,
              pt.y - this.dragContext.y);

            var p1 = this.$store.state.canvasContext.transformedPoint(0, 0);
            var p2 = this.$store.state.canvasContext.transformedPoint(
              this.$store.state.canvasElement.width,
              this.$store.state.canvasElement.height);

            //this.$store.state.canvasContext.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
            this.$store.state.canvasContext.drawImage(this.$store.state.imageFile.raw,
              0,
              0,
              this.$store.state.imageFile.size.w,
              this.$store.state.imageFile.size.h);

          }

        }
      },

    }
  }
</script>