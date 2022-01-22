const mongoose = require("mongoose");
const { Schema } = mongoose;

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    max: [280, "Provided text must be less than 280 character"],
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    // https://mongoosejs.com/docs/schematypes.html#getters
    get: v => new Intl.DateTimeFormat('en-US', options).format(v)
 },
  username: {
    type: String,
    required: true,
  },
});

module.exports = reactionSchema;
