const { ApolloError } = require("apollo-server-express");
const { ObjectId } = require("mongodb");

module.exports = {
    me(parent, args, { db, currentUser }) {
        return currentUser;
    },
    async totalUserCount(parent, args, { db }) {
        return await db.collection("users").estimatedDocumentCount();
    },
    async chat(parent, { id }, { db }) {
        const chat = await db
            .collection("chats")
            .findOne({ _id: ObjectId(id) });
        return chat;
    },
    async chatUserCount(parent, { id }, { db }) {
        const chat = await db
            .collection("chats")
            .findOne({ _id: ObjectId(id) });
        if (chat) {
            return chat.users.length;
        }
    }
};
