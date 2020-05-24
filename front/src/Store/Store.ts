import {createStore,combineReducers} from 'redux'
import {setAdmin, setPoll, setShow, snackReducer} from "./Reducers";

export const store = createStore(
    combineReducers({
        snackReducer,setAdmin,setPoll,setShow
    })
);

// store.subscribe(()=>{
//      console.log(store.getState())
//  });