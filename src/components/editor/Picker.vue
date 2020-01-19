<template>
    <!-- 
// NOTE:
// This color picker works with dynamic heights and widths
// and therefore dragging can be slightly inacurrate.
// 
// Don't use it where accuracy is necessary. 
-->

    <div class="picker">

        <!-- saturation -->
        <div :style="{ backgroundColor: 'hsl(' + this.hue + ', 100%, 50%)' }" ref="divBox" class="saturation">

            <div class="picker-drag" @mousedown.prevent="divBoxDown" @mousemove.prevent="divBoxMove"
                @mouseup.prevent="divBoxLeave" @mouseleave.prevent="divBoxLeave"></div>

            <div class="saturation-gradient saturation-w"></div>
            <div class="saturation-gradient saturation-b"></div>
            <div :style="{left: this.divBox.pickerX + 'px', top: this.divBox.pickerY + 'px', 
                cursor: this.divBox.isDragging ? 'grab' : 'pointer'}" class="picker-pointer" ref="pointerSquare">
            </div>
        </div>


        <!-- hue -->
        <div ref="hue" class="hue">
            <div class="picker-drag" @mousedown.prevent="hueDown" @mousemove.prevent="hueMove"
                @mouseup.prevent="hueLeave" @mouseleave.prevent="hueLeave">
            </div>
            <div :style="{ left: this.divHue.pickerX + 'px' }" class="picker-pointer"></div>
        </div>

        <!-- alpha -->
        <div ref="alpha" class="alpha">
            <div class="picker-drag" @mousedown.prevent="alphaDown" @mousemove.prevent="alphaMove"
                @mouseup.prevent="alphaLeave" @mouseleave.prevent="alphaLeave"></div>
            <div :style="{ left: this.divAlpha.pickerX + 'px' }" class="picker-pointer"></div>
        </div>

    </div>
</template>
<script>
    import {
        hex_to_hsv,
        hsv_to_hex
    } from './../../js/colorconvert';

    export default {
        name: 'Picker',
        props: ['color', 'updatePicker'],
        data() {
            return {

                divBox: {
                    isDragging: false,
                    height: 0,
                    width: 0,
                    pickerX: 0,
                    pickerY: 0
                },
                divHue: {
                    isDragging: false,
                    width: 0,
                    pickerX: 0
                },
                divAlpha: {
                    isDragging: false,
                    width: 0,
                    pickerX: 0
                }

            }
        },
        computed: {

            //color
            hue: {
                get() {
                    return hex_to_hsv(this.color)[0];
                },
                set(n) {
                    this.updateColor(hsv_to_hex([n, this.saturation, this.value, this.alpha]));
                }
            },
            saturation: {
                get() {
                    return hex_to_hsv(this.color)[1];
                },
                set(n) {
                    this.updateColor(hsv_to_hex([this.hue, n, this.value, this.alpha]));
                }
            },
            value: {
                get() {
                    return hex_to_hsv(this.color)[2];
                },
                set(n) {
                    this.updateColor(hsv_to_hex([this.hue, n.saturation, n.value, this.alpha]));
                }
            },
            alpha: {
                get() {
                    return hex_to_hsv(this.color)[3];
                },
                set(n) {
                    this.updateColor(hsv_to_hex([this.hue, this.saturation, this.value, n]));
                }
            },
            hex: {
                get() {
                    return hsv_to_hex([this.hue, this.saturation, this.value,
                        this.alpha
                    ]);
                },
                set() {
                    return n;
                }
            },

        },
        methods: {
            
            initPicker() {
                this.divBox.height = this.$refs.divBox.clientHeight;
                this.divBox.width = this.$refs.divBox.clientWidth;
                this.divBox.pickerX = this.saturation / (100 / this.divBox.width);
                this.divBox.pickerY = (100 - this.value) / (100 / this.divBox.height);

                this.divHue.width = this.$refs.hue.clientWidth;
                this.divHue.pickerX = this.hue / (360 / this.divHue.width) - 6;
                
                this.divAlpha.width = this.$refs.alpha.clientWidth;
                this.divAlpha.pickerX = this.alpha * 100 / (100 / this.divAlpha.width) - 6;
            },
            updateColor(color) {
                this.$emit('update:color', color);
            },


            //drag handlers
            divBoxDown(e) {
                this.divBox.isDragging = true;
                this.divBox.pickerX = e.offsetX - 6;
                this.divBox.pickerY = e.offsetY - 6;
                this.value = {
                    value: 100 - (e.offsetY) * (100 / this.divBox.height),
                    saturation: (e.offsetX) * (100 / this.divBox.width)
                };
            },
            divBoxLeave(e) {
                if (this.divBox.isDragging) {
                    this.divBox.isDragging = false;
                }
            },
            divBoxMove(e) {
                if (e && this.divBox.isDragging) {
                    if (e.offsetY >= 0 && e.offsetY <= this.divBox.height &&
                        e.offsetX >= 0 && e.offsetX <= this.divBox.width) {

                        this.divBox.pickerY = e.offsetY - 6;
                        this.divBox.pickerX = e.offsetX - 6;

                        this.value = {
                            value: 100 - (e.offsetY) * (100 / this.divBox.height),
                            saturation: (e.offsetX) * (100 / this.divBox.width)
                        };

                    } else {
                        this.divBoxLeave();
                    }
                }
            },


            hueDown(e) {
                this.divHue.isDragging = true;
                this.divHue.pickerX = e.offsetX - 6;
                this.hue = e.offsetX * (360 / this.divHue.width);
            },
            hueLeave() {
                if (this.divHue.isDragging) {
                    this.divHue.isDragging = false;
                }
            },
            hueMove(e) {
                if (e && this.divHue.isDragging) {

                    if (e.offsetX >= 0 && e.offsetX <= this.divHue.width) {
                        this.divHue.pickerX = e.offsetX - 6;
                        this.hue = e.offsetX * (360 / this.divHue.width);
                    }

                } else {
                    this.hueLeave();
                }
            },


            alphaDown(e) {
                this.divAlpha.isDragging = true;
                this.divAlpha.pickerX = e.offsetX - 6;
                this.alpha = (e.offsetX * (100 / this.divAlpha.width)) / 100
            },
            alphaLeave() {
                if (this.divAlpha.isDragging = true) {
                    this.divAlpha.isDragging = false;
                }
            },
            alphaMove(e) {
                if (e && this.divAlpha.isDragging) {
                    if (e.offsetX >= 0 && e.offsetX <= this.divAlpha.width) {
                        this.divAlpha.pickerX = e.offsetX - 6;
                        this.alpha = (e.offsetX * (100 / this.divAlpha.width)) / 100;
                    }
                } else {
                    this.alphaLeave();
                }
            }

        },
        watch: {
            updatePicker: function(n) {
                if (n) {
                    this.initPicker();
                    this.$emit('update:updatePicker', false);
                }
            }
        },
        mounted() {

            this.initPicker();

        }
    }
</script>