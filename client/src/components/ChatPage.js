import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Query } from "react-apollo";

import DrawerComponent from "./Drawer";
import ChatArea from "./ChatArea";

import { QUERY_GET_USER_CHATS } from "../gql";
import { LOCALSTORAGE_USER_ID_LOCATION } from "../constants";

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
        margin: 8
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

class PermanentDrawerLeft extends Component {
    state = {
        userId: null
    };
    sendMessage = () => {
        alert("woah there clicky");
    };
    componentDidMount() {
        this.setState(() => ({
            userId: localStorage.getItem(LOCALSTORAGE_USER_ID_LOCATION)
        }));
    }
    render() {
        const { classes } = this.props;
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
                            <div className={classes.root}>
                                <DrawerComponent
                                    classes={classes}
                                    conversations={conversations}
                                />
                                <main className={classes.content}>
                                    <ChatArea
                                        userId={userId}
                                        messages={messages}
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
                                        />
                                        <Button
                                            variant="fab"
                                            aria-label="Send"
                                            className={classes.button}
                                            onClick={this.sendMessage}
                                        >
                                            <SendIcon />
                                        </Button>
                                    </Card>
                                </main>
                            </div>
                        );
                    }
                }}
            </Query>
        );
    }
}

PermanentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PermanentDrawerLeft);
