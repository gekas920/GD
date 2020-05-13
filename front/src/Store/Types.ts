export interface AppState {
    showSnack:boolean,
    admin:boolean
}


const SHOW_SNACK = 'SHOW_SNACK';
const HIDE_SNACK = 'HIDE_SNACK';
const SET_ADMIN = 'SET_ADMIN';
interface ShowSnack {
    type: typeof SHOW_SNACK
}
interface HideSnack {
    type: typeof HIDE_SNACK
}
interface SetAdmin {
    type: typeof SET_ADMIN
}

export type Action = ShowSnack | HideSnack | SetAdmin