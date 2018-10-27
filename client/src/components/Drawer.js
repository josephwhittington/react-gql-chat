import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";

import ListItem from "./ListItem";
import Modal from "./Modal";

class DrawerComponent extends Component {
    state = {
        selectedIndex: 1,
        visible: false
    };
    createNewChat = createChat => {
        alert(`clicked ${typeof createChat}`);
    };
    openModal = () => {
        this.setState({
            visible: true
        });
    };

    closeModal = () => {
        this.setState({
            visible: false
        });
    };
    render() {
        const {
            classes,
            conversations,
            setSelectedChat,
            currentChatId,
            history
        } = this.props;

        const { visible } = this.state;

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
                    <ListItem
                        key={0}
                        selectedIndex={currentChatId}
                        conversation={"Start Chat (+)"}
                        onClick={this.openModal}
                    />
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
                {
                    <Modal
                        closeModal={this.closeModal}
                        history={history}
                        visible={visible}
                    />
                }
            </Drawer>
        );
    }
}

export default DrawerComponent;
