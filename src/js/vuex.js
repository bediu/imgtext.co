import Vue from 'vue'
import Vuex from 'vuex'
import {
  calculateFitSize
} from './methods/helpers';
import {
  canvasDraw,
  canvasDrawRealSize,
  canvasFlip
} from './methods/canvas';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarState: false,

    editorElement: null,
    canvasElement: null,
    canvasContext: null,

    //mesage state
    message: {
      show: false,
      type: false, //error success warning info
      text: null
    },

    //file dragged over browser
    newFileDrag: false,

    //main image object
    imageFile: {

      state: false,
      name: null,
      length: null, //bytes
      draggable: false,
      fit: true,

      flipX: 0,
      flipY: 0,

      realSize: {
        h: null,
        w: null
      },
      fitSize: {
        h: null,
        w: null
      },
      size: { //in editor
        h: null,
        w: null
      },

      zoom: { //zoom size
        state: false,
        value: null
      },

      type: null,
      raw: null,
      base64: null
    },

    fontsLoaded: false,
    text: [],
    background: []

  },
  mutations: {

    sidebarInit(state) {
      state.sidebarState = !state.sidebarState;
    },

    setEditorElement(state, editorElement) {
      state.editorElement = editorElement;
    },
    setCanvasElement(state, canvasElement) {
      state.canvasElement = canvasElement;
    },
    setCanvasContext(state, canvasContext) {
      state.canvasContext = canvasContext;
    },

    setNewFileDrag(state, drag) {
      state.newFileDrag = drag;
    },

    //editor settings
    setZoom(state, zoom) {

      state.imageFile.zoom.state = true;
      state.imageFile.zoom.value = parseInt(zoom.value);
      state.imageFile.size.h = zoom.h;
      state.imageFile.size.w = zoom.w;
      state.imageFile.draggable = zoom.shouldDrag;

      canvasDraw(state.canvasElement,
        state.canvasContext,
        state.imageFile.raw,
        zoom.h,
        zoom.w);

    },
    setImgFitToEditor(state) {

      state.imageFile.size = calculateFitSize(state.editorElement.offsetHeight - 150,
        state.editorElement.offsetWidth - 150,
        state.imageFile.realSize.h,
        state.imageFile.realSize.w);

      canvasDraw(state.canvasElement,
        state.canvasContext,
        state.imageFile.raw,
        state.imageFile.fitSize.h,
        state.imageFile.fitSize.w);

      state.imageFile.size = {
        h: state.imageFile.fitSize.h,
        w: state.imageFile.fitSize.w
      }

      state.imageFile.draggable = false;
      state.imageFile.fit = true;
      state.imageFile.zoom.state = false;
      state.imageFile.zoom.value = 5;

    },
    setImgRealSize(state) {

      canvasDrawRealSize(state.canvasElement,
        state.canvasContext,
        state.imageFile.raw,
        state.editorElement.offsetHeight,
        state.editorElement.offsetWidth,
        state.imageFile.realSize.h,
        state.imageFile.realSize.w);

      state.imageFile.size = {
        h: state.imageFile.realSize.h,
        w: state.imageFile.realSize.w
      }

      //determine if new size should be draggable
      if (state.imageFile.realSize.h > state.editorElement.offsetHeight || state.imageFile.realSize.w > state.editorElement.offsetHeight) {
        state.imageFile.draggable = true;
      }

      state.imageFile.fit = false;
      state.imageFile.zoom.state = false;
      state.imageFile.zoom.value = 5;

    },
    setFlip(state, side) {

      var flip = canvasFlip(state.canvasElement,
        side,
        state.imageFile.flipX,
        state.imageFile.flipY);

      state.imageFile.flipX = flip.x;
      state.imageFile.flipY = flip.y;

    }

  },
  actions: {
    //error/info.. toaster
    showMessage(state, message) {
      this.state.message.type = message.type;
      this.state.message.text = message.text;
      this.state.message.show = message.show;

      if (message.show) {
        setTimeout(() => {
          //TODO manage timeout if multiple
          //messages show in 10 seconds
          if (this.state.message.show) {
            this.state.message.type = null;
            this.state.message.text = null;
            this.state.message.show = false;
          }
        }, 10000);
      }
    },

    //main image init
    initImage(state, image) {

      this.state.imageFile = image;
      canvasDraw(
        this.state.canvasElement,
        this.state.canvasContext,
        this.state.imageFile.raw,
        this.state.imageFile.fitSize.h,
        this.state.imageFile.fitSize.w);

    },

    loadFonts(state) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = '/css/font-faces.css';
      document.getElementsByTagName('head')[0].appendChild(link);
      
      this.state.fontsLoaded = true;
    
    }

  }
})