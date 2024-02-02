const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  profileId: {
    type: String,
    required: true,
  },
  mbti: {
    type: String,
  },
  enneagram: {
    type: String,
  },
  zodiac: {
    type: String,
  },
});

module.exports = mongoose.models.votes || mongoose.model("vote", VoteSchema);
