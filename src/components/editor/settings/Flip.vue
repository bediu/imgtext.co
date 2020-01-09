<template>
    <div class="btns-flip btn-group" :class="{'btn-group-dis' : !this.$store.state.imageFile.state}">
        <!-- horizontal -->
        <button class="btn-i" :disabled="!this.$store.state.imageFile.state">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                id="mdi-flip-horizontal" width="24" height="24" viewBox="0 0 24 24">
                <path
                    d="M15 21H17V19H15M19 9H21V7H19M3 5V19C3 20.1 3.9 21 5 21H9V19H5V5H9V3H5C3.9 3 3 3.9 3 5M19 3V5H21C21 3.9 20.1 3 19 3M11 23H13V1H11M19 17H21V15H19M15 5H17V3H15M19 13H21V11H19M19 21C20.1 21 21 20.1 21 19H19Z" />
            </svg>
        </button>
        <!-- vertical -->
        <button class="btn-i" :disabled="!this.$store.state.imageFile.state">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                id="mdi-flip-vertical" width="24" height="24" viewBox="0 0 24 24">
                <path
                    d="M3 15V17H5V15M15 19V21H17V19M19 3H5C3.9 3 3 3.9 3 5V9H5V5H19V9H21V5C21 3.9 20.1 3 19 3M21 19H19V21C20.1 21 21 20.1 21 19M1 11V13H23V11M7 19V21H9V19M19 15V17H21V15M11 19V21H13V19M3 19C3 20.1 3.9 21 5 21V19Z" />
            </svg>
        </button>
    </div>
</template>
<script>
    export default {
        name: 'Flip',
        methods: {

        }
    }
</script>