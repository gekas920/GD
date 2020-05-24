import {Action, AppState} from "./Types";

export const appState:AppState = {
    showSnack:false,
    admin:false,
    clicked:0,
    show:false
};

export function snackReducer(state = appState, action:Action) {
    if(action.type === 'SHOW_SNACK'){
        return {
            ...state,
            showSnack:true
        }
    }
    if(action.type === 'HIDE_SNACK'){
        return {
            ...state,
            showSnack: false
        }
    }
    return state
}

export function setAdmin(state = appState, action:Action) {
    if(action.type === 'SET_ADMIN'){
        return {
            ...state,
            admin:true
        }
    }
    return state
}

export function setPoll(state = appState, action:Action) {
    if(action.type === 'SET_POLL'){
        return{
            ...state,
            clicked:action.payload
        }
    }
    return state
}

export function setShow(state=appState,action:Action) {
    if(action.type === 'SET_CLICK'){
        return{
            ...state,
            show:action.payload
        }
    }
    return state

}

