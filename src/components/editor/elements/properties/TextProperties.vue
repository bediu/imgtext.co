<template>
    <div class="element-properties">
        <p class="title">Text Properties</p>

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
        </div>

        <!-- line height -->
        <div class="property-container">
            <div class="text-input">
                <span class="label">
                    Line Height: 
                </span>
                <input v-model="lineHeight" type="number">
            </div>
        </div>
        
<!-- 
        <div class="property-container">
            <div class="color-container">
                <span class="label">Color: </span>
                <div v-for="color in this.$store.getters['image/palette']" :key="color + ''" :style="{
                        backgroundColor: 'rgb(' + color + ')'
                    }" class="color"></div>

                <div class="spacer"></div>
                <div class="color color-pick">
                </div>

            </div>
        </div> -->

    </div>
</template>
<script>
    export default {
        name: 'TextProperties',
        data() {
            return {
                showFonts: false,
            }
        },
        computed: {
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
           }
        }
    }
</script>