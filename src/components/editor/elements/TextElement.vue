<template>

    <pre class="text-element" ref="textElement"
        :class="{'element-active' : this.elementData.id === this.$store.getters['elements/activeElementId']}" :style="{
            top: elementData.y,
            left: elementData.x,
            direction: elementData.direction,
            lineHeight: elementData.lineHeight + 'px',
            fontSize: elementData.fontSize + 'px',
            fontFamily: this.$store.getters.fonts[elementData.fontIndex].family,
            color: 'rgb(' + elementData.color + ')',
            zIndex: elementData.id === this.$store.getters['elements/activeElementId'] ? 8 : 7
        }" @mousedown.prevent="mouseDown" @mouseup.prevent="mouseUp" @mousemove.prevent="mouseMove"
        @mouseleave.prevent="mouseUp">{{elementData.text}}</pre>

</template>
<script>
    export default {
        name: 'TextElement',
        props: ['elementData'],
        data() {
            return {
                isDragging: false,
                offsetX: 0,
                offsetY: 0,
                newX: 0,
                newY: 0
            }
        },
        methods: {
            mouseDown(e) {

                if (this.$store.getters['elements/activeElementId'] !== this.elementData.id) {
                    this.$store.commit('elements/setActiveElement', this.elementData.id);
                }

                this.offsetX = e.clientX;
                this.offsetY = e.clientY;
                this.isDragging = true;

            },
            mouseUp() {

                if (this.isDragging) {
                    this.isDragging = false;

                    this.$store.commit('elements/setElementPositionA', {
                        id: this.elementData.id,
                        x: this.newX,
                        y: this.newY
                    });
                }

            },
            mouseMove(e) {

                if (this.isDragging) {

                    this.newY = this.$refs.textElement.offsetTop - (this.offsetY - e.clientY);
                    this.newX = this.$refs.textElement.offsetLeft - (this.offsetX - e.clientX);

                    this.$refs.textElement.style.top = this.newY + 'px';
                    this.$refs.textElement.style.left = this.newX + 'px';

                    this.offsetY = e.clientY;
                    this.offsetX = e.clientX;

                }

            }
        }
    }
</script>