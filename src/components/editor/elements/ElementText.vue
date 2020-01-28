<template>

    <pre class="text-element" ref="textElement"
        :class="{'element-active' : this.elementData.id === this.$store.getters['elements/activeElementId']}" :style="{
            top: this.y + 'px',
            left: this.x + 'px',
            direction: elementData.direction,
            lineHeight: elementData.lineHeight + 'px',
            fontSize: elementData.fontSize + 'px',
            fontFamily: this.$store.getters.fonts[elementData.fontIndex].family,
            color: elementData.color,
            zIndex: elementData.id === this.$store.getters['elements/activeElementId'] ? 8 : 7
        }" @mousedown.prevent="mouseDown" @mouseup.prevent="mouseUp" @mousemove.prevent="mouseMove"
        @mouseleave.prevent="mouseUp" 
        @touchstart.prevent="mouseDown"
        @touchmove.prevent="mouseMove"
        @touchend.prevent="mouseUp"
        >{{elementData.text}}</pre>

</template>
<script>
    export default {
        name: 'ElementText',
        props: ['elementData'],
        data() {
            return {
                isDragging: false,
                offsetX: 0,
                offsetY: 0,
                x: 0,
                y: 0
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
                        x: this.x,
                        y: this.y
                    });
                }

            },
            mouseMove(e) {

                if (this.isDragging) {

                    var _clientY, _clientX;

                    if (!e.clientX) {
                        _clientX = e.touches[0].clientX;
                        _clientY = e.touches[0].clientY;
                    } else {
                        _clientX = e.clientX;
                        _clientY = e.clientY;
                    }

                    this.y = this.$refs.textElement.offsetTop - (this.offsetY - _clientY);
                    this.x = this.$refs.textElement.offsetLeft - (this.offsetX - _clientX);

                    this.offsetY = _clientY;
                    this.offsetX = _clientX;

                }

            }
        },
        mounted() {
            this.y = this.elementData.y;
            this.x = this.elementData.x;
        }
    }
</script>