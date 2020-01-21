//active element = element being edited
export const elementsModule = {
    namespaced: true,
    state: {
        activeId: false,
        list: []
    },
    getters: {
        activeElement(state) {
            return state.list.find(element => element.id === state.activeId) || null;
        },
        activeElementId(state) {
            return state.activeId
        },
        textElements(state) {
            return state.list.filter(element => element.type === 'text');
        },
        backgroundElements(state) {
            return state.list.filter(element => element.type === 'background');
        }
    },
    mutations: {
        
        newElement(state, element) {
            state.list.push(element);
            state.activeId = element.id;
        },

        setActiveElement(state, id) {
            state.activeId = id;
        },

        //set active element data
        setElementTextA(state, text) {
            state.list.find(element => element.id === state.activeId).text = text;
        },
        setElementFontIndexA(state, fontIndex) {
            state.list.find(element => element.id === state.activeId).fontIndex = fontIndex;
        },
        setElementFontSizeA(state, fontSize) {
            state.list.find(element => element.id === state.activeId).fontSize = fontSize;
        },
        setElementLineHeightA(state, lineHeight) {
            state.list.find(element => element.id === state.activeId).lineHeight = lineHeight;
        },
        setElementPositionA(state, data) {
            state.list.find(() => data.id === state.activeId).x = data.x;
            state.list.find(() => data.id === state.activeId).y = data.y;
        },
        setElementColorA(state, color) {
            state.list.find(element => element.id === state.activeId).color = color;
        },
        setElementSizeA(state, data) {
            state.list.find(() => data.id === state.activeId).h = data.w;
            state.list.find(() => data.id === state.activeId).w = data.h;
        },

        deleteElement(state, id) {
            for (var i = 0; i < state.list.length; i++) {
                if (state.list[i].id === id) {
                    state.activeId = false;
                    state.list.splice(i, 1);
                    break;
                }
            }
        },
        deleteActiveElement(state) {
            for (var i = 0; i < state.list.length; i++) {
                if (state.list[i].id === state.activeId) {
                    state.activeId = false;
                    state.list.splice(i, 1);
                    break;
                }
            }
        }

    }
}