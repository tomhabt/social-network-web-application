const { User } = require('../models');

const userController = {
    // get all users
    getAllUser (req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },
    // get one user
    getUserById({params}, res) {
        User.findOne({_id:params.id})
        .then(dbUserData => res.json(dbUserData))
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
        User.findOneAndUpdate({_id:params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },
    // delete user
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    }
};

module.exports = userController;