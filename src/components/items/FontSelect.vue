<template>
    <div class="text-input" @click="selectClick">
        <span class="label">
            Font:
        </span>

        <input v-model="this.activeFont.name" :style="{fontFamily: this.activeFont.family}" class="font-select" type="text" disabled>
        <svg class="font-dd" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            <path fill="none" d="M0 0h24v24H0V0z" /></svg>

        <!-- font list -->
        <div class="font-list" :class="{'font-list-show' : showList}">
            <div @click="select(font)" v-for="font in fonts" :key="font.name" class="font-item">
                <p :style="{fontFamily: font.family}">{{font.name}}</p>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'FontSelect',
        props: ['FontD'],
        components: {},
        data() {
            return {
                activeFont: {
                    name: 'Roboto',
                    family: '\'Roboto\', sans-serif',
                },
                model: 'Roboto',
                showList: false,
                fontsLoaded: false,
                fonts: [{
                        name: 'Roboto',
                        family: '\'Roboto\', sans-serif',
                    },
                    {
                        name: 'Cooper Hewitt Heavy',
                        family: '\'CooperHewitt-Heavy\'',
                    },
                    {
                        name: 'Archivo Black',
                        family: '\'ArchivoBlack\'',
                    },
                    {
                        name: 'Work Sans Extra Bold',
                        family: '\'WorkSans-ExtraBold\'',
                    },
                    {
                        name: 'Nimbus Sans L',
                        family: '\'nimbus-sans-l_bold\'',
                    },
                    {
                        name: 'Oswald Bold',
                        family: '\'Oswald-Bold\'',
                    },
                    {
                        name: 'Poppins Medium',
                        family: '\'Poppins-Medium\'',
                    },
                    {
                        name: 'Libre Baskerville',
                        family: '\'LibreBaskerville-Regular\'',
                    },
                    {
                        name: 'EB Garanmond Regular',
                        family: '\'EBGaramond12-Regular\'',
                    },
                    {
                        name: 'Aileron UltraLight',
                        family: '\'Aileron-UltraLight\'',
                    },

                    {
                        name: 'Work Sans Light',
                        family: '\'WorkSans-Light\'',
                    },

                    {
                        name: 'Office Code Pro',
                        family: '\'OfficeCodePro-Light\''
                    }
                ]
            }
        },
        methods: {
            selectClick() {
                this.showList = !this.showList;

                if (!this.$store.state.fontsLoaded) {
                    this.$store.dispatch('loadFonts');
                }

            },
            select(font) {
                this.activeFont = font;
            }
        }
    }
</script>