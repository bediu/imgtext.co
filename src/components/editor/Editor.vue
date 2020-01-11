<template>

  <div class="editor" id="imgEditor">

    <Uploader />
    <ImagePreview />

    <!-- settings -->
    <div class="editor-footer">
      <SaveAndReset/>
      <Flip />
      <Zoom />
      <Size />

    </div>


  </div>

</template>

<script>
  import Uploader from './Uploader.vue'
  import ImagePreview from './ImagePreview.vue'

  import SaveAndReset from './settings/SaveAndReset.vue'
  import Flip from './settings/Flip.vue'
  import Zoom from './settings/Zoom.vue'
  import Size from './settings/Size.vue'

  export default {
    name: 'Editor',
    components: {
      Uploader,
      ImagePreview,
      SaveAndReset,
      Flip,
      Zoom,
      Size
    },
    methods: {},
    mounted() {
      //set editor element used to get height/width throughout the app
      this.$store.commit('setEditorElement', document.getElementById('imgEditor'));
    }
  }
</script>