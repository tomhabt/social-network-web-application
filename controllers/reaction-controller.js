const { Reaction, Thought } = require('../models');

const reactionController = {
    // add Reaction to Thoght
    addReaction({ params, body }, res) {
        console.log(body);
        Reaction.create(body)
          .then(({ _id }) => {
            return Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $push: { reactions: _id } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },

    // remove Reaction from Thought
    removeReaction({ params }, res) {
        Reaction.findOneAndDelete({ _id: params.reactionId })
          .then(deletedreaction => {
            if (!deletedreaction) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            return Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $pull: { reactions: params.reactionId } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No  thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },
    
}

module.exports = reactionController;