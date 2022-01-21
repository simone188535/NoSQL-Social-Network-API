const router = require('express').Router();
const {
  getUser,
  // getSinglePost
} = require('../../controllers/userController');

router.route('/').get(getUser);
// .post(createPost)


// router.route('/:userId').get(getSinglePost);

module.exports = router;
