const { User } = require('../models');

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch(err) {
    return res.status(500).json(err)
  }
};


