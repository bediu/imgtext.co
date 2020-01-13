<template>
    <div class="text-input">
        <span class="label">
            {{inputData.label}}
        </span>
        <input :type="inputData.type" v-model="inputData.model" :placeholder="inputData.placeholder">
    </div>
</template>
<script>
export default {
    name: 'TextInput',
    props: ['inputData']
}
</script>