<template>
    <div class="range-group" :class="{'range-group-dis' : !this.$store.state.imageFile.state}">
        <!-- zoom minus -->
        <svg @click="zoomMinus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1" id="mdi-minus-box-outline" width="24" height="24" viewBox="0 0 24 24">
            <path
                d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M17,11V13H7V11H17Z" />
        </svg>

        <!-- range -->
        <input class="range" :disabled="!this.$store.state.imageFile.state"
            :value="this.$store.state.imageFile.zoom.value" @change="zoomHandle" type="range" min="0" max="10">

        <!-- zoom plus -->
        <svg @click="zoomPlus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1" id="mdi-plus-box-outline" width="24" height="24" viewBox="0 0 24 24">
            <path
                d="M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z" />
        </svg>
    </div>
</template>
<script>
    import {
        calculateZoomSize,
        shouldDrag
    } from '../../../js/methods/helpers'
    export default {
        name: 'Zoom',
        methods: {
            zoomPlus() {

                var curPrecent = this.$store.state.imageFile.zoom.value;

                if (this.$store.state.imageFile.zoom.value < 10) {

                    var curH, curW;
                    if (this.$store.state.imageFile.fit) {
                        curH = this.$store.state.imageFile.fitSize.h;
                        curW = this.$store.state.imageFile.fitSize.w;
                    } else {
                        curH = this.$store.state.imageFile.realSize.h;
                        curW = this.$store.state.imageFile.realSize.w;
                    }

                    var newSize = calculateZoomSize(true, curPrecent + 1, curH, curW);

                    this.$store.commit('setZoom', {
                        value: curPrecent + 1,
                        h: newSize.h,
                        w: newSize.w,
                        shouldDrag: shouldDrag(newSize.h,
                            newSize.w,
                            this.$store.state.editorElement.offsetHeight,
                            this.$store.state.editorElement.offsetWidth
                        ),
                    });

                }

            },
            zoomMinus() {

                var curPrecent = this.$store.state.imageFile.zoom.value;

                if (this.$store.state.imageFile.zoom.value > 0) {

                    var curH, curW;
                    if (this.$store.state.imageFile.fit) {
                        curH = this.$store.state.imageFile.fitSize.h;
                        curW = this.$store.state.imageFile.fitSize.w;
                    } else {
                        curH = this.$store.state.imageFile.realSize.h;
                        curW = this.$store.state.imageFile.realSize.w;
                    }

                    var newSize = calculateZoomSize(false, curPrecent - 1, curH, curW);

                    this.$store.commit('setZoom', {
                        value: curPrecent - 1,
                        h: newSize.h,
                        w: newSize.w,
                        shouldDrag: shouldDrag(newSize.h,
                            newSize.w,
                            this.$store.state.editorElement.offsetHeight,
                            this.$store.state.editorElement.offsetWidth
                        ),
                    });

                }

            },
            zoomHandle(e) {

                var handleValue = parseInt(e.target.value);

                var curH, curW;
                if (this.$store.state.imageFile.fit) {
                    curH = this.$store.state.imageFile.fitSize.h;
                    curW = this.$store.state.imageFile.fitSize.w;
                } else {
                    curH = this.$store.state.imageFile.realSize.h;
                    curW = this.$store.state.imageFile.realSize.w;
                }

                var newSize;
                if (handleValue === 5) {
                    newSize = {
                        h: curH,
                        w: curW
                    }
                } else if (handleValue > 5) {
                    newSize = calculateZoomSize(true, handleValue, curH, curW);
                } else {
                    newSize = calculateZoomSize(false, handleValue, curH, curW);
                }

                this.$store.commit('setZoom', {
                    value: handleValue,
                    h: newSize.h,
                    w: newSize.w,
                    shouldDrag: shouldDrag(newSize.h,
                        newSize.w,
                        this.$store.state.editorElement.offsetHeight,
                        this.$store.state.editorElement.offsetWidth
                    ),
                });

            }
        }
    }
</script>