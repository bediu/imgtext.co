import { canvasDraw, canvasClear, canvasFlip } from './../methods/canvas';

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
        name(state) {
            return state.name;
        },
        type(state) {
            return state.type;
        },
        base64(state) {
            return state.base64;
        },
        raw(state) {
            return state.raw;
        },
        size(state) {
            return state.size;
        },
        realSize(state) {
            return state.realSize;
        },
        height(state) {
            return state.size.h;
        },
        width(state) {
            return state.size.w;
        },
        realWidth(state) {

        },
        realHeight(state) {

        },
        palette(state) {
            return state.colors.palette;
        },
        dominantColor(state) {
            return state.colors.dominant;
        },
        editor(state) {
            return state.editor;
        },

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
        delete(state) {
            state.loaded = false;
            state.name = null;
            state.length = null;
            state.type = null;
            state.base64 = null;
            state.flipX = null;
            state.flipY = null;
            state.size = {
                h: null,
                w: null
            };
            state.realSize = {
                h: null,
                w: null
            },
            state.colors =  {
                dominant: null,
                palette: null
            }
            canvasClear(state.canvas);
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
        },

    },
    actions: {

    }
}