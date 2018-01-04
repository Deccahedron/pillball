

const createUser = function (req, res) {
    res.status(501).json({ message: '501 - Not Implemented' });
}
const deleteUser = function (req, res) {
    res.status(501).json({ message: '501 - Not Implemented' });
}
const updateTimes = function (req, res) {
    res.status(501).json({ message: '501 - Not Implemented' });
}
const updateEmail = function (req, res) {
    res.status(501).json({ message: '501 - Not Implemented' });
}

const users = {
    createUser,
    deleteUser,
    updateTimes,
    updateEmail,
};
module.exports = users;
