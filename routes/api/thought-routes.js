const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    removeThought
  } = require('../../controllers/thought-controller');

// Set up GET all /api/thoughts
router
  .route('/')
  .get(getAllThought)

  // Set up POST at /api/thoughts/<userId>
  router
  .route('/:userId')
  .post(addThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)

  router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .delete(removeThought);

module.exports = router;

