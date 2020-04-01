import React from "react";
import {Route,Router,Redirect} from "react-router";
import {createBrowserHistory} from "history";
import AllForms from "./Form/AllForms";
import MainDrive from "./Drive/MainDrive";

const history = createBrowserHistory();

function Routes() {
    return(
        <Router history={history}>
            <Route path = '/' render={() => (
                !!localStorage.getItem('refreshToken') ? (
                    <Redirect to="/main"/>
                    ) : (
                        <Redirect to="/"/>
                        )
            )}/>
            <Route exact path = '/'>
                <AllForms/>
            </Route>
            <Route exact path = '/main'>
                <MainDrive/>
            </Route>
        </Router>
    )
}

export default Routes