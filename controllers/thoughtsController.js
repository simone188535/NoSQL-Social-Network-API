const { Thought, User } = require("../models");

exports.getAllThoughts = async (req, res) => {
  try {
    const allThoughts = await Thought.find({});

    res.status(200).json(allThoughts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getThought = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    if (!thoughtId) {
      return res.status(406).json("thoughtId must be provided");
    }
    const user = await Thought.findById(thoughtId);

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.createThought = async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;
    if (!thoughtText || !username || !userId) {
      return res
        .status(406)
        .json("thoughtText, username and userId must be provided");
    }
    const thought = await Thought.create({ thoughtText, username });

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "Thought created, but found no user with that ID",
      });
    }
    res.status(201).json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateThought = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;

    if (!thoughtId || !thoughtText) {
      return res.status(406).json("thoughtId and thoughtText must be provided");
    }

    const updatedThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      {
        thoughtText,
      },
      {
        new: true,
      }
    );

    res.status(202).json(updatedThought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.deleteThought = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    if (!thoughtId) {
      return res.status(406).json("thoughtId must be provided");
    }

    const deletedThought = await Thought.findOneAndRemove({ _id: thoughtId });

    if (!deletedThought) {
      return res.status(404).json({ message: "No Thought found." });
    }

    const recipientOfThought = await User.findOne({
      username: deletedThought.username,
    });

    if (recipientOfThought) {
      // updatedUser
    await User.updateOne(
        { _id: recipientOfThought._id },
        { $pull: { thoughts: thoughtId } }
      );
    }
    
    res.status(204).json(deletedThought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.addReaction = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { reactionText, username } = req.body;

    if (!thoughtId) {
      return res.status(406).json("thoughtId must be provided");
    }
    const reactionAddedToThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $addToSet: { reactions: { reactionBody: reactionText, username } } },
      { new: true }
    );

    res.status(201).json(reactionAddedToThought);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.removeReaction = async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;

    if (!thoughtId || !reactionId) {
      return res.status(406).json("thoughtId and reactionId must be provided");
    }
    const reactionRemovedToThought = await Thought.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: { _id: reactionId } } },
      { new: true, safe: true }
    );

    res.status(204).json(reactionRemovedToThought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
