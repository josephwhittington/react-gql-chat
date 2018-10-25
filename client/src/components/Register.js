import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { Mutation } from "react-apollo";

import { MUTATION_REGISTER_USER } from "../gql";
import { userAuthenticated } from "../utils";

const styles = theme => ({
    layout: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: 100,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    }
});

class Register extends Component {
    state = {
        username: "",
        password: "",
        password2: ""
    };
    handleFormChange = event => {
        const { name, value } = event.target;
        if (value) {
            this.setState(() => ({ [name]: value }), console.log(this.state));
        }
    };
    handleFormSubmit = event => {
        const e = event;
        e.preventDefault();
    };
    handleRegister = (event, register) => {
        const { username, password, password2 } = this.state;

        if (!password || !password2 || !username) {
            alert("password or username field missing");
        } else {
            if (password !== password2) {
                alert("passwords don't match");
            } else {
                register()
                    .then(data => {
                        if (data.data.registerUser.username) {
                            alert(
                                `You have been registered as ${
                                    data.data.registerUser.username
                                }. Please Log In`
                            );
                            this.props.history.push("/login");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    };
    componentDidMount() {
        if (userAuthenticated()) {
            this.props.history.push("/");
        }
    }
    render() {
        const { classes } = this.props;
        const { username, password } = this.state;

        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <AccountCircle />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <form
                            className={classes.form}
                            onSubmit={this.handleFormSubmit}
                        >
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">
                                    Username
                                </InputLabel>
                                <Input
                                    id="username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={this.handleFormChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">
                                    Password
                                </InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleFormChange}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">
                                    Verify Password
                                </InputLabel>
                                <Input
                                    name="password2"
                                    type="password"
                                    id="password2"
                                    autoComplete="current-password"
                                    onChange={this.handleFormChange}
                                />
                            </FormControl>
                            <Mutation
                                mutation={MUTATION_REGISTER_USER}
                                variables={{ username, password }}
                            >
                                {register => {
                                    return (
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={event =>
                                                this.handleRegister(
                                                    event,
                                                    register
                                                )
                                            }
                                        >
                                            Register
                                        </Button>
                                    );
                                }}
                            </Mutation>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Register);
