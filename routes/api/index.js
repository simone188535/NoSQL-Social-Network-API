const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/posts', userRoutes);

module.exports = router;
