const commentsModel = require("../model/commentsModel");

function getLike(req, res) {
  const id = req.params.id;
  if (id) {
    commentsModel
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ error: error }));
  } else {
    commentsModel
      .find({})
      .then((data) => res.json(data))
      .catch((error) => res.json({ error: error }));
  }
}

async function createLike(req, res) {
  const body = req.body;
  let comment = await commentsModel.findById({ _id: body.commentId });
  let _likesCount;
  let _likes = comment.likes;

  if (comment.likes.includes(body.profileId)) {
    _likesCount = comment.likesCount - 1;
    let idIndex = comment.likes.indexOf(body.profileId);
    _likes.splice(idIndex, 1);
  } else {
    _likesCount = comment.likesCount + 1;
    _likes = [...comment.likes, body.profileId];
  }

  commentsModel
    .findByIdAndUpdate(
      { _id: body.commentId },
      {
        likesCount: _likesCount,
        likes: _likes,
      }
    )
    .then((data) => res.json({ msg: "success like" }));
  // commentsModel
  //   .updateOne(
  //     { _id: body.postId, likes: { $nin: body.profileId } },
  //     {
  //       $set: {
  //         $push: {
  //           likes: body.profileId,
  //         },
  //         $inc: { likesCount: 1 },
  //       },
  //     }
  //   )
  //   .then((data) => res.json({ msg: "success like" }));
}

module.exports = {
  getLike,
  createLike,
};
