const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min: [1, 'Provided text must be more than 1 character'],
    max: [280, 'Provided text must be less than 280 character']
  },
  createdAt: { type: Date, default: Date.now },
  
  // !!!! is a subdocument
  reactions: [],
  // thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
  // friends: [{ type: Schema.Types.ObjectId, ref: "Friends" }],
});
// !!! Needs virtual
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
