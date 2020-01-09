import Vue from 'vue'
import Vuex from 'vuex'
import {
  calculatePreviewSize
} from './methods/previewSize';
import {
  canvasDrawFit,
  canvasDrawReal
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
      size: { //real size
        h: null,
        w: null
      },
      preview: {
        size: { //size in editor
          h: null,
          w: null
        },
        zoom: null
      },
      type: null,
      raw: null,
      base64: null
    }

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
    setImgFitToEditor(state) {
      
      state.imageFile.preview.size = calculatePreviewSize(state.editorElement.offsetHeight - 150, 
                           state.editorElement.offsetWidth - 150,
                           state.imageFile.size.h, 
                           state.imageFile.size.w);
      
      canvasDrawFit(state.canvasElement, state.imageFile.raw, state.imageFile.preview.size.h, state.imageFile.preview.size.w);
      state.imageFile.draggable = false;

    },
    setImgRealSize(state) {

      canvasDrawReal(state.canvasElement, 
        state.imageFile.raw, 
        state.editorElement.offsetHeight, 
        state.editorElement.offsetWidth,
        state.imageFile.size.h, 
        state.imageFile.size.w);

      if (state.imageFile.size.h > state.editorElement.offsetHeight || state.imageFile.size.w > state.editorElement.offsetHeight) {
        state.imageFile.draggable = true;
      }
      
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
      canvasDrawFit(this.state.canvasElement, this.state.imageFile.raw, this.state.imageFile.preview.size.h, this.state.imageFile.preview.size.w);
      
    }
    
  }
})