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
            return parent.body;
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
