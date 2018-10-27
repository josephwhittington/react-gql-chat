import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import CircularProgress from "@material-ui/core/CircularProgress";

import DrawerComponent from "./Drawer";
import ChatArea from "./ChatArea";

import { Query, Subscription } from "react-apollo";
import { connect } from "react-redux";
import { setCurrentChatId } from "../actions/chatActions";
import { addChatUpdate } from "../actions/updateActions";

import { QUERY_GET_USER_CHATS, SUBSCRIPTION_NEW_MESSAGE } from "../gql";
import { LOCALSTORAGE_USER_ID_LOCATION } from "../constants";

class PermanentDrawerLeft extends Component {
    state = {
        userId: null
    };
    onSubscriptionData = data => {
        console.log(
            "subscriptiondata",
            data.subscriptionData.data.newMessage.id
        );
        this.props.addChatUpdate(data.subscriptionData.data.newMessage.id);
        alert("New Message");
    };
    sendMessage = () => {
        alert("woah there clicky");
    };
    setSelectedChat = index => {
        this.props.setCurrentChatId(index);
    };
    componentDidMount() {
        this.setState(() => ({
            userId: localStorage.getItem(LOCALSTORAGE_USER_ID_LOCATION)
        }));
    }
    render() {
        const { classes, currentChatId, history, chatUpdates } = this.props;
        const { userId } = this.state;

        return (
            <Query
                query={QUERY_GET_USER_CHATS}
                onCompleted={this.queryReturned}
                variables={{
                    userId
                }}
            >
                {({ loading, data }) => {
                    if (loading) {
                        return (
                            <CircularProgress
                                className={classes.progress}
                                style={customStyles.loading}
                            />
                        );
                    } else if (data) {
                        const messages = data.userChats[0].messages;
                        const conversations = data.userChats;

                        return (
                            <Subscription
                                subscription={SUBSCRIPTION_NEW_MESSAGE}
                                variables={{
                                    chatIds: data.userChats.map(item => item.id)
                                }}
                                onSubscriptionData={this.onSubscriptionData}
                            >
                                {thing => {
                                    console.log("thing", thing);
                                    return (
                                        <div className={classes.root}>
                                            <DrawerComponent
                                                classes={classes}
                                                conversations={conversations}
                                                history={history}
                                                chatUpdates={chatUpdates}
                                                currentChatId={
                                                    currentChatId
                                                        ? currentChatId
                                                        : data.userChats[0].id
                                                }
                                                setSelectedChat={
                                                    this.setSelectedChat
                                                }
                                            />
                                            <main className={classes.content}>
                                                <ChatArea
                                                    userId={userId}
                                                    messages={messages}
                                                    chatUpdates={chatUpdates}
                                                    currentChatId={
                                                        currentChatId &&
                                                        currentChatId
                                                    }
                                                />
                                                <Card
                                                    style={
                                                        customStyles.messageInputDock
                                                    }
                                                >
                                                    <TextField
                                                        id="standard-with-placeholder"
                                                        label="Send Message"
                                                        placeholder="Message"
                                                        className={
                                                            classes.messageArea
                                                        }
                                                        fullWidth
                                                        margin="normal"
                                                        multiline
                                                    />
                                                    <Button
                                                        variant="fab"
                                                        aria-label="Send"
                                                        className={
                                                            classes.button
                                                        }
                                                        onClick={
                                                            this.sendMessage
                                                        }
                                                    >
                                                        <SendIcon />
                                                    </Button>
                                                </Card>
                                            </main>
                                        </div>
                                    );
                                }}
                            </Subscription>
                        );
                    }
                }}
            </Query>
        );
    }
}

const drawerWidth = 300;

const styles = theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        marginTop: 65,
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    },
    messageArea: {
        width: "60%",
        margin: 8,
        marginLeft: 30
    }
});

const customStyles = {
    messageInputDock: {
        position: "fixed",
        bottom: 0,
        width: "100%",
        marginLeft: -25,
        padding: 8,
        backgroundColor: "#ffffff"
    },
    loading: {
        display: "block",
        margin: "0 auto"
    }
};

PermanentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    currentChatId: state.chat.currentChatId,
    chatUpdates: state.chatUpdates
});

export default connect(
    mapStateToProps,
    { setCurrentChatId, addChatUpdate }
)(withStyles(styles)(PermanentDrawerLeft));
