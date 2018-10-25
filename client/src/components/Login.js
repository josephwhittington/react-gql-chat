import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { MUTATION_LOGIN_USER } from "../gql";
import { userAuthenticated } from "../utils";
import { authenticateUser } from "../actions/authActions";

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

class Login extends React.Component {
    state = {
        username: "",
        password: "",
        errors: []
    };
    handleLogin = (event, login) => {
        const { username, password } = this.state;
        const errors = [];

        if (!username || !password) {
            errors.push("username or password undef");
            alert("you got me fucked up. fill out the damn form");
        }
        if (/\s+/.test(username || /\s+/.test(password))) {
            errors.push("username or password contain space/s");
            alert("No whitespaces allowed");
        }

        if (errors.length === 0) {
            login()
                .then(data => console.log("data", data))
                .catch(err => console.log(err));
            this.props.authenticateUser(
                { username, password },
                login,
                this.props.history
            );
        } else {
            this.setState(prevState => ({
                errors: prevState.errors.concat(errors)
            }));
        }
    };
    handleFormChange = event => {
        const { name, value } = event.target;
        this.setState(() => ({
            [name]: value
        }));
    };
    componentDidMount() {
        if (userAuthenticated()) {
            this.props.history.push("/chat");
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
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>
                        <form
                            className={classes.form}
                            onSubmit={event => event.preventDefault()}
                        >
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">
                                    Username
                                </InputLabel>
                                <Input
                                    id="email"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    onKeyUp={this.handleFormChange}
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
                            <Mutation
                                mutation={MUTATION_LOGIN_USER}
                                variables={{ username, password }}
                            >
                                {login => {
                                    return (
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            onClick={event =>
                                                this.handleLogin(event, login)
                                            }
                                        >
                                            Log in
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

Login.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(
    null,
    { authenticateUser }
)(withRouter(withStyles(styles)(Login)));
