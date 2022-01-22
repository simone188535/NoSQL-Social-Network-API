const { User } = require("../models");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});

    res.status(200).json(allUsers);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(406).json('userId must be provided');
    }
    const user = await User.findById(userId)    
    .populate("thoughts")
    .populate("friends");

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(406).json('username and email must be provided');
    }
    const user = await User.create({ username, email });
    // .populate("thoughts")
    // .populate("friends");

    res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email } = req.body;
    
    if (!userId || !username || !email) {
      return res.status(406).json('userId, username and email must be provided');
    }

    const updatedUser = await User.findOneAndUpdate(
      { id: userId },
      {
        username,
        email,
      },
      {
        new: true,
      }
    );

    res.status(202).json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(406).json('userId must be provided');
    }

    const deletedUser = await User.deleteOne({ id: userId });

    res.status(204).json(deletedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.addFriendToUsersFriendList = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    if (!userId || !friendId) {
      return res.status(406).json('userId and friendId must be provided');
    }
    const user = await User.findOneAndUpdate(
      { id: userId },
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.removeFriendFromUsersFriendList = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    if (!userId || !friendId) {
      return res.status(406).json('userId and friendId must be provided');
    }
    const user = await User.findOneAndUpdate(
      { id: userId },
      { $pull: { friends: friendId } },
      { new: true }
    );

    res.status(201).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};
