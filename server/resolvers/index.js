const Subscription = require("./Subscription");
const Mutation = require("./Mutation");
const Query = require("./Query");
const Type = require("./Type");

module.exports = {
    Mutation,
    Query,
    Subscription,
    ...Type
};
