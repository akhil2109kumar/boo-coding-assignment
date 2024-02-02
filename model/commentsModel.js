const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Types.ObjectId,
    ref: "profile",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // comments: [
  //     {
  //         type: mongoose.Types.ObjectId,
  //         ref: "Comment",
  //     },
  // ],
  mbti: {
    type: String,
    default: null
  },
  enneagram: {
    type: String,
    default: null
  },
  zodiac: {
    type: String,
    default: null
  },
  likesCount: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [],
    default: [],
  },
});

module.exports =
  mongoose.models.comments || mongoose.model("comment", CommentsSchema);
