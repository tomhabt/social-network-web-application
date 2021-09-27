const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    removeThought
  } = require('../../controllers/thought-controller');

  const {
    addReaction,
    removeReaction
  } = require('../../controllers/reaction-controller');


// Set up GET all /api/thoughts
router
  .route('/')
  .get(getAllThought)

  // Set up POST thoughts at /api/thoughts/<userId>
  router
  .route('/:userId')
  .post(addThought);

// Set up GET one thoughts at /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)

// Set up PUT and DELETE thoughts  at /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .delete(removeThought);

  // Set up POST reactions at  /api/thoughts/<thoughtId>/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction);

// Set up DELETE reactions at /api/thoughts/<thoughtId>/reactions/<reactionId>
router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction)

module.exports = router;

