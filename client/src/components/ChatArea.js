import React, { Component, Fragment } from "react";

import Message from "./Message";

class ChatArea extends Component {
    render() {
        const { messages, userId } = this.props;
        console.log(messages);
        return (
            <Fragment>
                {messages.map(item => (
                    <Message key={item.id} userId={userId} message={item} />
                ))}
                <div style={{ height: 55 }} />
            </Fragment>
        );
    }
}

export default ChatArea;
