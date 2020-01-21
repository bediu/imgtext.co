<template>
    <div class="background-element" ref="backgroundElement"
        :class="{'element-active' : this.elementData.id === this.$store.getters['elements/activeElementId']}" :style="{
            top: this.y + 'px',
            left: this.x + 'px',
            width: this.w + 'px',
            height: this.h + 'px',
            backgroundColor: this.elementData.color,
            zIndex: elementData.id === this.$store.getters['elements/activeElementId'] ? 6 : 5
        }" @mousedown.stop="mouseDown" @mouseup.stop="mouseUp" @mousemove.stop="mouseMove" @mouseleave.stop="mouseUp">

        <!-- resize -->
        <div v-if="this.elementData.id === this.$store.getters['elements/activeElementId']" class="background-move">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                id="mdi-arrow-top-left-bottom-right" width="24" height="24" viewBox="0 0 24 24">
                <path d="M13,21H21V13H19V17.59L6.41,5H11V3H3V11H5V6.41L17.59,19H13V21Z" /></svg>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'ElementBackground',
        props: ['elementData'],
        data() {
            return {
                isDragging: false,
                isResizing: false,
                offsetX: 0,
                offsetY: 0,
                x: 0,
                y: 0,
                w: 0,
                h: 0
            }
        },
        methods: {
            mouseDown(e) {

                if (this.$store.getters['elements/activeElementId'] !== this.elementData.id) {
                    this.$store.commit('elements/setActiveElement', this.elementData.id);
                }

                if (e.offsetX > 19 && e.offsetY > 19) {
                    this.isDragging = true;
                } else {
                    this.isResizing = true;
                }

                this.offsetX = e.clientX;
                this.offsetY = e.clientY;


            },
            mouseUp() {


                if (this.isDragging) {

                    this.isDragging = false;

                    this.$store.commit('elements/setElementPositionA', {
                        id: this.elementData.id,
                        x: this.x,
                        y: this.y
                    });
                }

                if (this.isResizing) {

                    this.isResizing = false;

                    this.$store.commit('elements/setElementSizeA', {
                        id: this.elementData.id,
                        h: this.h,
                        w: this.w
                    });
                }

            },
            mouseMove(e) {

                if (this.isDragging) {
                    this.y = this.$refs.backgroundElement.offsetTop - (this.offsetY - e.clientY);
                    this.x = this.$refs.backgroundElement.offsetLeft - (this.offsetX - e.clientX);
                }

                if (this.isResizing) {
                    this.w += e.clientX - this.offsetX;
                    this.h += e.clientY - this.offsetY;
                }

                this.offsetY = e.clientY;
                this.offsetX = e.clientX;

            }
        },
        mounted() {
            this.x = this.elementData.x;
            this.y = this.elementData.y;
            this.w = this.elementData.w;
            this.h = this.elementData.h;
        }
    }
</script>