const router = require('express').Router();
const {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/userController');

router.route('/')
.get(getAllUsers)
.post(createUser);


router.route('/:userId')
.get(getUser)
.put(updateUser)
.delete(deleteUser);

module.exports = router;
