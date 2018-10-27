import React, { Component } from "react";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Modal from "react-awesome-modal";
// import Modal from "react-modal";

import { Mutation } from "react-apollo";

import { MUTATION_CREATE_NEW_CHAT } from "../gql";
import { LOCALSTORAGE_USERNAME_LOCATION } from "../constants";

const styles = {
    modalStyles: {
        padding: 30
    },
    cancelButton: {
        marginTop: 10,
        marginBottom: 10
    }
};

class ModalComponent extends Component {
    state = {
        chatUsers: [],
        chatName: ""
    };
    handleFormChange = event => {
        const { name, value } = event.target;

        if (name === "chatUsers") {
            let names = value.split(" ");
            this.setState(() => ({
                chatUsers: names.filter(user => {
                    if (user !== "" && !/\W+/.test(user)) {
                        return user;
                    } else return null;
                })
            }));
        } else {
            this.setState(() => ({
                [name]: value
            }));
        }
    };
    handleSubmit = event => {
        event.preventDefault();
    };
    createChat = (createChat, closeModal) => {
        createChat()
            .then(data => {
                const mData = data.data.createChat;
                console.log("mutation data", mData);
                this.props.history.push("/");
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        const { closeModal, visible } = this.props;
        const { chatName, chatUsers } = this.state;

        return (
            <Modal
                visible={visible}
                width="400"
                height="350"
                effect="fadeInUp"
                onClickAway={() => closeModal()}
            >
                <form style={styles.modalStyles} onSubmit={this.handleSubmit}>
                    <h1>New Chat</h1>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="chatName">Chat Name</InputLabel>
                        <Input
                            name="chatName"
                            type="text"
                            id="chatName"
                            onChange={this.handleFormChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="chatUsers">Chat Users</InputLabel>
                        <Input
                            name="chatUsers"
                            type="text"
                            id="chatUsers"
                            onChange={this.handleFormChange}
                        />
                    </FormControl>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        style={styles.cancelButton}
                        onClick={() => closeModal()}
                    >
                        Cancel
                    </Button>
                    <Mutation
                        mutation={MUTATION_CREATE_NEW_CHAT}
                        variables={{
                            name: chatName,
                            users: chatUsers,
                            originatorUsername: localStorage.getItem(
                                LOCALSTORAGE_USERNAME_LOCATION
                            )
                        }}
                    >
                        {createChat => {
                            return (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        this.createChat(createChat, closeModal)
                                    }
                                >
                                    Submit
                                </Button>
                            );
                        }}
                    </Mutation>
                </form>
            </Modal>
        );
    }
}

export default ModalComponent;
