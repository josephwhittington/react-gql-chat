import React, { Component } from "react";
// import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import ListItem from "./ListItem";

class DrawerComponent extends Component {
    state = {
        selectedIndex: 1
    };
    render() {
        const {
            classes,
            conversations,
            setSelectedChat,
            currentChatId
        } = this.props;

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
                    {conversations.map(conversation => (
                        <ListItem
                            key={conversation.id}
                            id={conversation.id}
                            selectedIndex={currentChatId}
                            conversation={conversation.name}
                            setSelectedChat={setSelectedChat}
                        />
                    ))}
                </List>
            </Drawer>
        );
    }
}

export default DrawerComponent;
