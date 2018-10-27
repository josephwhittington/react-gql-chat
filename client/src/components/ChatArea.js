import React, { Component, Fragment } from "react";

import { Query } from "react-apollo";

import { QUERY_GET_CHAT } from "../gql";

import Message from "./Message";

class ChatArea extends Component {
    render() {
        const { messages, userId, currentChatId } = this.props;
        let renderMessages = messages;
        console.log("props", this.props);
        return (
            <Query
                query={QUERY_GET_CHAT}
                skip={!currentChatId}
                variables={{ id: currentChatId }}
            >
                {({ loading, data }) => {
                    if (loading) {
                        return "loading";
                    }
                    if (data) {
                        renderMessages = data.chat.messages;
                    }

                    return (
                        <Fragment>
                            {!renderMessages ||
                                (renderMessages.length === 0 && (
                                    <div style={{ textAlign: "center" }}>
                                        No Messages, Ha ha neeerrd! 😂😂😂😂
                                    </div>
                                ))}
                            {renderMessages.map(item => (
                                <Message
                                    key={item.id}
                                    userId={userId}
                                    message={item}
                                />
                            ))}
                            <div style={{ height: 55 }} />
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
}

export default ChatArea;
