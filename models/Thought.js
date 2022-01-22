const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min: [1, 'Provided text must be more than 1 character'],
    max: [280, 'Provided text must be less than 280 character']
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    get: v => new Intl.DateTimeFormat('en-US', options).format(v)
   },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
