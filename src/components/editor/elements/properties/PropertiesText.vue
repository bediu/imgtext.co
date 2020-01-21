<template>
    <div class="element-properties">


        <!-- text -->
        <div class="property-container">
            <div class="text-input">
                <span class="label">
                    Text:
                </span>
                <textarea v-model="text" />
                </div>
        </div>
        
        <!-- font family -->
        <div class="property-container">
            <div class="text-input" @click="fontListShow">
                <span class="label">
                    Font: 
                </span>
                <svg class="font-dd" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    <path fill="none" d="M0 0h24v24H0V0z" />
                </svg>

                <input v-model="this.$store.getters.fonts[fontIndex].name" :style="{fontFamily: this.$store.getters.fonts[fontIndex].family}" type="text" class="font-select" disabled>

                <!-- font list -->
                <div :class="{'font-list-show' : showFonts}" class="font-list">
                    <div @click="fontSelect(index)" v-for="(font, index) in this.$store.getters.fonts" :key="index" class="font-item">
                        <p :style="{fontFamily: font.family}">{{font.name}}</p>
                    </div>
                </div>

            </div>
        </div>
        
        <!-- font size -->
        <div class="property-container">
            <div class="text-input">
                <span class="label">
                    Font Size: 
                </span>
                <input v-model="fontSize" type="number">
            </div>
             <div class="text-input">
                <span class="label">
                    Line Height: 
                </span>
                <input v-model="lineHeight" type="number">
            </div>
        </div>

        <br>
        <!-- color input -->
        <div class="property-container">
            <div class="text-input">
                <span class="label">Color: </span>
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
        name: 'PropertiesText',
        components: {
            Picker
        },
        data() {
            return {
                showFonts: false,
                showPicker: false,
                updatePicker: false
            }
        },
        computed: {
            activeId: function() {
                return this.$store.getters['elements/activeElementId'];
            },
           text: {
               get() {
                   return this.$store.getters['elements/activeElement'].text
               },
               set(n) {
                   this.$store.commit('elements/setElementTextA', n);
               }
           },
           fontSize: {
               get() {
                   return this.$store.getters['elements/activeElement'].fontSize;
               },
               set(n) {
                   this.$store.commit('elements/setElementFontSizeA', n);
               }
           },
           fontIndex: {
               get() {
                   return this.$store.getters['elements/activeElement'].fontIndex;
               },
               set(n) {
                   this.$store.commit('elements/setElementFontIndexA', n);
               }
           },
           lineHeight: {
               get() {
                   return this.$store.getters['elements/activeElement'].lineHeight;
               },
               set(n) {
                   this.$store.commit('elements/setElementLineHeightA', n);
               }
           },
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
           fontListShow() {
               this.showFonts = !this.showFonts;
               if (!this.$store.getters.fontsLoaded) {
                   this.$store.dispatch('loadFonts');
               }
           },
           fontSelect(index) {
               this.fontIndex = index;
           },
           palettePick(color) {
               this.color = color; 
               this.updatePicker = true;
           },
           deleteElement() {
               this.$store.commit('elements/deleteActiveElement');
           }
        },
        watch: {
            activeId: function(n) {
                this.updatePicker = true;
                this.showPicker = false;
            }
        }
    }
</script>