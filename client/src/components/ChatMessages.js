import React, { Component, Fragment } from "react";

import { Query } from "react-apollo";

import { QUERY_GET_CHAT } from "../gql";

import Message from "./Message";

class ChatArea extends Component {
    render() {
        const { messages, userId, currentChatId } = this.props;
        let renderMessages = messages;

        return (
            <Query
                query={QUERY_GET_CHAT}
                skip={!currentChatId}
                pollInterval={1000}
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
                                    <div style={style.defaultMessage}>
                                        You currently have no messages
                                    </div>
                                ))}
                            {Array.isArray(renderMessages) &&
                                renderMessages.map(item => (
                                    <Message
                                        key={item.id}
                                        userId={userId}
                                        message={item}
                                    />
                                ))}
                            <div style={style.buffer} />
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
}

const style = {
    defaultMessage: {
        textAlign: "center"
    },
    buffer: {
        height: 55
    }
};

export default ChatArea;
