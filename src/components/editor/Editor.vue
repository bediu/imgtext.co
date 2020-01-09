<template>

  <div class="editor" id="imgEditor">

    <Uploader />
    <ImagePreview />

    <!-- settings -->
    <div class="editor-footer">
      <Flip />
      <Rotate />
      <Zoom />
      <Fit />
    </div>


  </div>

</template>

<script>
  import Uploader from './Uploader.vue'
  import ImagePreview from './ImagePreview.vue'

  import Flip from './settings/Flip.vue'
  import Rotate from './settings/Rotate.vue'
  import Zoom from './settings/Zoom.vue'
  import Fit from './settings/Fit.vue'

  export default {
    name: 'Editor',
    components: {
      Uploader,
      ImagePreview,
      Flip,
      Rotate,
      Zoom,
      Fit
    },
    methods: {},
    mounted() {
      //set editor element used to get height/width throughout the app
      this.$store.commit('setEditorElement', document.getElementById('imgEditor'));
    }
  }
</script>