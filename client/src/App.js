import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ChatPage from "./components/ChatPage";

import QueryComponent from "./components/QueryComponent";

class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <Route path="/" component={Navigation} />
                    <Switch>
                        <div style={{ marginTop: "10vh" }}>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route
                                exact
                                path="/register"
                                component={Register}
                            />
                            <Route exact path="/q" component={QueryComponent} />
                            <Route exact path="/chat" component={ChatPage} />
                        </div>
                    </Switch>
                </Fragment>
            </Router>
        );
    }
}

export default App;
