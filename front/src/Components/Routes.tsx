import React from "react";
import {Route,Router,Redirect} from "react-router";
import {createBrowserHistory} from "history";
import {AllForms} from "./Form/indexForm";
import {NavBar} from "./Navbar/indexNavbar";
import {Profile} from "./Profile/indexProfile";
import {Snack} from "./Snack/indexSnack";
import {Main} from "./Main/indexMain";
import {Polls} from "./Main/Poll/indexPoll";

const history = createBrowserHistory();

const Routes = ()=> {
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
                    <Route exact path = '/main/polls' component = {()=> <Main/>}/>
                    <Route exact path = '/main/my' component={() => <Main url = '/my'/>}/>
                    <Route exact path = '/main/profile' component={() => <Profile url = '/profile'/>}/>
                    <Route path = '/main/polls/:id' component = {()=><Polls/>}/>
                    <Route path = '/main/my/:id' component = {()=><Polls/>}/>
                </Route>
            </Router>
        </div>
    )
};

export default Routes