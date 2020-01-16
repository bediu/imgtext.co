<template>

  <div class="editor-drop" :class="{'editor-drag' : this.$store.getters.filedrag}" @drop.prevent="fileDrop"
    @dragover.prevent="fileDrag" @dragleave.prevent="fileLeave" v-if="!this.$store.getters['image/loaded']">
    <div class="drop-content">

      <div class="d-info">

        <div class="d-text">
          <p class="title">Upload an Image</p>
          <p class="desc">Drag an image file here or click Browse</p>
          <p class="overline d-over">JPG, JPEG, PNG, WEBP</p>
        </div>
        <svg class="d-svg-placeholder" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1" id="mdi-image-outline" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" />
        </svg>
      </div>


      <hr>
      <button class="btn" @click="browseClick">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
          id="mdi-folder-search-outline" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M16.5,12C19,12 21,14 21,16.5C21,17.38 20.75,18.21 20.31,18.9L23.39,22L22,23.39L18.88,20.32C18.19,20.75 17.37,21 16.5,21C14,21 12,19 12,16.5C12,14 14,12 16.5,12M16.5,14A2.5,2.5 0 0,0 14,16.5A2.5,2.5 0 0,0 16.5,19A2.5,2.5 0 0,0 19,16.5A2.5,2.5 0 0,0 16.5,14M19,8H3V18H10.17C10.34,18.72 10.63,19.39 11,20H3C1.89,20 1,19.1 1,18V6C1,4.89 1.89,4 3,4H9L11,6H19A2,2 0 0,1 21,8V11.81C20.42,11.26 19.75,10.81 19,10.5V8Z" />
        </svg>
        Browse
      </button>
      <input type="file" class="hide" ref="browseFile" @change="browseNewFile">
    </div>
  </div>


</template>

<script>
  import {
    calculateFitSize
  } from '../../js/methods/helpers';
  import ColorThief from '../../js/colorthief'

  export default {
    name: 'Uploader',
    methods: {

      //browse manually
      browseClick() {
        this.$refs.browseFile.click();
      },
      browseNewFile() {

        var browsedFiles = this.$refs.browseFile.files;

        //stop process if no files selected
        if (browsedFiles.length === 0) {
          return;
        }

        var fType = browsedFiles[0].type;
        var fSize = browsedFiles[0].size;

        //verify image
        if (!this.isImage(fType)) {
          this.$store.dispatch('message/show', {
            type: 'error',
            text: 'Not an image file! Supported file types are: JPG, BMP, PNG, WEBP',
            show: true
          });
          return;
        }

        //warn if image >5mb
        if (this.isLargerThan5MB(fSize)) {
          this.$store.dispatch('message/show', {
            type: 'warning',
            text: 'Image is bigger than 5MB, the app might perform slower than intended',
            show: true
          });
        }

        //promise read base64
        this.readBASE64(browsedFiles[0])
          .then(base64 => {

            //promise read image height & width
            this.readImage(base64)
              .then(image => {

                //load image in browser
                this.loadImage({
                  name: browsedFiles[0].name,
                  length: browsedFiles[0].size,
                  size: image.size,
                  type: browsedFiles[0].type,
                  base64: base64,
                  raw: image.raw
                })

              });

          });

      },

      //drag and drop
      fileDrag() {
        if (!this.$store.getters.filedrag) {
          this.$store.commit('filedrag', true);
        }
      },
      fileLeave() {
        if (this.$store.getters.filedrag) {
          this.$store.commit('filedrag', false);
        }
      },
      fileDrop(e) {
        if (this.$store.getters.filedrag) {
          this.$store.commit('filedrag', false);
          var droppedFiles = e.dataTransfer.files;

          //failed to read dropped file
          if (droppedFiles.length === 0) {
            this.$store.dispatch('message/show', {
              type: 'warning',
              text: 'Could not read dragged file, try using the "Browse" button',
              show: true
            })
            return;
          }

          //prevent dropping >1 images at once
          if (droppedFiles.length > 1) {
            this.$store.dispatch('message/show', {
              type: 'error',
              text: 'Error: You tried to upload two images at once!',
              show: true
            })
            return;
          }

          var fType = droppedFiles[0].type;
          var fSize = droppedFiles[0].size;

          //verify image
          if (!this.isImage(fType)) {
            this.$store.dispatch('message/show', {
              type: 'error',
              text: 'Not an image file! Supported file types are: JPG, BMP, PNG, WEBP',
              show: true
            });
            return;
          }

          //warn if >5mb
          if (this.isLargerThan5MB(fSize)) {
            this.$store.dispatch('message/show', {
              type: 'warning',
              text: 'Image is bigger than 5MB, the app might perform slower than intended',
              show: true
            });
          }

          //promise read base64
          this.readBASE64(droppedFiles[0])
            .then(base64 => {

              //promise read image height & width & raw Image obj
              this.readImage(base64)
                .then(image => {

                  //load image in browser
                  this.loadImage({
                    name: droppedFiles[0].name,
                    length: droppedFiles[0].size,
                    size: image.size,
                    type: droppedFiles[0].type,
                    base64: base64,
                    raw: image.raw
                  })

                });

            });

        }
      },

      //file upload & load image to browser
      isImage(fType) {
        if (fType.indexOf('/png') === -1 &&
          fType.indexOf('/jpg') === -1 &&
          fType.indexOf('/jpeg') === -1 &&
          fType.indexOf('/bmp') === -1 &&
          fType.indexOf('/webp') === -1) {
          return false;
        } else {
          return true;
        }
      },
      isLargerThan5MB(fSize) {
        if (fSize / 1024 > 5000) {
          return true;
        }
        return false;
      },
      readBASE64(f) {
        return new Promise((resolve, reject) => {
          var fReader = new FileReader();
          fReader.readAsDataURL(f);
          fReader.onload = _f => {
            resolve(_f.target.result);
          }
        });
      },
      readImage(base64) {
        return new Promise((resolve, reject) => {
          var i = new Image();
          i.src = base64;

          i.onload = () => {
            resolve({
              size: {
                h: i.naturalHeight,
                w: i.naturalWidth
              },
              raw: i
            });
          }

        });
      },
      loadImage(image) {

        //get editor size
        var editorHeight = this.$store.getters['image/editor'].scrollHeight - 80;
        var editorWidth = this.$store.getters['image/editor'].scrollWidth - 80; //80px padding

        //calculate preview size
        var size = calculateFitSize(editorHeight, editorWidth, image.size.h, image.size.w);

        const colorThief = new ColorThief();

        this.$store.commit('image/initialize', {
          name: image.name,
          length: image.length,
          type: image.type,
          raw: image.raw,
          base64: image.base64,
          size: size,
          realSize: image.size,
          colors: {
            dominant: colorThief.getColor(image.raw),
            palette: colorThief.getPalette(image.raw, 5, 10)
          }
        });

      }

    }
  }
</script>