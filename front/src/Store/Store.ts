import {createStore,combineReducers} from 'redux'
import {setAdmin, setPoll, snackReducer} from "./Reducers";

export const store = createStore(
    combineReducers({
        snackReducer,setAdmin,setPoll
    })
);

// store.subscribe(()=>{
//      console.log(store.getState())
//  });