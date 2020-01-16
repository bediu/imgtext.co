<template>

  <div class="sidebar" :class="{'sidebar-dis' : !this.$store.getters['image/loaded']}">

    <div class="side-item" @click="addText">
      <svg class="side-ico" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
        id="mdi-format-text" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
      </svg>
      <span class="side-text">Add Text</span>
    </div>
    <hr>
    <div class="side-item">
      <svg class="side-ico" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
        id="mdi-crop-square" width="24" height="24" viewBox="0 0 24 24">
        <path d="M18,18H6V6H18M18,4H6A2,2 0 0,0 4,6V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18V6C20,4.89 19.1,4 18,4Z" />
      </svg>
      <span class="side-text">Add Background</span>
    </div>

    <div class="card">
      <hr>
      <div class="card-content">
        <div class="card-text">
          <p class="overline">sponsor</p>
          <p class="title">articled.io</p>
        </div>
        <img class="card-img" src="https://articled.io/favicon.ico" alt="">
      </div>
      <p class="desc desc-m">Web Push Notifications for Bloggers!</p>
      <a class="link" href="https://articled.io" target="_blank" rel="dofollow noopener">Click Here</a>
    </div>

  </div>

</template>

<script>
  import { new_uuid } from '../js/methods/helpers';

  export default {
    name: 'Sidebar',
    methods: {
      addText() {
        this.$store.commit('elements/newElement', {
          type: 'text',
          x: 50,
          y: 50,
          text: 'SAMPLE TEXT',
          fontIndex: 0,
          fontSize: 35,
          color: [255,255,255],
          lineHeight: 35,
          direction: 'ltr',
          id: new_uuid()
        });
      }
    }
  }
</script>