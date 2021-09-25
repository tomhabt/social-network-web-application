const router = require('express').Router();
const { 
    addReaction, 
    removeReaction 
} = require('../../controllers/reaction-controller');



// /api/comments/<pizzaId>
router
    .route('/:thoughtId')
    .post(addReaction);

// /api/comments/<pizzaId>/<commentId>
router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction)

module.exports = router;