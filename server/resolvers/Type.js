const { GraphQLScalarType } = require("graphql");
const { ObjectId } = require("mongodb");

module.exports = {
    AuthPayload: {
        token: parent => parent.token,
        user: (parent, args, { db }) => parent.user
    },
    User: {
        id: parent => String(parent._id)
    },
    Message: {
        id: parent => String(parent._id),
        chatId: parent => String(parent.chatId),
        body: async (parent, args, { db }) => {
            // Save chat
            const chat = await db
                .collection("chats")
                .findOne({ _id: ObjectId(parent.chatId) });
            // Save messages, empty array if new chat
            const messages = chat.messages;
            // Declare message
            let message;
            // If messages exist look for message in context and assign to message
            if (messages && messages.length > 0) {
                message = messages.filter(item => item.id === parent.id);
            }
            // If message[0] has a message body send that
            if (Array.isArray(message) && message[0] && message[0].body) {
                return message[0].body;
            }
            // If all else fails return null
            return null;
        }
    },
    Chat: {
        id: parent => String(parent._id),
        users: async (parent, args, { db }) => {
            const chat = await db
                .collection("chats")
                .findOne({ _id: ObjectId(parent._id) });
            if (Array.isArray(chat.users)) {
                return chat.users.map(user => {
                    user._id = String(user._id);
                    return user;
                });
            }
            return [];
        },
        messages: async (parent, args, { db }) => {
            const chat = await db
                .collection("chats")
                .findOne({ _id: ObjectId(parent._id) });
            if (chat) {
                const messages = chat.messages;
                return messages;
            }
            console.log("chat not found");
            return [];
        }
    },
    DateTime: new GraphQLScalarType({
        name: "DateTime",
        description: "A valid date time value.",
        parseValue: value => new Date(value),
        serialize: value => new Date(value).toISOString(),
        parseLiteral: ast => ast.value
    })
};
