import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard, SignUp, SignIn } from "./../../../containers/pages";

function RootRouter () {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Dashboard/>
                </Route>
                <Route path="/SignIn">
                    <SignIn/>
                </Route>
                <Route path="/SignUp">
                    <SignUp/>
                </Route>
            </Switch>
        </Router>
    )
} 

export default RootRouter;