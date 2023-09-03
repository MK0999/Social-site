const router = require('express').Router();
const {
    createThought,
    getThoughts,
    getSingleThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    removeThoughtReaction
} = require('../../controllers/thoughtcontroller.js');
router.route('/').get(getThoughts).post(createThought);
router.route('/:thoughtId').get(getSingleThought);
router.route('/:thoughtId').put(updateThought);
router.route('/:thoughtId').delete(deleteThought);
router.route('/:thoughtId/reactions').post(addThoughtReaction);
router.route('/:thoughtId/:reactionId').delete(removeThoughtReaction);

module.exports = router;