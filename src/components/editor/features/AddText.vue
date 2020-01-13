<template>
    <div class="feature">
        <p class="title">Text Properties</p>
        
        <div class="feature-container">
            <TextInput :inputData="{
                label: 'Text: ',
                model: 'Sample Text',
                placeholder: '',
                type: 'text',
                focus: true
            }" />
        </div>

        <div class="feature-container">
            <FontSelect/>
        </div>

        <div class="feature-container">
            <TextInput :inputData="{
                label: 'Font Size (px): ',
                model: '14',
                placeholder: '',
                type: 'number'
            }" />
        </div>

    </div>
</template>
<script>
    import TextInput from './../../items/TextInput'
    import FontSelect from './../../items/FontSelect'
    
    export default {
        name: 'AddText',
        components: {
            TextInput,
            FontSelect
        }
    }
</script>