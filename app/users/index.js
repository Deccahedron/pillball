const model = require('../../models/user');

const createUser = async function (req, res) {
  try {
    const user = req.body.user;
    if (!user) {
      return res.status(400).json({ message: 'Please pass the user details' });
    }
    if (!user.email || !user.name) {
      return res.status(400).json({ message: 'Please pass the user email and the user name' });
    }
    const created = await model.create(user);
    return res.status(200).json({ user: created });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const deleteUser = async function (req, res) {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: 'Please pass the user\'s email' });
    }
    const removed = await model.remove({ email: req.body.email});
    return res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const updateTimes = async function (req, res) {
  try {
    if (!req.body.email || !req.body.times) {
      return res.status(400).json({ message: 'Please pass the user\'s email and new times' });
    }
    const userUpdated = await model.update({ email: req.body.email }, { emailTimes: req.body.times }, { runValidators: true });
    return res.status(200).json({ message: 'User\'s times Updated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
const updateEmail = async function (req, res) {
  try {
    if (!req.body.previousEmail || !req.body.newEmail) {
      return res.status(400).json({ message: 'Please pass the user\'s previous and new email' });
    }
    const userUpdated = await model.update({ email: req.body.previousEmail }, { email: req.body.newEmail }, { runValidators: true });
    return res.status(200).json({ message: 'User Updated' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const users = {
  createUser,
  deleteUser,
  updateTimes,
  updateEmail,
};
module.exports = users;
