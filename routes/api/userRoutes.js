const router = require('express').Router();
const {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  addFriendToUsersFriendList,
  removeFriendFromUsersFriendList
} = require('../../controllers/userController');

router.route('/')
.get(getAllUsers)
.post(createUser);


router.route('/:userId')
.get(getUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(addFriendToUsersFriendList)
.delete(removeFriendFromUsersFriendList);

module.exports = router;
