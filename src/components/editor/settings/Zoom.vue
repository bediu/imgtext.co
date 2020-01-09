<template>
    <div class="range-group" :class="{'range-group-dis' : !this.$store.state.imageFile.state}">
        <!-- zoom minus -->
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
            id="mdi-minus-box-outline" width="24" height="24" viewBox="0 0 24 24">
            <path
                d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M17,11V13H7V11H17Z" />
        </svg>
        <!-- range -->
        <input class="range" :v-model="this.$store.state.imageFile.preview.zoom"
            :disabled="!this.$store.state.imageFile.state" type="range" value="50" min="1" max="100">
        <!-- zoom plus -->
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
            id="mdi-plus-box-outline" width="24" height="24" viewBox="0 0 24 24">
            <path
                d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z" />
        </svg>
    </div>
</template>
<script>
    export default {
        name: 'Zoom',
        methods: {

        }
    }
</script>