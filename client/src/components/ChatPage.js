import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

import DrawerComponent from "./Drawer";
import ChatArea from "./ChatArea";

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
    }
};

class PermanentDrawerLeft extends Component {
    render() {
        const { classes } = this.props;

        const conversations = [];

        return (
            <div className={classes.root}>
                <DrawerComponent
                    classes={classes}
                    conversations={conversations}
                />
                <main className={classes.content}>
                    <ChatArea classes={classes} />
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
                        >
                            <SendIcon />
                        </Button>
                    </Card>
                </main>
            </div>
        );
    }
}

PermanentDrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PermanentDrawerLeft);
