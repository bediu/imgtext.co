<template>
    <div :class="{'spin-s' : size === 0}" class="spin">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>
<script>
    export default {
        name: 'Spinner',
        props: ['size']
    }
</script>