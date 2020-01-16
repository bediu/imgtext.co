<template>

  <div class="editor" id="imgEditor">

    <Uploader />


    <!-- canvas and elements -->
    <div :style="{
        width: this.$store.getters['image/width'] + 'px' || 0,
        height: this.$store.getters['image/height'] + 'px' || 0
      }" class="canvas-wrapper">

      <!-- canvas -->
      <CanvasPreview @click.native="canvasClick" />

      <!-- feature elements -->
      <TextElement 
        @click.native="elementClick(element.id)" 
        v-for="(element, index) in this.$store.getters['elements/textElements']" 
        :key="index"
        :elementData="element" />

    </div>

    <!-- element properties -->
    <TextProperties
      v-if="this.$store.getters['elements/activeElementId'] !== false 
         && this.$store.getters['elements/activeElement'].type === 'text'"/>

    <!-- footer -->
    <div class="editor-footer">
      <div class="btn-group btns-save" :class="{'btn-group-dis' : !this.$store.getters['image/loaded']}">
        <!-- save image -->
        <button class="btn-i btn-t btn-save" :disabled="!this.$store.getters['image/loaded']">
          SAVE
        </button>

        <!-- reset -->
        <button class="btn-i" :disabled="!this.$store.getters['image/loaded']">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
            id="mdi-delete-outline" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
          </svg>
        </button>
      </div>

      <div class="btns-flip btn-group" :class="{'btn-group-dis' : !this.$store.getters['image/loaded']}">
        <!-- horizontal -->
        <button @click="flipVertical" class="btn-i" :disabled="!this.$store.getters['image/loaded']">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
            id="mdi-flip-horizontal" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M15 21H17V19H15M19 9H21V7H19M3 5V19C3 20.1 3.9 21 5 21H9V19H5V5H9V3H5C3.9 3 3 3.9 3 5M19 3V5H21C21 3.9 20.1 3 19 3M11 23H13V1H11M19 17H21V15H19M15 5H17V3H15M19 13H21V11H19M19 21C20.1 21 21 20.1 21 19H19Z" />
          </svg>
        </button>
        <!-- vertical -->
        <button @click="flipHorizontal" class="btn-i" :disabled="!this.$store.getters['image/loaded']">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
            id="mdi-flip-vertical" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M3 15V17H5V15M15 19V21H17V19M19 3H5C3.9 3 3 3.9 3 5V9H5V5H19V9H21V5C21 3.9 20.1 3 19 3M21 19H19V21C20.1 21 21 20.1 21 19M1 11V13H23V11M7 19V21H9V19M19 15V17H21V15M11 19V21H13V19M3 19C3 20.1 3.9 21 5 21V19Z" />
          </svg>
        </button>
      </div>
    </div>

  </div>

</template>

<script>
  import Uploader from './Uploader.vue'
  import CanvasPreview from './CanvasPreview.vue'

  import TextProperties from './elements/properties/TextProperties'
  import TextElement from './elements/TextElement'

  export default {
    name: 'Editor',
    components: {
      Uploader,

      CanvasPreview,

      TextProperties,
      TextElement,

    },
    methods: {
      elementClick(id) {
        if (this.$store.getters['elements/activeElementId'] !== id) {
          this.$store.commit('elements/setActiveElement', id);
        }
      },
      canvasClick() {
        if (this.$store.getters['elements/activeElementId'] !== false) {
          this.$store.commit('elements/setActiveElement', false);
        }
      },


      //image
      flipVertical() {
        this.$store.commit('image/flip', 'x');
      },
      flipHorizontal() {
        this.$store.commit('image/flip', 'y');
      }
    },
    computed: {
 
    },
    mounted() {
      //set editor element used to get height/width throughout the app
      this.$store.commit('image/editor', document.getElementById('imgEditor'));
    }
  }
</script>