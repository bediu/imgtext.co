import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarState: false,

    //mesage state
    message: {
      show: false,
      type: false, //error success warning info
      text: null
    },

    //file drag
    newFileDrag: false,
    
    //main image object
    imageFile: {
      state: false,
      name: null,
      size: null,
      type: null,
      raw: null,
      base64: null
    }

  },
  mutations: {
    sidebarInit(state) {
      state.sidebarState = !state.sidebarState;
    },
    newFileDragM(state, res) {
      state.newFileDrag = res;
    },
    initImageFile(state, image) {
      this.state.imageFile = image;
    }

  },
  actions: {
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
    }
  },
  modules: {

  }
})
