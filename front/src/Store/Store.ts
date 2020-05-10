import {createStore} from 'redux'
import {snackReducer} from "./Reducers";

export const store = createStore(snackReducer);

// store.subscribe(()=>{
//      console.log(store.getState())
//  });