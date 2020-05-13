import React from "react";
import {Route,Router,Redirect} from "react-router";
import {createBrowserHistory} from "history";
import AllForms from "./Form/AllForms";
import NavBar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import {Provider} from "react-redux";
import {store} from "../Store/Store";
import Snack from "./Snack/Snack";

const history = createBrowserHistory();

function Routes() {
    return(
        <Provider store={store}>
            <Snack/>
            <Router history={history}>
                <Route path = '/' render={() => (
                    localStorage.getItem('refreshToken') ? (
                        <Redirect to={window.location.pathname !== '/' ? window.location.pathname : '/main/polls'}/>
                    ) : (
                        <Redirect to="/"/>
                    )
                )}/>
                <Route exact path = '/'>
                    <AllForms/>
                </Route>
                <Route path = '/main'>
                    <NavBar/>
                    <Route exact path = '/main/profile' component={() => <Profile url = '/profile'/>}/>
                </Route>
            </Router>
        </Provider>
    )
}

export default Routes