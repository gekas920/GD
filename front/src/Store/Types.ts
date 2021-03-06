interface User {
    id:string,
    name:string,
    deleted:boolean
}

export interface AppState {
    showSnack:boolean,
    admin:boolean,
    clicked:number,
    show:boolean,
    ids:number[],
    existError:boolean,
    usersList:User[]
}


const SHOW_SNACK = 'SHOW_SNACK';
const HIDE_SNACK = 'HIDE_SNACK';
const SET_ADMIN = 'SET_ADMIN';
const SET_POLL = 'SET_POLL';
const SET_SHOW = 'SET_CLICK';
const SET_ID = 'SET_ID';
const SET_EX = 'SET_EX';
const HIDE_EX= 'HIDE_EX';
const ADD_USERS = 'ADD_USERS';
const DELETE_USER = 'DELETE_USER';
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
interface SetShow {
    type: typeof SET_SHOW
    payload:number
}

interface SetId {
    type:typeof SET_ID
    payload:number[]
}

interface SetEx {
    type:typeof SET_EX
}

interface HideEx {
    type:typeof HIDE_EX
}

interface AddUsers {
    type: typeof ADD_USERS,
    payload:[]
}

interface DeleteUser {
    type: typeof DELETE_USER,
    payload:string|number
}

export type Action = ShowSnack | HideSnack | SetAdmin | SetPoll | SetShow | SetId | SetEx | HideEx | AddUsers | DeleteUser