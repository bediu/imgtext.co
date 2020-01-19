import { canvasDraw, canvasFlip } from './../methods/canvas';
import { elementsModule } from './elements';

export const imageModule = {
    
    namespaced: true,
    
    state: {

        editor: null,           //element
        canvas: null,           //
        canvasContext: null,

        loaded: false,
        
        name: null,     // filename
        length: null,   // in bytes
        type: null,     // png/jpg/etc
        raw: null,      // Image()
        base64: null,

        flipX: null,    //degrees
        flipY: null,    //
        
        size: {         //in editor
            h: null,    //
            w: null     //
        },              //
        realSize: {
            h: null,
            w: null
        },

        colors: {               //from colorthief
            dominant: null,     //
            palette: null       //
        }                       //

    },
    getters: {
        loaded(state) {
            return state.loaded;
        },
        height(state) {
            return state.size.h;
        },
        width(state) {
            return state.size.w;
        },
        editor(state) {
            return state.editor;
        },
        palette(state) {
            return state.colors.palette;
        },
        dominantColor(state) {
            return state.colors.dominant;
        }

    },
    mutations: {

        initialize(state, image) {
            
            state.loaded = true;
            
            state.name = image.name;
            state.length = image.length;
            state.type = image.type;
            state.raw = image.raw;
            state.base64 = image.base64;
            
            state.flipX = 0;
            state.flipY = 0;

            state.size = image.size;
            state.realSize = image.realSize;
            state.colors = image.colors;

            canvasDraw(
                state.canvas,
                state.canvasContext,
                image.raw,
                image.size.h,
                image.size.w);

        },

        flip(state, side) {
            
            var flip = canvasFlip(
                state.canvas,
                side,
                state.flipX,
                state.flipY);
            
            state.flipX = flip.x;
            state.flipY = flip.y;

        },

        editor(state, element) {
            state.editor = element;
        },

        canvas(state, element) {
            state.canvas = element;
        },
        canvasContext(state, context) {
            state.canvasContext = context;
        }

    },
    actions: {

    }
}