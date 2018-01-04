
const model = require('../../models/user')

const createUser = async function (req, res) {
  try {
    const user = req.body.user;
    if (!user) {
      return res.status(400).json({ message: 'Please pass the user details' });
    }
    if(!user.email && !user.name) {
      return res.status(400).json({ message: 'Please pass the user email and the user name' });
    }
    const created = await model.create(user);
    return res.status(200).json({ user: created });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
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
