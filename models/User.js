const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const validator = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: "Please enter a valid email",
      },
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.pre('find', function (next) {
    this.populate("thoughts friends");
    next();
});

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
