import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import {setAdmin, setEx, setId, setPoll, setShow, setUsers, snackReducer} from "./Reducers";

export const store = createStore(
    combineReducers({
        snackReducer,setAdmin,setPoll,setShow,setId,setEx,setUsers
    }),applyMiddleware(thunk)
);

// store.subscribe(()=>{
//      console.log(store.getState())
//  });