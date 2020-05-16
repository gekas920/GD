export interface AppState {
    showSnack:boolean,
    admin:boolean,
    clicked:number
}


const SHOW_SNACK = 'SHOW_SNACK';
const HIDE_SNACK = 'HIDE_SNACK';
const SET_ADMIN = 'SET_ADMIN';
const SET_POLL = 'SET_POLL';
interface ShowSnack {
    type: typeof SHOW_SNACK
}
interface HideSnack {
    type: typeof HIDE_SNACK
}
interface SetAdmin {
    type: typeof SET_ADMIN
}
interface SetPoll {
    type: typeof SET_POLL
    payload:number
}
export type Action = ShowSnack | HideSnack | SetAdmin | SetPoll