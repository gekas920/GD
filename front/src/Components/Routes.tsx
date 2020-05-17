import React from "react";
import {Route,Router,Redirect} from "react-router";
import {createBrowserHistory} from "history";
import AllForms from "./Form/AllForms";
import NavBar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import Snack from "./Snack/Snack";
import Main from "./Main/Main";
import {connect} from "react-redux";
import {mapStateToProps} from "./indexRoutes";
import Polls from "./Main/Poll/Poll";

const history = createBrowserHistory();

function Routes(props) {
    return(
        <div>
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
                    <Route exact path = '/main/polls' component = {Main}/>
                    <Route exact path = '/main/profile' component={() => <Profile url = '/profile'/>}/>
                    <Route path = '/main/polls/:id' component = {Polls}/>
                </Route>
            </Router>
        </div>
    )
}

export default connect(mapStateToProps)(Routes)