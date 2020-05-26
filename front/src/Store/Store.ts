import {createStore,combineReducers} from 'redux'
import {setAdmin, setId, setPoll, setShow, snackReducer} from "./Reducers";

export const store = createStore(
    combineReducers({
        snackReducer,setAdmin,setPoll,setShow,setId
    })
);

// store.subscribe(()=>{
//      console.log(store.getState())
//  });