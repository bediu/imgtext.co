<template>
    <div class="element-properties">

        <!-- color input -->
        <div class="property-container">
            <div class="text-input">
                <span class="label">Background Color: </span>
                <div @click="showPicker = !showPicker" :style="{background: color }" class="color-pick"></div>
                <input v-model="color" type="text">
            </div>
        </div>

        <!-- palette & picker  -->        
        <div class="property-container picker-container" :style="{height: showPicker ? '167px' : '0px'}">
            <div class="text-input">
                <span class="label label-d" :style="{opacity: showPicker ? 1 : 0}">Color Picker: </span>
                <Picker :color.sync="color" :updatePicker.sync="updatePicker" />
                <div class="color-container">
                <div @click="palettePick('#FFFFFFFF')" style="backgroundColor: white" class="color"></div>
                <div @click="palettePick('#000000FF')" style="backgroundColor: black" class="color"></div>
                <div @click="palettePick(dominantColor)" :style="{backgroundColor: dominantColor}" class="color"></div>
                <div @click="palettePick(color)" v-for="(color, index) in this.$store.getters['image/palette']" :key="index" :style="{backgroundColor: color}" class="color"></div>
            </div>
            </div>
        </div>
          <div class="property-container">
            <button class="btn-o" @click="deleteElement">
                REMOVE
            </button>
        </div>
    </div>
</template>
<script>
    import Picker from './../../Picker';
    export default {
        name: 'PropertiesBackground',
        components: {
            Picker
        },
        data() {
            return {
                showPicker: false,
                updatePicker: false
            }
        },
        computed: {
            color: {
                get() {
                    return this.$store.getters['elements/activeElement'].color;
                },
                set(n) {
                    this.$store.commit('elements/setElementColorA', n);
                }
            },
            dominantColor: function(){
               return this.$store.getters['image/dominantColor'];
           }
        },
        methods: {
             palettePick(color) {
               this.color = color; 
               this.updatePicker = true;
           },
           deleteElement() {
               this.$store.commit('elements/deleteActiveElement');
           }
        }

    }
</script>