const { User, Thought} = require('../models');

const thoughtController = {
    
     // get all Thoughts
     getAllThought (req, res) {
        Thought.find({})
        .populate({
          path:'reactions',
          select:'-__v'
      })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => 
          res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
    // get one Thought
    getThoughtById({params}, res) {
        Thought.findOne({_id:params.id})
        .populate({
          path:'reactions',
          select:'-__v'
      })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        }); 
    },
    // add thought to user
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json({message: 'Your thought has been added to your user account!', dbUserData});
          })
          .catch(err => res.json(err));
    },

    // Update thought by id
    updateThought({params, body}, res) {
      Thought.findOneAndUpdate({ _id: params.thoughtId }, body)
      .then(updatedThought => {
        if (!updatedThought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        return User.findOne({_id:params.userId})
      
      .populate({
          path:'thoughts',
            select:'-__v'
      })
    })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },

    // remove thought from user
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedthought => {
            if (!deletedthought) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No  thought found with this id!' });
              return;
            }
            res.json({message: 'Your thought has been removed from your user account!', dbUserData});
          })
          .catch(err => res.json(err));
    },
}

module.exports = thoughtController;