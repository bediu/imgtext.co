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
        }

    }
}