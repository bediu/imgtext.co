export const messageModule = {
    
    namespaced: true,
    state: {
    
        show: null,
        type: null,
        text: null
       
    },
    getters: {
        show(state) {
            return state.show;
        },
        type(state) {
            return state.type;
        },
        text(state) {
            return state.text;
        }
    },
    actions: {

        show({state}, msgObj) {
            
            state.show = true;
            state.text = msgObj.text;
            state.type = msgObj.type;
            
            if (msgObj.show) {
                setTimeout(() => {
                    state.show = false;
                    state.text = null;
                    state.type = null;                
                }, 10000);
            }

        },
        
        hide({state}) {
            state.show = false;
            state.text = false;
            state.type = false;
        }

    }
}