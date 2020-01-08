<template>
    <img :src="this.$store.state.imageFile.base64" class="image"
         :class="{'img-anim' : this.$store.state.imageFile.state}"
         :style="{
            height: this.$store.state.imageFile.preview.size.h + 'px', 
            width: this.$store.state.imageFile.preview.size.w + 'px',
           }">
</template>

<script>
  export default {
    name: 'ImageComp',
    components: {
      
    },
    computed: {
    },
    methods: {}
  }
</script>