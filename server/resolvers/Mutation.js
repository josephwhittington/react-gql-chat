const { ObjectId } = require("mongodb");
const { ApolloError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");

const { hashPassword, comapreHash, capitalize } = require("../utils");

const secret = require("../../config").secret;

module.exports = {
    async registerUser(parent, { username, password }, { db }) {
        // Check if the user exists
        const userlookup = await db.collection("users").findOne({ username });
        // If user exists throw error
        if (userlookup) {
            return new ApolloError("user exists");
        }
        // If uer doesn't exist, create user
        const user = {
            username,
            password: hashPassword(password),
            createdAt: new Date()
        };
        // Collect the user id created by the database
        const { insertedId } = await db.collection("users").insertOne(user);
        // Add id to the user object as string
        user.id = String(insertedId);
        // Return user object
        return user;
    },
    async authenticateUser(parent, { username, password }, { db }) {
        // Lookup user
        const lookup = await db.collection("users").findOne({ username });
        // If user doesn't exist throw error
        if (!lookup) {
            return new ApolloError("user does not exist");
        }
        // Else lookup user and check password
        if (!comapreHash(password, lookup.password)) {
            return new ApolloError("username or password incorrect");
        }
        const user = lookup;
        user._id = String(lookup._id);

        // Sign Token
        const token = jwt.sign({ user }, secret, { expiresIn: "30m" });

        const payload = {
            token,
            user,
            createdAt: new Date()
        };
        return payload;
    },
    async deleteUser(parent, { username }, { db, err }) {
        if (err) return err;
        const user = await db.collection("users").findOne({ username });
        if (user) {
            db.collection("users").deleteOne({ username });
            return true;
        }
        return false;
    },
    async createChat(parent, { name, originatorUsername, users }, { db, err }) {
        // If session expired, throw error
        if (err) return err;

        const user = await db
            .collection("users")
            .findOne({ username: originatorUsername });
        // If name was not sent define name
        if (!name && user) {
            name = `${capitalize(user.username)}'s Chat`;
        }
        // Look up users and add them to the users array
        const userArray = [];
        for (u of users) {
            let u_lookup = await db
                .collection("users")
                .findOne({ username: u });

            if (u_lookup) {
                userArray.push(u_lookup);
            }
        }
        // Create chat
        const chat = await {
            createdBy: user,
            name,
            users: userArray,
            messages: [],
            createdAt: new Date()
        };

        // Add Id to the chat object
        const { insertedId } = await db.collection("chats").insertOne(chat);
        chat._id = insertedId;

        return chat;
    },
    async deleteChat(parent, { chatId }, { db, err }) {
        // If user not authenticated throw error
        if (err) return err;

        // Check if the chat still exists
        const chat = await db
            .collection("chats")
            .findOne({ _id: ObjectId(chatId) });
        // If chat exists, delete that shit
        if (chat) {
            db.collection("chats").deleteOne({ _id: ObjectId(chatId) });
            return true;
        }

        return false;
    },
    async addUserToChat(parent, { chatId, userId }, { db, err }) {
        // If user not authenticated throw error
        if (err) return err;

        // Check if chat exists
        const chat = await db
            .collection("chats")
            .findOne({ _id: ObjectId(chatId) });
        // If chat exists add user to chat
        if (chat) {
            // Look up the user
            const user = await db
                .collection("users")
                .findOne({ _id: ObjectId(userId) });
            // Create new array to append user to
            const newChatUsers = chat.users;
            if (user) {
                newChatUsers.push(user);
                db.collection("chats").updateOne(
                    { _id: ObjectId(chatId) },
                    { $set: { users: newChatUsers } }
                );
            }
            return chat;
        } else return new ApolloError("user not found");
    },
    async sendMessage(
        parent,
        { chatId, body },
        { err, db, pubsub, currentUser }
    ) {
        // If user not authenticated throw error
        if (err) return err;
        // console.log(currentUser.user);

        // Make sure the chat is valid
        const chat = await db
            .collection("chats")
            .findOne({ _id: ObjectId(chatId) });

        if (chat) {
            // Add message to chat object
            const newMessages = chat.messages;
            const _id = new ObjectId();
            // Construct message object
            const message = {
                _id,
                originator: currentUser,
                chatId: ObjectId(chatId),
                body,
                createdAt: new Date()
            };
            // Append the new message to the temp object
            newMessages.push(message);
            // Run update query
            db.collection("chats").updateOne(
                { _id: ObjectId(chatId) },
                { $set: { messages: newMessages } }
            );
            // Append new object and return
            chat.messages = newMessages;
            pubsub.publish("new-message", { message });
            return chat;
        }
    }
};
