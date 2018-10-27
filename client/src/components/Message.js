import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
    },
    sender: {
        marginLeft: 30,
        marginBottom: 8
    }
};

const Message = props => {
    const {
        body,
        originator: { id, username }
    } = props.message;

    const style =
        props.userId === id
            ? customStyles.messageRight
            : customStyles.messageLeft;

    return (
        <Card style={style}>
            <CardContent>{body}</CardContent>
            {props.userId !== id && (
                <Typography color="textSecondary" style={customStyles.sender}>
                    {username}
                </Typography>
            )}
        </Card>
    );
};

export default Message;
