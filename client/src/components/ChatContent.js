import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

import { Mutation } from "react-apollo";

import { MUTATION_SEND_MESSAGE } from "../gql";

import ChatArea from "./ChatMessages";

export default class ChatContent extends Component {
    render() {
        const {
            classes,
            userId,
            messages,
            chatUpdates,
            currentChatId,
            defaultUserChatId,
            message,
            sendMessage,
            onMessageChange
        } = this.props;
        return (
            <main className={classes.content}>
                <ChatArea
                    userId={userId}
                    messages={messages}
                    chatUpdates={chatUpdates}
                    currentChatId={currentChatId && currentChatId}
                />
                <Card style={customStyles.messageInputDock}>
                    <TextField
                        id="standard-with-placeholder"
                        label="Send Message"
                        placeholder="Message"
                        className={classes.messageArea}
                        fullWidth
                        margin="normal"
                        multiline
                        onChange={onMessageChange}
                    />
                    <Mutation
                        mutation={MUTATION_SEND_MESSAGE}
                        variables={{
                            chatId: currentChatId
                                ? currentChatId
                                : defaultUserChatId,
                            body: message
                        }}
                    >
                        {send => (
                            <Button
                                variant="fab"
                                aria-label="Send"
                                className={classes.button}
                                onClick={() => sendMessage(send)}
                            >
                                <SendIcon />
                            </Button>
                        )}
                    </Mutation>
                </Card>
            </main>
        );
    }
}

const customStyles = {
    messageInputDock: {
        position: "fixed",
        bottom: 0,
        width: "100%",
        marginLeft: -25,
        padding: 8,
        backgroundColor: "#ffffff"
    }
};
