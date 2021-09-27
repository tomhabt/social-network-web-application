const { User } = require('../models');

const userController = {
    // get all users
    getAllUser (req, res) {
        User.find({})
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },
    // get one user
    getUserById({params}, res) {
        User.findOne({_id:params.id})
        .populate({
            path:'thoughts',
            select:'-__v'
        })
        
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData =>{
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;  
            }
        res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },
    // create user
    createUser({body}, res) {
        User.create (body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },
    // Update user by id
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id:params.id}, body, {new:true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData)
        })
            .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },
    // delete user
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;   
            }
            res.json({message: 'User and associated thoughts deleted!'})
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },

     // add friends to users
     addFriend({ params}, res) {
            User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { friends: params.friendId } },
              { new: true }
            )
        // })  
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    } 
};

module.exports = userController;

 