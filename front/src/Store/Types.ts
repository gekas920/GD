export interface AppState {
    showSnack:boolean
}


const SHOW_SNACK = 'SHOW_SNACK';
const HIDE_SNACK = 'HIDE_SNACK';

interface ShowSnack {
    type: typeof SHOW_SNACK
}
interface HideSnack {
    type: typeof HIDE_SNACK
}

export type Action = ShowSnack | HideSnack