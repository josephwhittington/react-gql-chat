import React, { Component, Fragment } from "react";
// import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";

class DrawerComponent extends Component {
    state = {
        selectedIndex: 1
    };
    render() {
        const { classes, conversations } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
                anchor="left"
            >
                <List>
                    <ListSubheader>Conversations</ListSubheader>
                    {conversations &&
                        Array.isArray(conversations) && (
                            <Fragment>
                                <ListItem
                                    button
                                    selected={this.state.selectedIndex === 1}
                                    onClick={event =>
                                        this.handleListItemClick(event, 0)
                                    }
                                >
                                    <ListItemText>
                                        Selected Conversation
                                    </ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem
                                    button
                                    selected={this.state.selectedIndex === 0}
                                    onClick={event =>
                                        this.handleListItemClick(event, 0)
                                    }
                                >
                                    <ListItemText>Conversation</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem
                                    button
                                    selected={this.state.selectedIndex === 0}
                                    onClick={event =>
                                        this.handleListItemClick(event, 0)
                                    }
                                >
                                    <ListItemText>Conversation</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem
                                    button
                                    selected={this.state.selectedIndex === 0}
                                    onClick={event =>
                                        this.handleListItemClick(event, 0)
                                    }
                                >
                                    <ListItemText>Conversation</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem
                                    button
                                    selected={this.state.selectedIndex === 0}
                                    onClick={event =>
                                        this.handleListItemClick(event, 0)
                                    }
                                >
                                    <ListItemText>Conversation</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem
                                    button
                                    selected={this.state.selectedIndex === 0}
                                    onClick={event =>
                                        this.handleListItemClick(event, 0)
                                    }
                                >
                                    <ListItemText>Conversation</ListItemText>
                                </ListItem>
                            </Fragment>
                        )}
                </List>
            </Drawer>
        );
    }
}

export default DrawerComponent;
