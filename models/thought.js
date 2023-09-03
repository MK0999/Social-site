const { Schema, Types , model} = require('mongoose');
const Reaction = require('./reaction');
const thoughtSchema = new Schema(
  {
   
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    reactions : [Reaction],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })
  const Thought = model('thought', thoughtSchema);

module.exports = Thought;
