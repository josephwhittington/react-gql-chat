import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { connect } from "react-redux";
import {
    authenticateUserIfTokenExists,
    deauthenticateUser
} from "../actions/authActions";

class Navigation extends Component {
    state = {
        anchorEl: null
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = path => {
        this.setState(() => ({ anchorEl: null }));
        if (path) {
            switch (path) {
                case "/":
                case "/login":
                case "/register":
                case "/chat":
                    this.props.history.push(path);
                    break;
                case "/logout":
                    this.logout();
                    break;
                default:
                    break;
            }
        }
    };
    logout = () => {
        this.props.deauthenticateUser();
        this.props.history.push("/");
    };
    componentDidMount() {
        this.props.authenticateUserIfTokenExists();
    }
    componentDidUpdate() {
        this.props.authenticateUserIfTokenExists();
    }
    render() {
        const { anchorEl } = this.state;
        const { isAuthenticated: userAuthenticated } = this.props;
        return (
            <AppBar>
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu">
                        <MenuIcon onClick={this.handleClick} />
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        {!userAuthenticated && (
                            <MenuItem
                                onClick={() => this.handleClose("/register")}
                            >
                                Register
                            </MenuItem>
                        )}
                        {!userAuthenticated && (
                            <MenuItem
                                onClick={() => this.handleClose("/login")}
                            >
                                Login
                            </MenuItem>
                        )}
                        {userAuthenticated && (
                            <MenuItem onClick={() => this.handleClose("/chat")}>
                                Conversations
                            </MenuItem>
                        )}
                        {userAuthenticated && (
                            <MenuItem
                                onClick={() => this.handleClose("/logout")}
                            >
                                Logout
                            </MenuItem>
                        )}
                    </Menu>
                    <Typography
                        variant="h6"
                        color="inherit"
                        onClick={() => this.handleClose("/")}
                    >
                        Quick Chat
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticated
});

export default connect(
    mapStateToProps,
    { authenticateUserIfTokenExists, deauthenticateUser }
)(Navigation);
