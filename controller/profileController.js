const profileModel = require("../model/profileModel");

const profiles = {
  name: "A Martinez",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  mbti: "ISFJ",
  enneagram: "9w3",
  variant: "sp/so",
  tritype: 725,
  socionics: "SEE",
  sloan: "RCOEN",
  psyche: "FEVL",
  image:
    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
};

function CreateProfile(req, res) {
  const profile = new profileModel(req.body);
  profile
    .save()
    .then(() => res.json({ msg: "data added successfully....!" }))
    .catch((error) => res.json({ error: error }));
}

function GetProfile(req, res) {
  profileModel
    .find({})
    .then((data) => res.json(data))
    .catch((error) => res.json({ error: error }));
}

async function initSeed() {
  let user = await profileModel.find(
    { name: profiles.name },
    { findOne: true }
  );
  if (!user.length) {
    const profile = new profileModel(profiles);
    profile
      .save()
      .then(() => console.log("data added successfully....!"))
      .catch((error) => console.log(error));
  }
}

module.exports = {
  CreateProfile,
  GetProfile,
  initSeed,
};
