import React from "react";
import {Route,Router,Redirect} from "react-router";
import {createBrowserHistory} from "history";
import AllForms from "./Form/AllForms";
import NavBar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import {Provider} from "react-redux";
import {store} from "../Store/Store";

const history = createBrowserHistory();

function Routes() {
    return(
        <Provider store={store}>
            <Router history={history}>
                {/*<Route path = '/' render={() => (*/}
                {/*    localStorage.getItem('refreshToken') ? (*/}
                {/*        <Redirect to="/main/polls"/>*/}
                {/*    ) : (*/}
                {/*        <Redirect to="/"/>*/}
                {/*    )*/}
                {/*)}/>*/}
                <Route exact path = '/'>
                    <AllForms/>
                </Route>
                <Route path = '/main'>
                    <NavBar/>
                    <Route exact path = '/main/profile' component = {Profile}/>
                </Route>
            </Router>
        </Provider>
    )
}

export default Routes