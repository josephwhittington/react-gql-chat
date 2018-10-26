import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const customStyles = {
    messageLeft: {
        width: "48%",
        margin: 8,
        borderRadius: 8,
        borderBottomLeftRadius: 0
    },
    messageRight: {
        width: "48%",
        margin: 8,
        marginLeft: "52%",
        borderRadius: 8,
        borderBottomRightRadius: 0,
        backgroundColor: "lightslategrey",
        color: "whitesmoke"
    }
};

const Message = props => {
    const {
        body,
        originator: { id }
    } = props.message;
    const style =
        props.userId === id
            ? customStyles.messageRight
            : customStyles.messageRight;
    return (
        <Card style={style}>
            <CardContent>{body}</CardContent>
        </Card>
    );
};

export default Message;
