
const {Thought,User} = require('../models');

module.exports = {
    async getThoughts(req,res) {
        try{
            const thoughts= await Thought.find();
            res.json(thoughts);
        }catch (err) {
            res.status(500).json(err)
          }
        },
    

    async getSingleThought(req, res) {
        try {
          const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
              }
        
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $addToSet: { thought: thought._id } },
            { new: true }
          );
    
          if (!user) {
            return res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            });
          }
    
          res.json('Created the thought 🎉');
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

      async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

      async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    
         
    const user = await User.findOneAndUpdate(
            { username: req.body.username },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );
    
         
         res.json({ message: 'thought successfully deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async addThoughtReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Remove video response
      async removeThoughtReaction(req, res) {
        try {
          const thought = await Thought.findOneAndRemove(
            { _id: req.params.thoughtId },
            { $pull: { reactionId: req.params.reactionId }  },
            { runValidators: true, new: true }
          )
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    }
