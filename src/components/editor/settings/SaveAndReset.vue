<template>
    
      <div class="btn-group btns-left" :class="{'btn-group-dis' : !this.$store.state.imageFile.state}">
        <!-- save image -->
        <button class="btn-i btn-t btn-save" :disabled="!this.$store.state.imageFile.state">
          SAVE
        </button>

        <!-- reset -->
        <button class="btn-i" :disabled="!this.$store.state.imageFile.state">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
            id="mdi-delete-outline" width="24" height="24" viewBox="0 0 24 24">
            <path
              d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
            </svg>
        </button>
      </div>

</template>
<script>
    export default {
        name: 'SaveAndReset',
        methods: {
        }
    }
</script>