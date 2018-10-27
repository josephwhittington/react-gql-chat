const arrayIncludesValue = (array, value) => {
    array.forEach(item => {
        if (item === value) return true;
    });
    return false;
};

module.exports = {
    arrayIncludesValue
};
