const { withFilter } = require("apollo-server-express");
const { ObjectId } = require("mongodb");

const { arrayIncludesValue } = require("../utils");

module.exports = {
    newMessage: {
        // Resolver does payload transformations before sending the sebscription event data
        resolve: payload => payload.message,
        // With filter allows me to filter shit
        subscribe: withFilter(
            (parent, { chatIds }, { pubsub, db }) =>
                // Subscribes to listed events with async iterator
                pubsub.asyncIterator(["new-message"]),
            async (payload, { chatIds }, { db }) => {
                // If the schat exists then send the event data
                if (chatIds.includes(String(payload.message.chatId))) {
                    console.log("shit is working");
                    return true;
                }
                // If code gets to this point then the event will not be sent
                return false;
            }
        )
    }
};
