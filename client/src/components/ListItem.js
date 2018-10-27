import React, { Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider } from "@material-ui/core";

const ListItemComponent = props => {
    const { id, conversation, setSelectedChat, selectedIndex } = props;
    return (
        <Fragment>
            <Divider />
            <ListItem
                button
                selected={selectedIndex === 0}
                onClick={event => setSelectedChat(id)}
            >
                <ListItemText>{conversation}</ListItemText>
            </ListItem>
        </Fragment>
    );
};

export default ListItemComponent;
