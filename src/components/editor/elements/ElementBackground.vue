<template>
    <div class="background-element" ref="backgroundElement"
        :class="{'element-active' : this.elementData.id === this.$store.getters['elements/activeElementId']}" :style="{
            top: this.y + 'px',
            left: this.x + 'px',
            width: this.w + 'px',
            height: this.h + 'px',
            backgroundColor: this.elementData.color,
            zIndex: elementData.id === this.$store.getters['elements/activeElementId'] ? 6 : 5
        }" @mousedown.stop="mouseDown" @mouseup.stop="mouseUp" @mousemove.stop="mouseMove" @mouseleave.stop="mouseUp"
        @touchstart.prevent="mouseDown" @touchmove.prevent="mouseMove" @touchend.prevent="mouseUp">

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

                var _clientY, _clientX, _offsetX, _offsetY;

                if (!e.clientX) {
                    var rect = e.target.getBoundingClientRect();
                    _clientX = e.touches[0].clientX;
                    _clientY = e.touches[0].clientY;
                    _offsetX = this._offset(e)[0];
                    _offsetY = this._offset(e)[1];
                } else {
                    _clientX = e.clientX;
                    _clientY = e.clientY;
                    _offsetX = e.offsetX;
                    _offsetY = e.offsetY;
                }


                if (_offsetX > 19 && _offsetY > 19) {
                    this.isDragging = true;
                } else {
                    this.isResizing = true;
                }

                this.offsetX = _clientX;
                this.offsetY = _clientY;

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

                var _clientY, _clientX;

                if (!e.clientX) {
                    _clientX = e.touches[0].clientX;
                    _clientY = e.touches[0].clientY;
                } else {
                    _clientX = e.clientX;
                    _clientY = e.clientY;
                }

                if (this.isDragging) {
                    this.y = this.$refs.backgroundElement.offsetTop - (this.offsetY - _clientY);
                    this.x = this.$refs.backgroundElement.offsetLeft - (this.offsetX - _clientX);
                }

                if (this.isResizing) {
                    this.w += _clientX - this.offsetX;
                    this.h += _clientY - this.offsetY;
                }

                this.offsetY = _clientY;
                this.offsetX = _clientX;

            },
            _offset(e) {
                var rect = e.target.getBoundingClientRect();
                var bodyRect = document.body.getBoundingClientRect();
                var x = e.touches[0].pageX - (rect.left - bodyRect.left);
                var y = e.touches[0].pageY - (rect.top - bodyRect.top);
                return [x, y];
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