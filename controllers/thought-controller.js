const { Thought } = require('../models');

const ThoughtController = {
    // get all Thoughts
    getAllThought (req, res) {
        Thought.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
    },
    // get one Thought
    getThoughtById({params}, res) {
        Thought.findOne({_id:params.id})
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData)
        }); 
    },
    createThought({body}, res) {
        Thought.create (body)
        .then(dbThoughtData => res.json(dbThoughtData))
    },
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id:params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;  
            }
            res.json(dbThoughtData)
        });
    },
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return; 
            }
                res.json(dbThoughtData)
        });
    }
};

module.exports = ThoughtController;