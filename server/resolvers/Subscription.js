const { withFilter } = require("apollo-server-express");
const { ObjectId } = require("mongodb");

module.exports = {
    newMessage: {
        // Resolver does payload transformations before sending the sebscription event data
        resolve: payload => payload.message,
        // With filter allows me to filter shit
        subscribe: withFilter(
            (parent, { chatId }, { pubsub, db }) =>
                // Subscribes to listed events with async iterator
                pubsub.asyncIterator(["new-message"]),
            async (payload, { chatId }, { db }) => {
                // Get the chat in question
                const chat = await db
                    .collection("chats")
                    .findOne({ _id: ObjectId(chatId) });
                // If the schat exists then send the event data
                if (chat && String(chat._id) === chatId) {
                    console.log("shit is working");
                    return true;
                }
                // If code gets to this point then the event will not be sent
                return false;
            }
        )
    }
};
