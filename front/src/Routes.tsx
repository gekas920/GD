import React from "react";
import {Switch,Route,Router} from "react-router";
import {createBrowserHistory} from "history";
import AllForms from "./Components/Form/AllForms";

const history = createBrowserHistory();

function Routes() {
    return(
        <Router history={history}>
            <Switch>
                <Route exact path = '/'>
                    <AllForms/>
                </Route>
                <Route exact path = '/main'>

                </Route>
                <Route>

                </Route>
            </Switch>
        </Router>
    )
}

export default Routes