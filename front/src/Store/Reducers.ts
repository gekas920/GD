import {Action, AppState} from "./Types";

export const appState:AppState = {
    showSnack:false
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