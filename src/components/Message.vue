<template>
    <div class="message" :class="{
        'error' : this.$store.getters['message/type'] === 'error',
        'success' : this.$store.getters['message/type'] === 'success',
        'warning' : this.$store.getters['message/type'] === 'warning',
        'info' : this.$store.getters['message/type'] === 'info',
        'message-show' : this.$store.getters['message/show']
    }">
        <p class="desc">{{this.$store.getters['message/text']}}</p>
        <svg @click="hideMessage" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1" id="mdi-close-circle" width="24" height="24" viewBox="0 0 24 24">
            <path
                d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
        </svg>
    </div>
</template>
<script>
    export default {
        name: 'Message',
        methods: {
            hideMessage() {
                this.$store.dispatch('message/hide');
            }
        }
    }
</script>