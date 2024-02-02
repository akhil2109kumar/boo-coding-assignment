const commentsModel = require("../model/commentsModel");

function createComment(req, res) {
  const { mbti, enneagram, zodiac, profileId, title, description } = req.body;
  try {
    const comments = new commentsModel({ mbti, enneagram, zodiac, profileId, title, description });
    comments
      .save()
      .then(() => res.json({ msg: "data added successfully....!" }))
      .catch((error) => res.json({ error: error }));
  }catch(err) {
    console.error(err)
  }
 
}

function getComment(req, res) {
  const commentID = req.params.id;
  const sort = req.query.sort;
  const filter = req.query.filter;
  if (commentID) {
    try {
      commentsModel
      .findById(commentID)
      .then((data) => res.json(data))
      .catch((error) => res.json({ error: error }));
    }catch (err) {
      console.log(err);
    }

  } else {
    const sortQuery = sort === "Best" ? { likesCount: -1 } : { _id: 1 };
    let obj = {}
    filter && filter !== "All" && (obj[filter] = { $ne: null })
    commentsModel
      .find(obj)
      .sort(sortQuery)
      .then((data) => res.json(data))
      .catch((error) => res.json({ error: error }));
  }
}

module.exports = {
  createComment,
  getComment,
};
