const hashFunctions = require("./hash");
const stringFunctions = require("./string");

module.exports = {
    ...hashFunctions,
    ...stringFunctions
};
