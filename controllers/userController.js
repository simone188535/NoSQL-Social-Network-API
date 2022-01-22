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
    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
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
  
    const deletedUser = await User.deleteOne({ id: userId });

    res.status(204).json(deletedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};
