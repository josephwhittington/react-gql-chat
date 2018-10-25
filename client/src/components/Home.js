import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import { userAuthenticated } from "../utils";

const styles = theme => ({
    appBar: {
        position: "relative"
    },
    icon: {
        marginRight: theme.spacing.unit * 2
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper
    },
    heroContent: {
        maxWidth: 600,
        margin: "20vh auto",
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: "auto",
            marginRight: "auto"
        }
    }
});

class Home extends React.Component {
    routeToPath = path => {
        this.props.history.push(path);
    };
    componentDidMount() {
        if (userAuthenticated()) {
            this.props.history.push("/chat");
        }
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <main className="h-100">
                    {/* Hero unit */}
                    <div className={classes.heroUnit}>
                        <div className={classes.heroContent}>
                            <Typography
                                component="h1"
                                variant="h2"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                            >
                                Quick Chat
                            </Typography>
                            <Typography
                                variant="h6"
                                align="center"
                                color="textSecondary"
                                paragraph
                            >
                                The place to come and create a quick chatroom.
                                Just come on in and chat, chat, chat away. Chat
                                all day, I don't care. I just need enough text
                                to make my landing page look like I put thought
                                into my little quote here.
                            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={16} justify="center">
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                this.routeToPath("/register")
                                            }
                                        >
                                            Sign Up
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() =>
                                                this.routeToPath("/login")
                                            }
                                        >
                                            Log In
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
