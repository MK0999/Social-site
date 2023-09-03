const { Schema, model } = require('mongoose');
const validator = require('validator');
// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type:String,
    required: true,
    unique: true, // Ensure uniqueness
    trim: true
},
    email:{
    type:String,
    required: true,
    unique: true, // Ensure uniqueness
    lowercase: true, // Convert email to lowercase
    validate: {
      validator: (value) => validator.isEmail(value), // Use the validator package
      message: 'Invalid email format',
    },
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
     
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//virtual called friendCount that retrieves the length of the user's friends array 
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })
const User = model('user', userSchema);

module.exports = User;
