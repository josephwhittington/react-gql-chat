import React, { Component, Fragment } from "react";
// import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    loading: {
        display: "block",
        margin: "0 auto"
    }
};

class ChatArea extends Component {
    render() {
        const { classes } = this.props;
        // return (
        //     <CircularProgress
        //         className={classes.progress}
        //         style={customStyles.loading}
        //     />
        // );
        return (
            <Fragment>
                <Card style={customStyles.messageLeft}>
                    <CardContent>What's up?</CardContent>
                </Card>
                <Card style={customStyles.messageLeft}>
                    <CardContent>What's up?</CardContent>
                </Card>
                <Card style={customStyles.messageLeft}>
                    <CardContent>What's up?</CardContent>
                </Card>
                <Card style={customStyles.messageRight}>
                    <CardContent>
                        Not Much, just making this messaging UI for school
                    </CardContent>
                </Card>
                <Card style={customStyles.messageLeft}>
                    <CardContent>What's up?</CardContent>
                </Card>
                <Card style={customStyles.messageRight}>
                    <CardContent>
                        Not Much, just making this messaging UI for school
                    </CardContent>
                </Card>
                <Card style={customStyles.messageLeft}>
                    <CardContent>What's up?</CardContent>
                </Card>
                <Card style={customStyles.messageRight}>
                    <CardContent>
                        Not Much, just making this messaging UI for school
                    </CardContent>
                </Card>
                <Card style={customStyles.messageLeft}>
                    <CardContent>What's up?</CardContent>
                </Card>
                <Card style={customStyles.messageRight}>
                    <CardContent>
                        Not Much, just making this messaging UI for school
                    </CardContent>
                </Card>
                <Card style={customStyles.messageLeft}>
                    <CardContent>What's up?</CardContent>
                </Card>
                <Card style={customStyles.messageRight}>
                    <CardContent>
                        Not Much, just making this messaging UI for school Not
                        Much, just making this messaging UI for school Not Much,
                        just making this messaging UI for school Not Much, just
                        making this messaging UI for school
                    </CardContent>
                </Card>
                <Card style={customStyles.messageLeft}>
                    <CardContent>What's up?</CardContent>
                </Card>
                <Card style={customStyles.messageRight}>
                    <CardContent>
                        Not Much, just making this messaging UI for school
                    </CardContent>
                </Card>
                <Card style={customStyles.messageLeft}>
                    <CardContent>What's up?</CardContent>
                </Card>
                <Card style={customStyles.messageRight}>
                    <CardContent>
                        Not Much, just making this messaging UI for school
                    </CardContent>
                </Card>
                <Card style={customStyles.messageLeft}>
                    <CardContent>What's up?</CardContent>
                </Card>
                <Card style={customStyles.messageRight}>
                    <CardContent>
                        Not Much, just making this messaging UI for school
                    </CardContent>
                </Card>
                <Card style={customStyles.messageLeft}>
                    <CardContent>What's up?</CardContent>
                </Card>
                <Card style={customStyles.messageRight}>
                    <CardContent>
                        Not Much, just making this messaging UI for school
                    </CardContent>
                </Card>
                <div style={{ height: 55 }} />
            </Fragment>
        );
    }
}

export default ChatArea;