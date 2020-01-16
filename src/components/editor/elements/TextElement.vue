<template>
    <span class="text-element"
    v-html="elementData.text"
    ref="textElement"
    :class="{'element-active' : elementData.id === this.$store.getters['elements/activeElementId']}" 
    :style="{
        top: elementData.y,
        left: elementData.x,
        direction: elementData.direction,
        lineHeight: elementData.lineHeight + 'px',
        fontSize: elementData.fontSize + 'px',
        fontFamily: this.$store.getters.fonts[elementData.fontIndex].family,
        color: 'rgb(' + elementData.color + ')'
    }"

    @mousedown="mouseDown"
    @mouseup="mouseUp"
    @mousemove="mouseMove"

    ></span>

</template>
<script>
    export default {
        name: 'TextElement',
        props: ['elementData'],
        data() {
            return {
                isDragging: false,
                offsetX: 0,
                offsetY: 0
            }
        },
        methods: {
            mouseDown(e) {
                this.offsetX = e.clientX;
                this.offsetY = e.clientY;
                this.isDragging = true;
            },
            mouseUp() {
                this.isDragging = false;
            },
            mouseMove(e) {
                
                if (this.isDragging) {
                    
                    var newY = this.$refs.textElement.offsetTop - (this.offsetY - e.clientY);
                    var newX = this.$refs.textElement.offsetLeft - (this.offsetX - e.clientX);

                    this.$refs.textElement.style.top = newY + 'px';
                    this.$refs.textElement.style.left = newX + 'px';

                    this.offsetY = e.clientY;
                    this.offsetX = e.clientX;

                    this.$store.commit('elements/setElementPositionA', {
                        id: this.elementData.id,
                        x: newX,
                        y: newY
                    });

                }
                
            }
        }
    }
</script>