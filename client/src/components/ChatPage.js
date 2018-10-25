import React, { Component } from "react";

import { userAuthenticated } from "../utils";

class ChatPage extends Component {
    componentDidMount() {
        if (!userAuthenticated()) {
            this.props.history.push("/login");
        }
    }
    render() {
        return (
            <div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
                <div>Chat page</div>
            </div>
        );
    }
}

export default ChatPage;
