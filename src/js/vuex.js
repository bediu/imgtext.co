import Vue from 'vue'
import Vuex from 'vuex'

import {
  imageModule
} from './vuex_modules/image';

import {
  elementsModule
} from './vuex_modules/elements';

import {
  messageModule
} from './vuex_modules/message';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    sidebar: false,
    filedrag: false,

    fontsLoaded: false,
    fonts: [{
        name: 'Roboto',
        family: '\'Roboto\', sans-serif',
      },
      {
        name: 'Cooper Hewitt Heavy',
        family: '\'CooperHewitt-Heavy\'',
      },
      {
        name: 'Archivo Black',
        family: '\'ArchivoBlack\'',
      },
      {
        name: 'Work Sans Extra Bold',
        family: '\'WorkSans-ExtraBold\'',
      },
      {
        name: 'Nimbus Sans L',
        family: '\'nimbus-sans-l_bold\'',
      },
      {
        name: 'Oswald Bold',
        family: '\'Oswald-Bold\'',
      },
      {
        name: 'Poppins Medium',
        family: '\'Poppins-Medium\'',
      },
      {
        name: 'Libre Baskerville',
        family: '\'LibreBaskerville-Regular\'',
      },
      {
        name: 'EB Garanmond Regular',
        family: '\'EBGaramond12-Regular\'',
      },
      {
        name: 'Aileron UltraLight',
        family: '\'Aileron-UltraLight\'',
      },

      {
        name: 'Work Sans Light',
        family: '\'WorkSans-Light\'',
      },

      {
        name: 'Office Code Pro',
        family: '\'OfficeCodePro-Light\''
      }
    ],

  },
  getters: {
    sidebar(state) {
      return state.sidebar;
    },
    filedrag(state) {
      return state.filedrag;
    },
    fontsLoaded(state) {
      return state.fontsLoaded;
    },
    fonts(state) {
      return state.fonts;
    }
  },
  mutations: {

    sidebar(state) {
      state.sidebar = !state.sidebar;
    },
    filedrag(state, drag) {
      state.filedrag = drag;
    }

  },
  actions: {

    loadFonts(state) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = '/css/font-faces.css';
      document.getElementsByTagName('head')[0].appendChild(link);

      this.state.fontsLoaded = true;

    }

  },
  modules: {
    message: messageModule,
    image: imageModule,
    elements: elementsModule
  }
})