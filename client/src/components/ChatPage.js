import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import DrawerComponent from "./Drawer";
import ChatContent from "./ChatContent";
import Loading from "./Loading";

import { Query, Subscription } from "react-apollo";
import { connect } from "react-redux";
import { setCurrentChatId } from "../actions/chatActions";
import { addChatUpdate } from "../actions/updateActions";

import { QUERY_GET_USER_CHATS, SUBSCRIPTION_NEW_MESSAGE } from "../gql";
import { LOCALSTORAGE_USER_ID_LOCATION } from "../constants";

class PermanentDrawerLeft extends Component {
    state = {
        userId: null,
        message: ""
    };
    onSubscriptionData = data => {
        console.log(
            "subscriptiondata",
            data.subscriptionData.data.newMessage.id
        );
        this.props.addChatUpdate(data.subscriptionData.data.newMessage.id);
        // alert("New Message");
    };
    sendMessage = send => {
        console.log("typeof sned:", typeof send);
        send()
            .then(data => {
                if (data) {
                    // alert("message sent");
                }
            })
            .catch(err => {
                console.log(err);
                alert("you done fucked up now");
            });
        // alert("woah there clicky");
    };
    setSelectedChat = index => {
        this.props.setCurrentChatId(index);
    };
    onMessageChange = event => {
        const { value } = event.target;
        this.setState(() => ({ message: value }));
    };
    componentDidMount() {
        this.setState(() => ({
            userId: localStorage.getItem(LOCALSTORAGE_USER_ID_LOCATION)
        }));
    }
    render() {
        const { classes, history, currentChatId, chatUpdates } = this.props;
        const { userId, message } = this.state;

        return (
            <Query
                query={QUERY_GET_USER_CHATS}
                onCompleted={this.queryReturned}
                pollInterval={1000}
                variables={{
                    userId
                }}
            >
                {({ loading, data }) => {
                    if (loading) {
                        return <Loading classes={classes} />;
                    } else if (data) {
                        const messages =
                            Array.isArray(data.userChats) &&
                            data.userChats[0].messages;
                        const conversations = data.userChats;
                        const defaultUserChatId =
                            Array.isArray(data.userChats) &&
                            data.userChats[0].id;

                        console.log("data", data);

                        return (
                            <Subscription
                                subscription={SUBSCRIPTION_NEW_MESSAGE}
                                variables={{
                                    chatIds: data.userChats
                                        ? data.userChats.map(item => item.id)
                                        : []
                                }}
                                onSubscriptionData={this.onSubscriptionData}
                            >
                                {thing => {
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
                                                        : defaultUserChatId
                                                }
                                                setSelectedChat={
                                                    this.setSelectedChat
                                                }
                                            />
                                            <ChatContent
                                                classes={classes}
                                                userId={userId}
                                                messages={messages}
                                                chatUpdates={chatUpdates}
                                                currentChatId={currentChatId}
                                                message={message}
                                                onMessageChange={
                                                    this.onMessageChange
                                                }
                                                sendMessage={this.sendMessage}
                                                defaultUserChatId={
                                                    defaultUserChatId
                                                }
                                            />
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
