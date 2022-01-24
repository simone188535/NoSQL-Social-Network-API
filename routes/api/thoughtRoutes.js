const router = require('express').Router();
const {
    getAllThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtsController');

router.route('/')
.get(getAllThoughts)
.post(createThought);


router.route('/:thoughtId')
.get(getThought)
.put(updateThought)
.delete(deleteThought);

module.exports = router;