const User = require('../models/user');

module.exports = {

  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err)
    }
  },
 
 // get single user
   async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //update a user
  async updateUser(req, res) {
    try {
      const updatedUserData = req.body;
      const result = await User.findByIdAndUpdate(req.params.userId, updatedUserData, {
        new: true, // Return the updated document
    });

    if (!result) {
      // If the user with the provided ID was not found, return a 404 response
      return res.status(404).json({ message: 'User not found' });
    }
      
      res.json(result);
      console.log(`updated= ${result}`)
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a user
   async deleteUser(req, res) {
    try {
      const dbUserData = await User.findByIdAndDelete({ _id: req.params.userId});
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// add new friend
  async addNewFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: { friendId: req.params.userId } } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Remove friend
      async removeFriend(req, res) {
        try {
          const user = await User.findOneAndRemove(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.userId } } },
            { runValidators: true, new: true }
          )
    
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
};
